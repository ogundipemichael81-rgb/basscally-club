import assert from "node:assert/strict";
import fs from "node:fs";

const schema = fs.readFileSync("src/lib/admin/content/schema.ts", "utf8");
const dashboard = fs.readFileSync("src/components/dashboard/dashboard-page-view.tsx", "utf8");
const cron = JSON.parse(fs.readFileSync("vercel.json", "utf8"));

assert.match(schema, /Release date is required when scheduling a drop/);
assert.ok(schema.includes("Date.parse(fields.scheduledFor)"));
assert.ok(dashboard.includes("const latestDrop = filteredItems[0] ?? null"));
assert.equal(cron.crons[0].path, "/api/cron/publish-scheduled");
assert.equal(cron.crons[0].schedule, "*/5 * * * *");

const now = Date.now();
const future = new Date(now + 60 * 60 * 1000).toISOString();
assert.ok(Date.parse(future) > now, "future scheduled releases must be in the future");
assert.ok(Date.parse(new Date(now - 60 * 60 * 1000).toISOString()) <= now, "past releases must be rejected");

const categoryItems = [
  { type: "groove", title: "Groove" },
  { type: "fill", title: "Fill" },
];
const filter = (items, selected) => selected === "all" ? items : items.filter((item) => item.type === selected);
assert.equal(filter(categoryItems, "fill")[0].title, "Fill");
assert.equal(filter(categoryItems, "groove")[0].title, "Groove");
assert.equal(filter(categoryItems, "all").length, 2);

console.log("BETA_PUBLISHING_LIBRARY_TESTS_PASS");
