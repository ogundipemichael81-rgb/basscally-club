import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const roots = ["src/app", "src/components", "src/lib"];
const markers = [
  /\u00c3\u0192/u,
  /\u00c3\u201a/u,
  /\u00c3\u00a2/u,
  /\u00e2[\u0080-\u00bf\u2010-\u203a]?/u,
  /\u00c3\u00af\u00c2\u00bf\u00c2\u00bd/u,
  /\u00ef\u00bf\u00bd/u,
];

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : /\.(ts|tsx)$/.test(path) ? [path] : [];
  });
}

function containsMojibake(value) {
  return markers.some((marker) => marker.test(value));
}

const knownCorruption = `Dashboard ${String.fromCodePoint(0x00c3, 0x00a2, 0x00e2, 0x201a, 0x00ac, 0x00e2, 0x20ac, 0x201d)} Basscally Hub`;
assert.equal(containsMojibake(knownCorruption), true, "known Dashboard mojibake must be detected");
assert.equal(containsMojibake("Dashboard \u2014 Basscally Hub"), false, "clean Unicode text must remain valid");

const targets = [...roots.flatMap(files), "package.json"];
const matches = targets.filter((path) => containsMojibake(readFileSync(path, "utf8")));
if (matches.length) {
  console.error(`MOJIBAKE_DETECTED: ${matches.join(", ")}`);
  process.exit(1);
}
console.log("ENCODING_SOURCE_REGRESSION_PASS");
