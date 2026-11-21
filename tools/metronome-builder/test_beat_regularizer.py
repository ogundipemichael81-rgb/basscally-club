import unittest
import numpy as np
from beat_regularizer import phase_locked, regularize_beats

def steady(start, period, n): return [start + i*period for i in range(n)]

class RegularizerTests(unittest.TestCase):
    def assert_matches(self, grid, truth, tol=.02):
        self.assertEqual(len(grid), len(truth), (len(grid), len(truth)))
        self.assertLess(np.abs(np.array(grid) - np.array(truth)).max(), tol)

    def test_clean_grid_unchanged(self):
        beats = steady(.5, .42, 60); grid, s = regularize_beats(beats, 26)
        self.assertEqual(s['method'], 'constant'); self.assert_matches(grid, beats, 1e-3)

    def test_double_time_section_is_removed(self):
        beats = steady(.5, .42, 60); extra = [b + .21 for b in beats[20:35]]
        grid, _ = regularize_beats(sorted(beats + extra), 26); self.assert_matches(grid, beats, 1e-3)

    def test_missing_beats_are_filled_in_phase(self):
        beats = steady(.5, .42, 60); grid, _ = regularize_beats(beats[:10] + beats[15:], 26)
        self.assert_matches(grid, beats, 1e-3)

    def test_detection_jitter_is_smoothed(self):
        rng = np.random.default_rng(1); truth = steady(.5, .42, 60)
        grid, _ = regularize_beats(np.array(truth) + rng.normal(0, .015, 60), 26)
        self.assert_matches(grid, truth, .015)

    def test_no_sudden_tempo_jumps_with_messy_detections(self):
        rng = np.random.default_rng(2); truth = steady(.5, .42, 80)
        messy = [t + rng.normal(0, .02) for i, t in enumerate(truth) if i % 7] + [t + .2 for t in truth[30:45]]
        grid, _ = regularize_beats(sorted(messy), 34)
        bpm = 60/np.diff(grid); self.assertLess(bpm.max()/bpm.min(), 1.02)
        self.assert_matches(grid, truth[1:], .02)  # beat 0 was deleted, so the grid starts at beat 1

    def test_stray_early_detection_does_not_set_phase(self):
        grid, _ = regularize_beats([0.31] + steady(.5, .42, 60), 26); self.assertAlmostEqual(grid[0], .5, places=3)

    def test_no_clicks_into_fade_out(self):
        beats = steady(.5, .42, 40); grid, _ = regularize_beats(beats, 40)
        self.assertLessEqual(grid[-1], beats[-1] + .01)

    def test_gradual_tempo_drift_uses_phase_locked_walk(self):
        beats = [0.5]
        for i in range(120): beats.append(beats[-1] + .5 - i*.0008)  # 120 -> ~143 BPM
        grid, s = regularize_beats(beats, beats[-1] + .3)
        self.assertEqual(s['method'], 'phase_locked'); self.assertEqual(s['filled'], 0)
        self.assert_matches(grid, beats, .02)

    def test_phase_locked_walk_survives_fills_and_gaps(self):
        truth = steady(.5, .42, 80); messy = sorted(truth[:20] + truth[26:] + [t + .2 for t in truth[40:55]])
        grid, _ = phase_locked(np.array(messy), 34, .42)
        self.assert_matches(grid, truth, .01)

if __name__ == '__main__': unittest.main()
