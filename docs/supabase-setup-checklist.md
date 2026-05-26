# Basscally Hub — Supabase Setup Checklist

Complete this once per environment (staging, production). **EU region** is required.

## 1. Create project (EU region)

1. [Supabase Dashboard](https://supabase.com/dashboard) → **New project**
2. **Region:** `Europe (Frankfurt)` — **EU region** / `eu-central-1`
3. Strong database password → save in password manager
4. Wait for project provisioning

Record:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- Anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Service role key → `SUPABASE_SERVICE_ROLE_KEY` (server only, never expose to client bundles)
- Database URI (pooler, port 6543) → `DATABASE_URL`

## 2. Apply schema

**Option A — SQL Editor (dashboard)**

Run in order:

1. `supabase/migrations/20260525120000_basscally_hub_schema.sql`
2. `supabase/migrations/20260525120100_storage_buckets.sql`
3. `supabase/migrations/20260525120200_rls_policies.sql`
4. `supabase/seed.sql` (dev/staging only)

**Option B — CLI from repo**

```powershell
copy .env.example .env.local
# Fill DATABASE_URL and Supabase keys

npm install
npm run db:apply
```

**Option C — Supabase CLI**

```powershell
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase db seed
```

## 3. Verify storage buckets

Dashboard → **Storage** → confirm:

- **audio bucket** — private
- **covers bucket** — public

Upload test objects:

- `audio/placeholder/groove-01.mp3` (private)
- `covers/placeholder/groove-01.webp` (public)

## 4. Verify tables

SQL:

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'users', 'subscriptions', 'content', 'waitlist',
    'artists', 'styles', 'content_style_tags', 'downloads'
  )
ORDER BY 1;
```

Expect 8 rows.

## 5. Verify seed

```sql
SELECT count(*) AS drops FROM content WHERE status = 'published';
SELECT slug FROM styles WHERE slug = 'makossa-tribe-fuego';
SELECT * FROM founding_member_stats;
```

Expect 3 published drops, Makossa style, founding stats view.

## 6. Auth (BH-04)

Enable **Email** provider (magic link). Site URL = `NEXT_PUBLIC_APP_URL`. Redirect URLs include `/auth/callback`.

## 7. Security

- [ ] Service role key only in Vercel/server env
- [ ] RLS enabled (migration `20260525120200`)
- [ ] No destructive `db reset` on production
- [ ] Backups enabled (Supabase Pro for production)

## 8. App env

Copy keys into `.env.local` / Vercel. Run:

```powershell
npm run typecheck
npm run build
```

When `DATABASE_URL` is set, `hasDatabaseUrl()` in `src/lib/env.ts` returns true for future API wiring.
