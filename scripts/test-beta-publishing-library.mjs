import assert from "node:assert/strict";
import fs from "node:fs";

const schema = fs.readFileSync("src/lib/admin/content/schema.ts", "utf8");
const schedule = fs.readFileSync("src/lib/admin/content/schedule.ts", "utf8");
const dashboard = fs.readFileSync("src/components/dashboard/dashboard-page-view.tsx", "utf8");
const migration = fs.readFileSync("supabase/migrations/20260808170000_scheduled_publishing.sql", "utf8");

assert.match(schema, /validateScheduledFor/);
assert.match(schedule, /Release date is required when scheduling a drop/);
assert.match(schema, /validateScheduledFor/);
assert.ok(dashboard.includes("const latestDrop = filteredItems[0] ?? null"));
assert.match(migration, /CREATE EXTENSION IF NOT EXISTS pg_cron/);
assert.match(migration, /basscally-publish-due-content/);
assert.equal(fs.existsSync("vercel.json"), false, "Vercel Hobby must not receive a five-minute cron configuration");
console.log("BETA_PUBLISHING_LIBRARY_TESTS_PASS");