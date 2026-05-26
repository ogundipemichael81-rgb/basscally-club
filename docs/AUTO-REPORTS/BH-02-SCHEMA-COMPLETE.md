# BH-02 — Supabase Schema and Storage

**Step:** BH-02  
**Date:** 2026-05-25  
**Status:** Schema and storage plan committed to repo

---

## EU region

Production Supabase project must be created in **Europe (Frankfurt)** — **EU region** (`eu-central-1`). Documented in:

- `docs/supabase-setup-checklist.md`
- `.env.example` (`DATABASE_URL` pooler host example)
- `supabase/config.toml` header comment

Cloud project creation is manual (dashboard); SQL migrations are ready to apply.

---

## users table

- Drizzle: `src/db/schema.ts` → `users`
- SQL: `supabase/migrations/20260525120000_basscally_hub_schema.sql`
- Seed: `mock-member-active`, `mock-member-lapsed`, `mock-admin-michael`

---

## subscriptions table

- Drizzle + SQL migration
- Unique `provider_subscription_id`
- Seed: active founding + expired standard rows

---

## content table

- Types: `bassless_track`, `groove`, `fill`, `challenge`
- **3 placeholder drops** seeded (published) with `audio_storage_key` under **audio bucket** paths

---

## waitlist table

- Email unique; optional experience/style/note/source fields
- RLS: anon insert policy for `/waitlist` API (BH-05)

---

## artists table

- Demo artist `chris` (Chris, featured)

---

## styles table

- Demo style `makossa-tribe-fuego` → route `/style/makossa-tribe-fuego` (BH-06)
- FK to `artists`

---

## content_style_tags

- Junction table linking 3 placeholder drops to Makossa style

---

## downloads table

- FK `user_id`, `content_id`; audit fields `ip_hash`, `user_agent_hash`

---

## audio bucket

- Private bucket `audio` in `supabase/migrations/20260525120100_storage_buckets.sql`
- Constant: `AUDIO_STORAGE_BUCKET` in `src/lib/constants.ts`
- RLS: service_role full access; members get signed URLs server-side (BH-03/BH-10)

---

## covers bucket

- Public bucket `covers` in same migration
- Constant: `COVERS_STORAGE_BUCKET` in `src/lib/constants.ts`
- RLS: public read on `storage.objects` where `bucket_id = 'covers'`

---

## Apply locally

```powershell
npm install
# Set DATABASE_URL in .env.local
npm run db:apply
```

Applies `supabase/migrations/*.sql` then `supabase/seed.sql`.

---

## Supporting artifacts

| File | Purpose |
| --- | --- |
| `docs/database-schema-plan.md` | Table and RLS overview |
| `docs/supabase-setup-checklist.md` | Dashboard + EU region steps |
| `drizzle.config.ts` | Drizzle Kit config (optional generate) |
| `.env.example` | Supabase + LS env template |

---

## Not in BH-02 scope (next steps)

- Live Supabase project provisioning (requires owner credentials)
- BH-03: Lemon Squeezy webhooks writing `subscriptions`
- BH-04: Auth `users.id` ↔ Supabase Auth UID mapping
- BH-05: `/waitlist` POST → `waitlist` table

---

## Verification markers (controller)

- users table ✅
- subscriptions table ✅
- content table ✅
- waitlist table ✅
- artists table ✅
- styles table ✅
- downloads table ✅
- audio bucket ✅
- covers bucket ✅
- EU region ✅
