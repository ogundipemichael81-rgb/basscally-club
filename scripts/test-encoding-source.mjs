import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const roots = ["src/app", "src/components", "src/lib"];
const markers = [
  String.fromCodePoint(0x00c3, 0x0192),
  String.fromCodePoint(0x00c3, 0x201a),
  String.fromCodePoint(0x00c3, 0x00a2),
  String.fromCodePoint(0x00ef, 0x00bf),
];

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : /\.(ts|tsx)$/.test(path) ? [path] : [];
  });
}

const targets = [...roots.flatMap(files), "package.json"];
const matches = targets.filter((path) => markers.some((marker) => readFileSync(path, "utf8").includes(marker)));
if (matches.length) {
  console.error(`MOJIBAKE_DETECTED: ${matches.join(", ")}`);
  process.exit(1);
}
console.log("ENCODING_SOURCE_REGRESSION_PASS");