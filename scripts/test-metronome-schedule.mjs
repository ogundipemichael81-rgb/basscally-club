import fs from "node:fs";
import path from "node:path";
import {
  BeatScheduleState,
  firstBeatIndexAtOrAfter,
  loadBeatMap,
  parseBeatMap,
  stretchLeadSeconds,
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

// Time-stretch lead: measured Chromium values at the app's practice speeds.
assert(stretchLeadSeconds(1, "chromium") === 0, "no correction at 1x");
assert(close(stretchLeadSeconds(0.5, "chromium"), 0.068), "0.5x lead");
assert(close(stretchLeadSeconds(0.75, "chromium"), 0.031), "0.75x lead");
assert(close(stretchLeadSeconds(1.25, "chromium"), -0.004), "1.25x lead");
assert(close(stretchLeadSeconds(1.5, "chromium"), -0.005), "1.5x lead");
assert(close(stretchLeadSeconds(0.625, "chromium"), 0.0495), "interpolates between speeds");
assert(close(stretchLeadSeconds(0.25, "chromium"), 0.068) && close(stretchLeadSeconds(2, "chromium"), -0.005), "clamps outside table");
assert(stretchLeadSeconds(0.5, "other") === 0, "unmeasured engines get no correction");
assert(stretchLeadSeconds(Number.NaN, "chromium") === 0, "invalid rate gets no correction");
// The audible position moves ahead, so a beat just ahead of currentTime is scheduled sooner.
const lead = stretchLeadSeconds(0.5, "chromium");
const corrected = upcomingBeats(beats, 0.9 + lead * 0.5, 0.5, 0.2);
assert(corrected.length === 1 && close(corrected[0].wallDelay, (1.0 - 0.9 - lead * 0.5) / 0.5), "correction shifts click earlier by the lead");

const good = { version: "v", contentId: "abc", durationSeconds: 5, medianBpm: 120, beats };
assert(parseBeatMap(good, "abc")?.beats.length === beats.length, "valid map accepted");
assert(parseBeatMap(good, "other") === null, "map for another drop rejected");
assert(parseBeatMap({ ...good, beats: [1, 0.5, 2, 3, 4, 5, 6, 7] }, "abc") === null, "unordered map rejected");
assert(parseBeatMap({ ...good, beats: [0.5, 1] }, "abc") === null, "too-short map rejected");
assert(parseBeatMap({ ...good, beats: [...beats.slice(0, 8), Number.NaN] }, "abc") === null, "non-finite rejected");
assert(parseBeatMap(null, "abc") === null, "missing map rejected");

// Map loading: storage record is final (even "no metronome"); static map only when storage has none.
const SUPA = "https://example.supabase.co";
const storageUrl = `${SUPA}/storage/v1/object/public/beat-maps/abc.json`;
const fakeFetch = (routes) => async (url) => {
  const route = routes[url];
  if (route === "throw") throw new Error("offline");
  return route ? { ok: true, status: 200, json: async () => route } : { ok: false, status: 400, json: async () => ({}) };
};
const staticMap = { ...good, version: "static" };
const storedMap = { ...good, version: "stored" };
assert((await loadBeatMap("abc", SUPA, fakeFetch({ [storageUrl]: storedMap, "/beat-maps/abc.json": staticMap })))?.version === "stored", "storage map preferred");
assert((await loadBeatMap("abc", SUPA, fakeFetch({ "/beat-maps/abc.json": staticMap })))?.version === "static", "falls back to shipped map when storage has none");
assert((await loadBeatMap("abc", SUPA, fakeFetch({ [storageUrl]: "throw", "/beat-maps/abc.json": staticMap })))?.version === "static", "falls back when storage unreachable");
assert((await loadBeatMap("abc", SUPA, fakeFetch({ [storageUrl]: { contentId: "abc", status: "unverified", beats: [] }, "/beat-maps/abc.json": staticMap }))) === null, "unverified storage record means no metronome, no fallback");
assert((await loadBeatMap("abc", undefined, fakeFetch({ "/beat-maps/abc.json": staticMap })))?.version === "static", "works without Supabase URL");
assert((await loadBeatMap("abc", SUPA, fakeFetch({}))) === null, "no map anywhere means no metronome");

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
