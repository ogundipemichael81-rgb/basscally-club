import assert from "node:assert/strict";
import fs from "node:fs";
import { validateScheduledFor, localDateTimeToUtcIso } from "../src/lib/admin/content/schedule.ts";
import { resolvePublishState } from "../src/lib/admin/content/publish.ts";
import { filterDashboardItems, getDashboardLibraryContext } from "../src/lib/dashboard/filters.ts";
import { isMemberPrimaryNavActive } from "../src/lib/dashboard/navigation.ts";

const now = Date.parse("2026-08-08T12:00:00.000Z");
assert.equal(validateScheduledFor(undefined, now), "Release date is required when scheduling a drop.");
assert.equal(validateScheduledFor("2026-08-08T11:59:00.000Z", now), "Scheduled release must be a valid future date.");
assert.equal(validateScheduledFor("2026-08-08T12:01:00.000Z", now), null);
assert.equal(localDateTimeToUtcIso("2026-08-08T13:30"), new Date("2026-08-08T13:30").toISOString());

const scheduled = resolvePublishState({ publishAction: "scheduled", scheduledFor: "2026-08-08T12:01:00.000Z", notifyMembers: false }, new Date(now));
assert.equal(scheduled.status, "scheduled");
assert.equal(scheduled.publishedAt, null);
const publishNow = resolvePublishState({ publishAction: "publish_now", notifyMembers: false }, new Date(now));
assert.equal(publishNow.status, "published");
assert.equal(publishNow.publishedAt, "2026-08-08T12:00:00.000Z");

const items = [
  { id: "1", type: "groove" }, { id: "2", type: "fill" }, { id: "3", type: "bassless_track" }, { id: "4", type: "challenge" },
];
assert.deepEqual(filterDashboardItems(items, "grooves", []), [items[0]]);
assert.deepEqual(filterDashboardItems(items, "fills", []), [items[1]]);
assert.deepEqual(filterDashboardItems(items, "bassless", []), [items[2]]);
assert.deepEqual(filterDashboardItems(items, "challenges", []), [items[3]]);
assert.equal(filterDashboardItems(items, "fills", [])[0].id, "2");
assert.match(getDashboardLibraryContext("fills").emptyTitle, /fill/i);
assert.match(getDashboardLibraryContext("bassless").description, /original bass line/i);
assert.equal(["dashboard", "all", "bassless", "grooves", "fills", "challenges"].filter((item) => isMemberPrimaryNavActive("all", item)).length, 1);
assert.equal(isMemberPrimaryNavActive(null, "dashboard"), true);
assert.equal(isMemberPrimaryNavActive("bassless", "bassless"), true);

const uploadSource = fs.readFileSync("src/lib/admin/content/audio-upload.ts", "utf8");
const uploadRoute = fs.readFileSync("src/app/api/admin/content/upload-authorize/route.ts", "utf8");
assert.match(uploadRoute, /requireAdminApi/);
assert.match(uploadSource, /createSignedUploadUrl/);
assert.match(uploadSource, /isExpectedAudioStorageKey/);
const migration = fs.readFileSync("supabase/migrations/20260808170000_scheduled_publishing.sql", "utf8");
assert.match(migration, /status = 'scheduled'/);
assert.match(migration, /scheduled_for <= now\(\)/);
assert.match(migration, /cron\.schedule/);
assert.match(migration, /REVOKE ALL ON FUNCTION/);
console.log("PASS beta production-safe scheduler, upload contract, and library logic");
