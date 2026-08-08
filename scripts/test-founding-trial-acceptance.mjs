import assert from "node:assert/strict";
import fs from "node:fs";
const source=fs.readFileSync("src/components/join/join-form.tsx","utf8");
assert.match(source,/window\.location\.replace\("\/dashboard\?welcome=1"\)/);
assert.match(source,/min-w-0 flex-1/);
assert.match(source,/!signInData\.session/);
console.log("PASS signup redirect and mobile flex regression");
