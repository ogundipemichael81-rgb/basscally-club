# Basscally Hub — Database Schema Plan

**BH-02** · Supabase Postgres · **EU region** (Frankfurt `eu-central-1`)

## Source of truth

| Layer | Path |
| --- | --- |
| TypeScript (Drizzle) | `src/db/schema.ts` |
| SQL migrations | `supabase/migrations/*.sql` |
| Seed data | `supabase/seed.sql` |
| Apply script | `npm run db:apply` (requires `DATABASE_URL`) |

## Core tables (BH-02)

### users table

Member identity keyed by email. `is_founding_member` set by Lemon Squeezy webhook when active founding count &lt; 500.

### subscriptions table

One row per provider subscription. `plan_code`: `founding_monthly`, `standard_monthly`, `annual_18`, `club_plus`. Status mirrors Lemon Squeezy lifecycle.

### content table

Audio drops: `bassless_track`, `groove`, `fill`, `challenge`. `audio_storage_key` points at private **audio bucket**. `status`: `draft` \| `scheduled` \| `published` \| `archived`.

### waitlist table

Pre-launch email capture (`/waitlist`). Unique email. Optional `experience_level`, `style_interest`, `note`, `source`.

### artists table

Featured educators (e.g. Chris). `slug` for URLs.

### styles table

Conversion pages (`/style/[slug]`). Demo: `makossa-tribe-fuego`. FK → `artists`.

### content_style_tags

Many-to-many: which drops appear on a style page.

### downloads table

Audit trail for gated downloads (server checks subscription before signed URL).

## Supporting tables (same migration)

- `email_queue`, `email_logs` — cron/email (BH-12+)
- `audit_events` — admin actions (`admin_audit_log` alias in MVP docs)
- View `founding_member_stats` — live counter for founding cap (500)

## Storage

| Bucket | Access | Purpose |
| --- | --- | --- |
| **audio bucket** | Private | Member streams/downloads via signed URLs (service role) |
| **covers bucket** | Public read | Cover art URLs on cards and style pages |

## RLS

Enabled on all public tables. Published `content` / `styles` readable by anon. `waitlist` insert open. Member-owned rows tightened in **BH-04** when `auth.uid()` maps to `users.id`.

## Seed (dev)

- `mock-member-active@basscally.club` — active founding subscription
- `mock-member-lapsed@basscally.club` — expired subscription
- `mock-admin-michael@basscally.club` — admin bootstrap email
- Artist `chris`, style `makossa-tribe-fuego`
- **3 placeholder drops** (groove, fill, bass-less) tagged to Makossa style

## Plan codes (unchanged enum values)

Lemon Squeezy variant IDs map to `founding_monthly`, `standard_monthly`, `annual_18`, `club_plus` in env — see `.env.example`.
