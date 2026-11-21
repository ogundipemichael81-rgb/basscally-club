import fs from "node:fs";
import path from "node:path";
import {
  BeatScheduleState,
  firstBeatIndexAtOrAfter,
  parseBeatMap,
  upcomingBeats,
} from "../src/lib/metronome/beat-schedule.ts";

let passed = 0;
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
  passed += 1;
};
const close = (a, b) => Math.abs(a - b) < 1e-9;

const beats = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];

assert(firstBeatIndexAtOrAfter(beats, 0) === 0, "index before first beat");
assert(firstBeatIndexAtOrAfter(beats, 1.0) === 1, "exact beat is included");
assert(firstBeatIndexAtOrAfter(beats, 9) === beats.length, "past the end");

const normal = upcomingBeats(beats, 0.95, 1, 0.12);
assert(normal.length === 1 && normal[0].index === 1 && close(normal[0].wallDelay, 0.05), "1x wall delay");
const slow = upcomingBeats(beats, 0.95, 0.5, 0.12);
assert(slow.length === 1 && close(slow[0].wallDelay, 0.1), "0.5x doubles wall delay");
const fast = upcomingBeats(beats, 0.9, 1.5, 0.12);
assert(fast.length === 1 && close(fast[0].wallDelay, 0.1 / 1.5), "1.5x shortens wall delay");

const state = new BeatScheduleState();
assert(state.take(beats, 0.95, 1, 0.12).length === 1, "first take schedules beat");
assert(state.take(beats, 0.97, 1, 0.12).length === 0, "same beat never clicks twice");
state.invalidate();
assert(state.take(beats, 0.97, 1, 0.12).length === 1, "invalidate (seek/pause) allows rescheduling");
const gen = state.generation;
state.invalidate();
assert(state.generation === gen + 1, "invalidate bumps generation so stale clicks are dropped");
state.invalidate();
assert(state.take(beats, 3.45, 1, 0.12)[0].index === 6, "backward/forward seek resumes at the right beat");

const good = { version: "v", contentId: "abc", durationSeconds: 5, medianBpm: 120, beats };
assert(parseBeatMap(good, "abc")?.beats.length === beats.length, "valid map accepted");
assert(parseBeatMap(good, "other") === null, "map for another drop rejected");
assert(parseBeatMap({ ...good, beats: [1, 0.5, 2, 3, 4, 5, 6, 7] }, "abc") === null, "unordered map rejected");
assert(parseBeatMap({ ...good, beats: [0.5, 1] }, "abc") === null, "too-short map rejected");
assert(parseBeatMap({ ...good, beats: [...beats.slice(0, 8), Number.NaN] }, "abc") === null, "non-finite rejected");
assert(parseBeatMap(null, "abc") === null, "missing map rejected");

// Every shipped beat map must parse for the drop it is named after.
const dir = path.join(process.cwd(), "public", "beat-maps");
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")) : [];
for (const file of files) {
  const id = file.replace(/\.json$/, "");
  const map = parseBeatMap(JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")), id);
  assert(map !== null, `shipped beat map ${file} is valid`);
  assert(map.medianBpm >= 40 && map.medianBpm <= 220, `shipped beat map ${file} has a plausible tempo`);
}

console.log(`metronome schedule: ${passed} checks passed (${files.length} shipped beat maps)`);
