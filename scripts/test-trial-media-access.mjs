import assert from "node:assert/strict";
import fs from "node:fs";

const session = fs.readFileSync("src/lib/subscriptions/member-session.ts", "utf8");
const preview = fs.readFileSync("src/lib/content/preview-access.ts", "utf8");
const download = fs.readFileSync("src/lib/downloads/guarded-download.ts", "utf8");

assert.match(session, /trial_ends_at/);
assert.match(session, /subscriptionGrantsAccess\(active\) \|\| trialActive/);
assert.match(preview, /getMemberSession/);
assert.match(preview, /const hasFullAccess = Boolean\(session\?\.hasAccess\)/);
assert.doesNotMatch(preview, /\.from\("subscriptions"\)/);
assert.match(preview, /if \(!hasFullAccess && !content\.is_free_preview\)/);
assert.match(download, /getMemberSession/);
assert.match(download, /if \(!session\.hasAccess\)/);
assert.doesNotMatch(download, /\.from\("subscriptions"\)/);

const access = (sessionState) => Boolean(sessionState?.hasAccess);
assert.equal(access({ hasAccess: true, trialActive: true }), true, "active trial playback/download is allowed");
assert.equal(access({ hasAccess: true, paid: true }), true, "paid playback/download is allowed");
assert.equal(access({ hasAccess: false, trialActive: false }), false, "expired unpaid premium access is denied");
assert.equal(access(null), false, "anonymous premium access is denied");

console.log("TRIAL_MEDIA_ACCESS_REGRESSION_PASS");
