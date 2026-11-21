import assert from "node:assert/strict";
import fs from "node:fs";
import { downloadFilename, sniffAudioExtension } from "../src/lib/downloads/download-filename.ts";

const route = fs.readFileSync("src/app/api/content/[id]/download/route.ts", "utf8");
const guarded = fs.readFileSync("src/lib/downloads/guarded-download.ts", "utf8");
const button = fs.readFileSync("src/components/content/content-download-button.tsx", "utf8");
const middleware = fs.readFileSync("src/middleware.ts", "utf8");

// Downloads are on, and still gated: signed-in member, published drop, hourly limit.
assert.match(route, /createGuardedDownloadUrl/);
assert.doesNotMatch(route, /status:\s*503/);
assert.match(guarded, /Sign in required/);
assert.match(guarded, /content\.status !== "published"/);
assert.match(guarded, /DOWNLOAD_RATE_LIMIT_PER_HOUR/);
assert.match(guarded, /download:\s*downloadFilename/);
assert.match(button, /routes\.api\.contentDownload/);
assert.doesNotMatch(button, /not available yet/i);
assert.doesNotMatch(middleware, /isPausedDownloadPath/);
assert.match(middleware, /isAuthedApiPath\(pathname\)\) \{\s*return NextResponse\.json\(\{ error: "Sign in required\." \}, \{ status: 401 \}\)/);

// Saved filename: readable, safe, true format.
assert.equal(downloadFilename("Jehovah You Are The Most High", "wav"), "Jehovah You Are The Most High - Basscally.wav");
assert.equal(downloadFilename("How to play FUNK ft Gera D'Abundo", "mp3"), "How to play FUNK ft Gera DAbundo - Basscally.mp3");
assert.equal(downloadFilename('a/b\c:d*e?"<>|', "mp3"), "abcde - Basscally.mp3");
assert.equal(downloadFilename("", "mp3"), "Basscally drop - Basscally.mp3");
assert.equal(downloadFilename(null, "wav"), "Basscally drop - Basscally.wav");
assert.equal(downloadFilename("Café Groove", "mp3"), "Cafe Groove - Basscally.mp3");
assert.ok(downloadFilename("x".repeat(300), "mp3").length < 130);
const bytes = (s) => new Uint8Array([...s].map((c) => c.charCodeAt(0)));
assert.equal(sniffAudioExtension(bytes("RIFF\0\0\0\0WAVEfmt "), "drops/x/audio.mp3"), "wav");
assert.equal(sniffAudioExtension(bytes("ID3\u0004\0\0"), "drops/x/audio.wav"), "mp3");
assert.equal(sniffAudioExtension(new Uint8Array([0xff, 0xfb, 0x90, 0x64]), "drops/x/audio.wav"), "mp3");
assert.equal(sniffAudioExtension(new Uint8Array(), "drops/x/audio.wav"), "wav");
assert.equal(sniffAudioExtension(new Uint8Array(), "drops/x/audio"), "mp3");

console.log("DOWNLOADS_REGRESSION_PASS");
