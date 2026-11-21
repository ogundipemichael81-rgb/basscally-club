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
