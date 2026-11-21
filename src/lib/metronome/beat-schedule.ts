/**
 * Pure beat scheduling, ported from the metronome browser lab (20/20 timing checks).
 * Beat times are seconds in the source audio; wall delays account for playback rate.
 */

export type BeatMap = {
  version: string;
  contentId: string;
  durationSeconds: number;
  medianBpm: number;
  beats: number[];
};

export type DueBeat = { index: number; sourceTime: number; wallDelay: number; generation: number };

export function firstBeatIndexAtOrAfter(beats: readonly number[], sourceSeconds: number): number {
  let low = 0;
  let high = beats.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (beats[middle] < sourceSeconds) low = middle + 1;
    else high = middle;
  }
  return low;
}

export function upcomingBeats(
  beats: readonly number[],
  sourceNow: number,
  playbackRate: number,
  horizonWallSeconds: number,
): Omit<DueBeat, "generation">[] {
  const due: Omit<DueBeat, "generation">[] = [];
  for (let index = firstBeatIndexAtOrAfter(beats, sourceNow); index < beats.length; index += 1) {
    const wallDelay = Math.max(0, (beats[index] - sourceNow) / playbackRate);
    if (wallDelay > horizonWallSeconds) break;
    due.push({ index, sourceTime: beats[index], wallDelay });
  }
  return due;
}

/**
 * At speeds other than 1x the browser's pitch-preserving time-stretcher outputs the
 * music AHEAD of what audio.currentTime reports. Measured in Chromium by recording the
 * music and click outputs of the real engine against a tick track (0 ms at 1x):
 * 0.5x +68 ms, 0.75x +31 ms, 1.25x -4 ms, 1.5x -5 ms (click lateness, wall time).
 * Returned in wall seconds; the scheduler treats the audible position as
 * currentTime + lead * rate. Other engines (WebKit/Gecko) are unmeasured, so 0.
 */
const CHROMIUM_STRETCH_LEAD: readonly [rate: number, seconds: number][] = [
  [0.5, 0.068], [0.75, 0.031], [1, 0], [1.25, -0.004], [1.5, -0.005],
];

export function stretchLeadSeconds(rate: number, engine: "chromium" | "other"): number {
  if (engine !== "chromium" || !Number.isFinite(rate) || rate === 1) return 0;
  const table = CHROMIUM_STRETCH_LEAD;
  if (rate <= table[0][0]) return table[0][1];
  if (rate >= table[table.length - 1][0]) return table[table.length - 1][1];
  for (let i = 1; i < table.length; i += 1) {
    const [r1, s1] = table[i];
    const [r0, s0] = table[i - 1];
    if (rate <= r1) return s0 + ((s1 - s0) * (rate - r0)) / (r1 - r0);
  }
  return 0;
}

/** Tracks what was already scheduled so each beat clicks once; invalidate on seek/pause/rate change. */
export class BeatScheduleState {
  generation = 0;
  lastScheduledIndex = -1;

  invalidate() {
    this.generation += 1;
    this.lastScheduledIndex = -1;
  }

  take(beats: readonly number[], sourceNow: number, playbackRate: number, horizonWallSeconds: number): DueBeat[] {
    const due = upcomingBeats(beats, sourceNow, playbackRate, horizonWallSeconds).filter(
      (entry) => entry.index > this.lastScheduledIndex,
    );
    if (due.length) this.lastScheduledIndex = due[due.length - 1].index;
    return due.map((entry) => ({ ...entry, generation: this.generation }));
  }
}

/** Accepts only well-formed, ordered, finite maps; anything else means no metronome. */
export function parseBeatMap(value: unknown, contentId: string): BeatMap | null {
  if (!value || typeof value !== "object") return null;
  const map = value as Partial<BeatMap>;
  if (map.contentId !== contentId || !Array.isArray(map.beats) || map.beats.length < 8) return null;
  const beats = map.beats;
  for (let i = 0; i < beats.length; i += 1) {
    if (typeof beats[i] !== "number" || !Number.isFinite(beats[i]) || beats[i] < 0) return null;
    if (i > 0 && beats[i] <= beats[i - 1]) return null;
  }
  return {
    version: String(map.version ?? ""),
    contentId,
    durationSeconds: Number(map.durationSeconds ?? 0),
    medianBpm: Number(map.medianBpm ?? 0),
    beats,
  };
}
