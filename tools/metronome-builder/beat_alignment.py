"""Audio-evidence beat alignment: measure, refine and verify a click grid against the music.

The beat model gives a good tempo but its beat positions can sit late, early or on the
off-beat. Here the audio itself decides: an onset envelope (where new sound energy
starts) is computed per band, and a constant grid t = a + b*n is scored by how much
onset energy lands on its clicks. Low band (kick/bass) defines the pulse; broadband
breaks ties. The detector's own timing bias is calibrated on a synthetic tick track.
"""
import numpy as np

HOP_SECONDS = .002
BANDS = {'low': (30, 160), 'all': (30, 8000)}

def onset_envelopes(audio, sr, size=1024):
    mono = audio.mean(axis=1) if audio.ndim == 2 else audio
    hop = max(1, int(round(sr * HOP_SECONDS))); window = np.hanning(size)
    freqs = np.fft.rfftfreq(size, 1/sr); masks = {k: (freqs >= lo) & (freqs < hi) for k, (lo, hi) in BANDS.items()}
    starts = np.arange(0, len(mono) - size, hop)
    frames = np.lib.stride_tricks.sliding_window_view(mono, size)[::hop][:len(starts)] * window
    mags = np.abs(np.fft.rfft(frames, axis=1))
    rise = np.maximum(np.diff(np.log1p(100*mags), axis=0), 0)  # log-compressed positive flux
    # A frame's rise belongs to the moment the new sound enters the window's leading half.
    times = (starts[1:] + size/2) / sr
    envs = {}
    for key, mask in masks.items():
        e = rise[:, mask].sum(axis=1); e = e - np.convolve(e, np.ones(150)/150, mode='same')  # local mean removal
        e = np.maximum(e, 0); envs[key] = e / (np.percentile(e, 99.5) + 1e-12)
    return times, envs

_BIAS_CACHE = {}

def detector_bias(sr):
    """Self-calibration: the detector's timing bias at this sample rate, in seconds.

    The analysis window is a fixed number of samples, so its bias depends on the sample
    rate. Render kicks at exactly known times at this rate and measure where the
    detector reports them. Subtract the result from envelope times.
    """
    if sr not in _BIAS_CACHE:
        t = np.arange(int(sr*.2))/sr
        kick = np.sin(2*np.pi*(50*t + 70*(1 - np.exp(-t*30))/30)) * np.exp(-t*14)
        truth = np.arange(.5, 12, .5); x = np.zeros(int(sr*13))
        for b in truth: i = int(round(b*sr)); x[i:i+len(kick)] += .7*kick
        times, envs = onset_envelopes(np.stack([x, x], axis=1).astype(np.float32), sr)
        peaks = onset_peaks(times, envs['low'])
        _BIAS_CACHE[sr] = float(np.median([peaks[np.argmin(abs(peaks - b))] - b for b in truth]))
    return _BIAS_CACHE[sr]

def calibrated_envelopes(audio, sr):
    times, envs = onset_envelopes(audio, sr)
    return times - detector_bias(sr), envs

def onset_peaks(times, env, min_gap=.08, threshold=.3):
    peaks = []; last = -1e9
    for i in range(1, len(env) - 1):
        if env[i] >= threshold and env[i] >= env[i-1] and env[i] > env[i+1] and times[i] - last >= min_gap:
            peaks.append(times[i]); last = times[i]
    return np.array(peaks)

def grid_score(times, env, a, b, t0, t1, width=.012):
    n = np.arange(np.ceil((t0 - a)/b), np.floor((t1 - a)/b) + 1); grid = a + b*n
    idx = np.searchsorted(times, grid); half = int(width / HOP_SECONDS)
    return float(np.mean([env[max(0, i-half):i+half+1].max() for i in idx if half <= i < len(env) - half])) if len(grid) else 0.

def refine_grid(times, envs, a, b, t0, t1, tempo_span=.01, weights=(('low', .7), ('all', .3))):
    """Search tempo (+/-1%) and phase (full beat, 1 ms) for the grid best supported by onsets."""
    combined = sum(w * envs[k] for k, w in weights)
    best = (-1., a, b)
    for bb in b * (1 + np.linspace(-tempo_span, tempo_span, 81)):
        for aa in a + np.arange(-bb/2, bb/2, .001):
            s = grid_score(times, combined, aa, bb, t0, t1)
            if s > best[0]: best = (s, aa, bb)
    # Second pass: finer around the winner.
    s0, a1, b1 = best
    for bb in b1 * (1 + np.linspace(-.0006, .0006, 25)):
        for aa in a1 + np.arange(-.004, .0041, .0005):
            s = grid_score(times, combined, aa, bb, t0, t1)
            if s > best[0]: best = (s, aa, bb)
    return {'score': best[0], 'a': float(best[1]), 'b': float(best[2])}

