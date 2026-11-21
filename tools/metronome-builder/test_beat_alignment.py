"""Synthetic-audio tests: known beat truth, so the method's answers can be checked exactly."""
import unittest
import numpy as np
from beat_alignment import calibrated_envelopes, detector_bias, dp_beats, onset_peaks, section_shifts
from verify import evaluate

SR = 22050

def kick():
    t = np.arange(int(SR*.2))/SR
    return np.sin(2*np.pi*(50*t + 70*(1 - np.exp(-t*30))/30)) * np.exp(-t*14)

def hat():
    rng = np.random.default_rng(0); t = np.arange(int(SR*.04))/SR
    return rng.normal(0, 1, len(t)) * np.exp(-t*120)

def render(events, seconds):
    x = np.zeros(int(SR*seconds))
    for when, sound, gain in events:
        i = int(round(when*SR)); s = sound[:max(0, len(x) - i)]; x[i:i+len(s)] += gain*s
    return np.stack([x, x], axis=1).astype(np.float32)

def analyse(audio, sr=SR):
    return calibrated_envelopes(audio, sr)

class BeatAlignmentTests(unittest.TestCase):
    def test_bias_differs_by_sample_rate_and_is_self_corrected(self):
        self.assertNotAlmostEqual(detector_bias(22050), detector_bias(48000), places=3)
        for sr in (22050, 44100, 48000):
            t = np.arange(int(sr*.2))/sr; k = np.sin(2*np.pi*(50*t + 70*(1 - np.exp(-t*30))/30))*np.exp(-t*14)
            x = np.zeros(int(sr*11)); beats = np.arange(.73, 10, .61)
            for b in beats: i = int(round(b*sr)); x[i:i+len(k)] += .6*k
            times, envs = analyse(np.stack([x, x], axis=1).astype(np.float32), sr); peaks = onset_peaks(times, envs['low'])
            self.assertLess(abs(np.median([(peaks[np.argmin(abs(peaks - b))] - b) for b in beats]))*1000, 3, sr)

    def test_detector_bias_is_calibrated(self):
        beats = np.arange(.5, 20, .5); times, envs = analyse(render([(b, kick(), .7) for b in beats], 21))
        peaks = onset_peaks(times, envs['low'])
        errors = [(peaks[np.argmin(abs(peaks - b))] - b)*1000 for b in beats]
        self.assertLess(abs(np.median(errors)), 3)

    def test_half_beat_grid_is_detected(self):
        beats = np.arange(.5, 30, .5); times, envs = analyse(render([(b, kick(), .7) for b in beats], 31))
        rows = section_shifts(times, envs['low'], beats + .25)
        self.assertTrue(all(abs(abs(r['best_shift_ms']) - 250) <= 15 for r in rows), rows)
        rows = section_shifts(times, envs['low'], beats)
        self.assertTrue(all(abs(r['best_shift_ms']) <= 10 for r in rows), rows)

    def test_offbeat_accents_do_not_move_the_beat(self):
        beats = np.arange(.5, 30, .5)
        audio = render([(b, kick(), .5) for b in beats] + [(b + .25, hat(), 1.) for b in beats], 31)
        times, envs = analyse(audio)
        _, worst, ok = evaluate(times, envs, beats)          # clicks on the kick: correct
        self.assertTrue(ok, worst)
        _, worst, ok = evaluate(times, envs, beats + .25)    # clicks on the loud hats: wrong
        self.assertFalse(ok, worst)

    def test_clicks_40ms_off_clear_kicks_fail(self):
        beats = np.arange(.5, 30, .5); times, envs = analyse(render([(b, kick(), .7) for b in beats], 31))
        self.assertTrue(evaluate(times, envs, beats)[2])
        self.assertFalse(evaluate(times, envs, beats + .04)[2])
        self.assertFalse(evaluate(times, envs, beats - .04)[2])

    def test_dp_path_follows_tempo_drift_and_phase(self):
        beats = [.5]
        for i in range(90): beats.append(beats[-1] + .44 - i*.0004)  # 136 -> ~146 BPM
        beats = np.array(beats); times, envs = analyse(render([(b, kick(), .7) for b in beats], beats[-1] + 1))
        env = .7*envs['low'] + .3*envs['all']
        path = dp_beats(times, env, float(np.median(np.diff(beats))), start=.3, end=beats[-1] + .2)
        matched = [min(abs(path - b)) for b in beats[1:-1]]
        self.assertLess(np.median(matched)*1000, 6); self.assertLess(max(matched)*1000, 20)
        steady = beats[0] + np.median(np.diff(beats))*np.arange(len(beats))
        self.assertFalse(evaluate(times, envs, steady)[2])    # one fixed tempo cannot follow this
        self.assertTrue(evaluate(times, envs, path)[2])

def pluck(freq=110.):
    t = np.arange(int(SR*.15))/SR
    return np.sin(2*np.pi*freq*t) * np.exp(-t*25) + .3*np.sin(2*np.pi*4*freq*t) * np.exp(-t*60)

class DrumlessTests(unittest.TestCase):
    """Solo-bass style material: no kick drum, sixteenth-note lines."""
    def line(self, accent):
        beats = np.arange(.5, 20, .54); events = []
        for b in beats:
            for j, g in enumerate((accent, .6, .6, .6)): events.append((b + j*.135, pluck(), g))
        return beats, render(events, 21)

    def test_clear_beat_accent_passes_and_wrong_phase_fails(self):
        beats, audio = self.line(accent=1.)
        times, envs = analyse(audio)
        self.assertTrue(evaluate(times, envs, beats, raw=beats)[2])
        self.assertFalse(evaluate(times, envs, beats + .27, raw=beats + .27)[2])  # clicks on the "and"

    def test_runner_up_treats_the_beat_as_a_circle(self):
        from beat_alignment import circular_gap
        self.assertAlmostEqual(float(circular_gap(np.array([.25]), -.25, .5)[0]), 0.)
        self.assertAlmostEqual(float(circular_gap(np.array([.2]), -.2, .5)[0]), .1)

    def test_equal_sixteenths_use_model_tiebreak_but_must_follow_model(self):
        beats, audio = self.line(accent=.6)  # every subdivision equally strong
        times, envs = analyse(audio)
        rows, _, ok = evaluate(times, envs, beats, raw=beats)
        self.assertTrue(ok); self.assertIn(rows['decided_by'], ('model_tiebreak', 'broadband_whole_track'))
        off = beats + .07  # between attacks: not on the model's pulse, not on attacks
        self.assertFalse(evaluate(times, envs, off, raw=beats)[2])

if __name__ == '__main__': unittest.main()
