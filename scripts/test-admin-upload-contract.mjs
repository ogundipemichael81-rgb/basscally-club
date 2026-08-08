import assert from "node:assert/strict";
import fs from "node:fs";
import {
  browserMimeMatchesAudioExtension,
  canonicalAudioMimeType,
} from "../src/lib/admin/content/audio-mime.ts";

assert.equal(canonicalAudioMimeType("practice.MP3"), "audio/mpeg");
assert.equal(canonicalAudioMimeType("practice.wav"), "audio/wav");
assert.equal(canonicalAudioMimeType("practice.aac"), null);
assert.equal(browserMimeMatchesAudioExtension("practice.mp3", "audio/mp3"), true);
assert.equal(browserMimeMatchesAudioExtension("practice.wav", "audio/x-wav"), true);
assert.equal(browserMimeMatchesAudioExtension("practice.mp3", "audio/wav"), false);

const form = fs.readFileSync("src/components/admin/admin-content-form.tsx", "utf8");
const route = fs.readFileSync("src/app/api/admin/content/upload-authorize/route.ts", "utf8");
const dashboard = fs.readFileSync("src/lib/dashboard/queries.ts", "utf8");

assert.ok(form.indexOf("try {") < form.indexOf("await uploadAudioDirectly()"), "audio upload must be protected by the form try/catch/finally");
assert.match(form, /finally \{\s*setProgress\(null\);\s*setSubmitting\(false\);/s);
assert.match(form, /contentType: details\.contentType/);
assert.match(form, /Authorizing upload/);
assert.match(form, /Uploading audio/);
assert.match(form, /Saving drop/);
assert.match(route, /authorizeAudioUpload/);
const publishedQuery = dashboard.slice(
  dashboard.indexOf("const { data: publishedRows }"),
  dashboard.indexOf("const { data: upcomingRows }"),
);
assert.match(publishedQuery, /\.from\("content"\)[\s\S]*?\.eq\("status", "published"\)/);
assert.doesNotMatch(publishedQuery, /\.eq\("user_id"/);console.log("ADMIN_UPLOAD_CONTRACT_PASS");
