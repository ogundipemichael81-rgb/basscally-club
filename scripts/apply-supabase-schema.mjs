#!/usr/bin/env node
/**
 * Apply supabase/migrations/*.sql in order when DATABASE_URL is set.
 * Usage: node scripts/apply-supabase-schema.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDir = join(root, "supabase", "migrations");
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Copy .env.example → .env.local first.");
  process.exit(1);
}

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

const client = new pg.Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  for (const file of files) {
    const sql = readFileSync(join(migrationsDir, file), "utf8");
    console.log(`Applying ${file}...`);
    await client.query(sql);
  }
  const seedPath = join(root, "supabase", "seed.sql");
  console.log("Applying seed.sql...");
  await client.query(readFileSync(seedPath, "utf8"));
  console.log("Schema and seed applied.");
} catch (err) {
  console.error(err);
  process.exit(1);
} finally {
  await client.end();
}
