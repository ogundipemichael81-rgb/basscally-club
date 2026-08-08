import assert from "node:assert/strict";
import fs from "node:fs";

const route = fs.readFileSync("src/app/api/content/[id]/download/route.ts", "utf8");
const button = fs.readFileSync("src/components/content/content-download-button.tsx", "utf8");
const latestHero = fs.readFileSync("src/components/dashboard/dashboard-latest-hero.tsx", "utf8");
const middleware = fs.readFileSync("src/middleware.ts", "utf8");

assert.match(route, /status:\s*503/);
assert.match(route, /Downloads are temporarily unavailable\./);
assert.doesNotMatch(route, /createGuardedDownloadUrl|createSignedUrl|signedUrl/);
assert.match(button, /aria-disabled="true"/);
assert.match(button, /title="Not available yet"/);
assert.match(button, /Downloads are not available yet\. You can stream this track\./);
assert.doesNotMatch(button, /fetch\(|window\.location|router\./);
assert.match(latestHero, /ContentDownloadButton/);
assert.doesNotMatch(latestHero, /routes\.api\.contentDownload/);
assert.match(middleware, /isPausedDownloadPath/);
assert.match(middleware, /isAuthedApiPath\(pathname\) && !isPausedDownloadPath\(pathname\)/);

console.log("DOWNLOAD_PAUSE_REGRESSION_PASS");
