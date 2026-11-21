"""Choose a drop's metronome beats by experiment against its audio (beat map v3).

Calibrated onset envelopes -> two candidates (a steady grid refined to 1 ms; a DP beat
path that follows the real hits) -> per-section phase-scan experiment for each -> the
steadiest candidate that passes everywhere ships. Nothing passes -> no metronome.
This is the exact rule set that was verified by ear and in the acoustic timing lab
(tools/metronome-proof/build_verified_maps.py on the research branch).
"""
import numpy as np
from beat_alignment import (calibrated_envelopes, detector_bias, dp_beats, phase_profile, profile_summary,
                            refine_grid, section_shifts)
from beat_regularizer import regularize_beats

PASS_SHIFT_MS = 20.     # every decisive section's kick/bass alignment must be within this
MIN_LOW_CONTRAST = 1.5  # below this a section has no clear kick/bass pulse to judge by
TIE_CLICK_RATIO = .9    # tie-break: clicks must still land on near-strongest attacks
MAX_LOW_RUNNER_UP = .85 # a section with another position this strong has no single clear beat
MAP_VERSION = 'basscally-beat-map-3'

def evaluate(times, envs, beats, raw=None):
    """Kick/bass decide where the beat is, wherever they give clear evidence.

    Every decisive section (one clear kick/bass position in the beat) must sit within
    PASS_SHIFT_MS of the clicks; that evidence is always binding. Louder accents elsewhere
    (skank, hi-hats, 16th-note accents) do not count against the grid. When decisive
    sections are sparse (drum-less material, equal subdivisions), the whole-track
    attack-pattern rule must pass as well; it adds a requirement, never replaces one.
    """
    low = section_shifts(times, envs['low'], beats); allb = section_shifts(times, envs['all'], beats)
    if not low or not allb: return {'low': low, 'all': allb}, 999., False
    decisive = [r for r in low if r['contrast'] >= MIN_LOW_CONTRAST and r['runner_up'] <= MAX_LOW_RUNNER_UP]
    worst_low = max((abs(r['best_shift_ms']) for r in decisive), default=0.)
    if decisive and worst_low > PASS_SHIFT_MS:
        return {'low': low, 'all': allb, 'decided_by': 'kick_bass'}, worst_low, False
    if len(decisive) >= .6 * len(low):
        return {'low': low, 'all': allb, 'decided_by': 'kick_bass'}, worst_low, True
    rows, worst, ok = no_kick_evaluate(times, envs, beats, raw, {'low': low, 'all': allb})
    return rows, max(worst, worst_low), ok

def no_kick_evaluate(times, envs, beats, raw, rows):
    """Drum-less material (solo bass, fills demos): judge the whole track's attack pattern.

    Clear rule: over the whole track and in each half, the strongest attack position in
    the beat is within PASS_SHIFT_MS of the clicks. Tie-break rule: when subdivisions are
    as strong as the beat (dense 16th-note playing), the audio cannot pick the beat by
    itself; then the clicks must follow the beat model's pulse (trained on how people tap)
    and still land on attacks at least TIE_CLICK_RATIO as strong as the best, everywhere.
    """
    beats = np.asarray(beats); period = float(np.median(np.diff(beats))); mid = (beats[0] + beats[-1]) / 2
    parts = {'whole': beats, 'first_half': beats[beats < mid], 'second_half': beats[beats >= mid]}
    summary = {k: profile_summary(*phase_profile(times, envs['all'], v), period) for k, v in parts.items() if len(v) >= 4}
    rows = {**rows, 'whole_track': summary}
    worst = max(abs(v['best_shift_ms']) for v in summary.values())
    if worst <= PASS_SHIFT_MS:
        return {**rows, 'decided_by': 'broadband_whole_track'}, worst, True
    follows_model = raw is not None and np.mean([abs(t - raw[np.argmin(np.abs(raw - t))]) <= .1*period for t in beats]) >= .8
    on_attacks = min(v['at_click'] for v in summary.values()) >= TIE_CLICK_RATIO
    whole_ok = abs(summary['whole']['best_shift_ms']) <= PASS_SHIFT_MS
    ok = bool(follows_model and on_attacks and whole_ok)
    return {**rows, 'decided_by': 'model_tiebreak'}, abs(summary['whole']['best_shift_ms']), ok

def choose_beats(audio, sr, raw_beats):
    """Returns (chosen method or None, beats, report). audio: float32 (samples, channels)."""
    duration = len(audio)/sr
    raw = np.asarray(raw_beats, dtype=float)
    report = {'detector_bias_s': detector_bias(sr), 'pass_shift_ms': PASS_SHIFT_MS, 'duration_s': duration}
    if len(raw) < 8: return None, np.array([]), {**report, 'reason': 'model found fewer than 8 beats'}
    times, envs = calibrated_envelopes(audio, sr)  # self-calibrated at this sample rate
    env = .7*envs['low'] + .3*envs['all']  # kick/bass lead; other attacks help
    rough, _ = regularize_beats(raw, duration); rough = np.array(rough)
    period = float(np.median(np.diff(rough))); t0, t1 = float(rough[0]), float(rough[-1])
    # Candidate A: one steady tempo, tempo and phase refined against the audio.
    fit = refine_grid(times, envs, float(rough[0]), period, t0 - period/2, t1 + period/2)
    a, b = fit['a'], fit['b']
    steady = a + b*np.arange(np.ceil((t0 - period*.5 - a)/b), np.floor((min(t1 + period*.5, duration - .05) - a)/b) + 1)
    steady = steady[steady >= .02]
    # Candidate B: DP beat path following the real hits (gradual drift / re-phasing).
    path = dp_beats(times, env, b, start=max(0., t0 - period*.5), end=min(duration - .05, t1 + period*.5))
    results = {}
    for name, beats in (('steady', steady), ('dp_path', path)):
        rows, worst, ok = evaluate(times, envs, beats, raw)
        results[name] = {'beats': beats, 'worst_ms': float(worst), 'pass': bool(ok), 'decided_by': rows.get('decided_by')}
    chosen = 'steady' if results['steady']['pass'] else 'dp_path' if results['dp_path']['pass'] else None
    report['candidates'] = {k: {kk: v[kk] for kk in ('worst_ms', 'pass', 'decided_by')} for k, v in results.items()}
    report['steady_bpm'] = 60/b
    if chosen is None: return None, np.array([]), {**report, 'reason': 'no candidate passed the audio check'}
    beats = results[chosen]['beats']
    bpm = 60/float(np.median(np.diff(beats))) if len(beats) > 1 else 0.
    if not (40 <= bpm <= 220 and len(beats) >= 8):
        return None, np.array([]), {**report, 'reason': f'implausible result ({len(beats)} beats, {bpm:.1f} BPM)'}
    return chosen, beats, report

def compact_map(content_id, audio_sha256, audio_etag, duration, method, beats):
    bpm = 60/float(np.median(np.diff(beats)))
    return {'version': MAP_VERSION, 'contentId': content_id, 'audioSha256': audio_sha256, 'audioEtag': audio_etag,
            'durationSeconds': round(duration, 3), 'medianBpm': round(bpm, 1), 'method': method,
            'beats': [round(float(t), 3) for t in beats]}
