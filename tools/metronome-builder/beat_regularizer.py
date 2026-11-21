"""Turn raw detected beats into a steady, followable click grid.

Raw Beat This! output can briefly lock onto subdivisions (fills read as double time)
or skip beats. Members hear that as the metronome speeding up or dropping out.

1. Constant-tempo fit: most drops are studio loops at one tempo. A straight grid
   t = a + b*n is fitted robustly to the detections that agree with it. If it explains
   the track well, that grid is used: perfectly steady, phase taken from the music.
2. Otherwise (live recordings, tempo changes) a phase-locked walk predicts each next
   beat one period ahead, moves part-way toward the nearest detection, ignores
   in-between detections and fills missing beats, following gradual tempo drift.
"""
import numpy as np

def _robust_period(beats):
    d = np.diff(beats); m = float(np.median(d))
    # Exclude subdivision and gap intervals before taking the typical beat length.
    core = d[(d > .7*m) & (d < 1.4*m)]
    return float(np.median(core)) if len(core) else m

def constant_fit(beats, period, tol=.08, start=0):
    # Detections come in 20 ms steps, so the initial period is rounded. Seed from a
    # direct line fit over consecutive steady beats at the anchor, then grow the window
    # in both directions, refining a and b, so a small period error never accumulates.
    seed = beats[start:start+8]
    steady = np.abs(np.diff(seed) - period) <= .15*period
    k = 1 + int(np.argmin(np.append(steady, False)))
    if k < 4: return None
    b, a = np.polyfit(np.arange(k), seed[:k], 1)
    centre = float(beats[start]); half = 8*period
    while True:
        window = beats[(beats >= centre - half) & (beats <= centre + half)]
        for _ in range(3):
            n = np.round((window - a) / b); inliers = np.abs(window - (a + b*n)) <= tol*b
            if inliers.sum() < 6: return None
            b, a = np.polyfit(n[inliers], window[inliers], 1)
        if centre - half <= beats[0] and centre + half >= beats[-1]: break
        half *= 2
    n = np.round((beats - a) / b); res = beats - (a + b*n); inliers = np.abs(res) <= tol*b
    span = n[inliers].max() - n[inliers].min() + 1
    return {'a': float(a), 'b': float(b), 'inlier_fraction': float(inliers.mean()),
            'coverage': float(len(set(n[inliers].tolist())) / span),
            'rms_ms': float(np.sqrt(np.mean(res[inliers]**2))*1000),
            'first': float(beats[inliers].min()), 'last': float(beats[inliers].max())}

def best_constant_fit(beats, period, seeds=12):
    """Try anchors spread across the track; keep the fit that explains most of it."""
    anchors = [i for i in range(len(beats) - 3)
               if all(abs((beats[i+k+1] - beats[i+k]) - period) <= .15*period for k in range(3))]
    if not anchors: return None
    picks = sorted({anchors[int(j)] for j in np.linspace(0, len(anchors) - 1, min(seeds, len(anchors)))})
    fits = [f for f in (constant_fit(beats, period, start=i) for i in picks) if f]
    # Score: how much of the track's length the grid covers with matching detections.
    return max(fits, key=lambda f: f['coverage'] * (f['last'] - f['first']), default=None)

def phase_locked(beats, duration, period, window=8, accept=.15, gain=.6, max_change=.08):
    start = 0
    for i in range(len(beats) - 3):
        if all(abs((beats[i+k+1] - beats[i+k]) - period) <= accept * period for k in range(3)): start = i; break
    end = min(duration - .05, float(beats[-1]) + accept * period)
    # Begin at the local tempo of the anchor run, not the whole-track average.
    recent = list(np.diff(beats[start:start+4]))
    period = float(np.median(recent))
    grid = [float(beats[start])]; used = {start}; filled = 0
    last_actual, steps = float(beats[start]), 0
    while True:
        predicted = grid[-1] + period
        if predicted > end: break
        steps += 1
        candidates = np.where(np.abs(beats - predicted) <= accept * period)[0]
        if len(candidates):
            index = int(candidates[np.argmin(np.abs(beats[candidates] - predicted))])
            actual = float(beats[index]); used.add(index)
            # Tempo comes from the detections themselves, not the softened click positions.
            recent.append((actual - last_actual) / steps); last_actual, steps = actual, 0
            grid.append(predicted + gain * (actual - predicted))
        else:
            grid.append(predicted); filled += 1
        if len(recent) >= 3:
            local = float(np.median(recent[-window:]))
            period = min(max(local, period * (1 - max_change)), period * (1 + max_change))
    first = grid[0]
    while first - period >= .05 and np.any(np.abs(beats[:start] - (first - period)) <= accept * period):
        first -= period; grid.insert(0, first)
    return grid, {'kept': len(used), 'dropped': int(len(beats) - len(used)), 'filled': filled}

def regularize_beats(beats, duration):
    beats = np.asarray(sorted(beats), dtype=float)
    if len(beats) < 8: return beats.tolist(), {'method': 'raw', 'reason': 'too few beats'}
    period = _robust_period(beats)
    fit = best_constant_fit(beats, period)
    # Extra subdivision detections do not count against a fit; what matters is that the
    # grid spans the music and most grid positions have a matching detection.
    spans = fit and (fit['last'] - fit['first']) >= .8 * (beats[-1] - beats[0])
    if fit and spans and fit['coverage'] >= .7 and fit['rms_ms'] <= 25:
        a, b = fit['a'], fit['b']
        n0 = int(np.ceil((max(fit['first'] - b*.5, .05) - a) / b))  # start at the music's first beat
        # Run to the music's last detected beat, never into a fade-out after it.
        n1 = int(np.floor((min(max(fit['last'], float(beats[-1])) + b*.25, duration - .05) - a) / b))
        grid = [round(a + b*n, 4) for n in range(n0, n1 + 1)]
        return grid, {'method': 'constant', **fit, 'bpm': 60/b}
    grid, stats = phase_locked(beats, duration, period)
    return [round(t, 4) for t in grid], {'method': 'phase_locked', 'fit': fit, **stats}