def dp_beats(times, env, period, tightness=400., start=None, end=None):
    """Ellis (2007) dynamic-programming beat tracking on an onset envelope.

    Each beat earns its onset strength; each gap pays tightness*log(gap/period)^2, so a
    steady tempo is strongly preferred but gradual drift and re-phasing are possible when
    the audio insists. Returns beat times (seconds).
    """
    hop = times[1] - times[0]; p = period / hop
    lo, hi = int(round(p * .5)), int(round(p * 2))
    gaps = np.arange(lo, hi + 1); penalty = -tightness * np.log(gaps / p) ** 2
    n = len(env); score = env.astype(float).copy(); back = np.full(n, -1)
    for t in range(lo, n):
        prev = t - gaps; ok = prev >= 0
        cand = score[prev[ok]] + penalty[ok]
        k = int(np.argmax(cand))
        if cand[k] > 0: score[t] = env[t] + cand[k]; back[t] = prev[ok][k]
    first = 0 if start is None else int(np.searchsorted(times, start))
    last_ok = n - 1 if end is None else int(np.searchsorted(times, end)) - 1
    # End on the best-scoring frame within the final beat period.
    tail = np.arange(max(first, last_ok - hi), last_ok + 1)
    t = int(tail[np.argmax(score[tail])]); beats = []
    while t >= first and t >= 0:
        beats.append(times[t]); t = back[t]
    return np.array(beats[::-1])

def section_shifts(times, env, beats, section=10., step=.005, min_beats=16):
    """Experiment: per section, the shift that best aligns these clicks with the music.

    0 ms means the clicks already sit on the music's strongest hits. The scan covers a
    whole beat, so an off-beat (half-beat) grid is detected, unlike nearest-onset checks.
    Sections hold at least min_beats beats and overlap by half, so short tracks still get
    stable measurements that do not depend on where a boundary happens to fall.
    """
    beats = np.asarray(beats); rows = []
    length = max(section, min_beats * float(np.median(np.diff(beats))))
    starts = np.arange(beats[0], max(beats[0] + 1e-9, beats[-1] - length * .5), length / 2)
    for t0 in starts:
        sel = beats[(beats >= t0) & (beats < t0 + length)]
        if len(sel) < 4: continue
        period = float(np.median(np.diff(sel))); offsets = np.arange(-period/2, period/2, step)
        idx = lambda shifted: np.searchsorted(times, shifted)
        scores = []
        for o in offsets:
            i = idx(sel + o); i = i[(i > 6) & (i < len(env) - 6)]
            scores.append(np.mean([env[j-6:j+7].max() for j in i]) if len(i) else 0.)
        scores = np.array(scores); k = int(np.argmax(scores))
        zero = scores[int(np.argmin(np.abs(offsets)))]
        far = circular_gap(offsets, offsets[k], period) > .15*period
        rows.append({'start': float(t0), 'bpm': 60/period, 'best_shift_ms': float(offsets[k]*1000),
                     'contrast': float(scores[k] / (np.median(scores) + 1e-12)),
                     'runner_up': float(scores[far].max() / (scores[k] + 1e-12)) if far.any() else 0.,
                     'on_click_vs_best': float(zero / (scores[k] + 1e-12))})
    return rows

def circular_gap(offsets, centre, period):
    """Distance between positions in the beat, treating the beat as a circle."""
    d = np.abs(offsets - centre) % period
    return np.minimum(d, period - d)

def phase_profile(times, env, beats, step=.002, smooth=.006):
    """Whole-track view: attack energy at the clicks if they all moved by each offset.

    Returns offsets (s, covering one beat) and scores normalised to the best. Pooling the
    whole track (rather than 10 s sections) separates the beat position from busy
    subdivisions in sparse, drum-less material.
    """
    beats = np.asarray(beats); period = float(np.median(np.diff(beats)))
    hop = times[1] - times[0]; k = np.arange(-int(3*smooth/hop), int(3*smooth/hop) + 1)
    smoothed = np.convolve(env, np.exp(-(k*hop/smooth)**2), mode='same')
    offsets = np.arange(-period/2, period/2, step)
    scores = np.array([np.mean(np.interp(beats + o, times, smoothed)) for o in offsets])
    return offsets, scores / (scores.max() + 1e-12)

def profile_summary(offsets, scores, period):
    k = int(np.argmax(scores)); far = circular_gap(offsets, offsets[k], period) > .15*period
    return {'best_shift_ms': float(offsets[k]*1000), 'runner_up': float(scores[far].max()) if far.any() else 0.,
            'at_click': float(scores[int(np.argmin(np.abs(offsets)))])}

def verify_grid(times, envs, grid, band='low', search=.07, bias=0.):
    """Per click: nearest onset peak within +/-search. Returns offsets (click - onset, ms)."""
    peaks = onset_peaks(times, envs[band]) - bias
    rows = []
    for t in grid:
        near = peaks[np.abs(peaks - t) <= search]
        if len(near): rows.append((t, (t - near[np.argmin(np.abs(near - t))]) * 1000))
    rows = np.array(rows) if rows else np.zeros((0, 2))
    if not len(rows): return {'matched': 0., 'median_ms': None, 'drift_ms_per_min': None, 'rows': rows}
    slope = np.polyfit(rows[:, 0], rows[:, 1], 1)[0] * 60 if len(rows) > 3 else 0.
    return {'matched': len(rows) / len(grid), 'median_ms': float(np.median(rows[:, 1])),
            'iqr_ms': float(np.subtract(*np.percentile(rows[:, 1], [75, 25]))),
            'drift_ms_per_min': float(slope), 'rows': rows}
