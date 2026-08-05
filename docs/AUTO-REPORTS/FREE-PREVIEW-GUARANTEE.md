# Permanent free-preview guarantee

## Product rule

Basscally Hub has one global current preview position. The administrator can replace the published drop occupying that position; no user-specific preview records, title, ID, date, or artist are hardcoded.

## Implementation

- `src/lib/content/queries.ts` now exposes the server-only `getPublishedFreePreview()` query.
- The query requires `status = published`, `is_free_preview = true`, and a non-null audio storage key.
- Database failures throw a safe error and are logged; they are not treated as “no preview”.
- `src/lib/dashboard/queries.ts` resolves the preview independently from dashboard filters and uses it for unpaid users.
- `src/lib/admin/content/queries.ts` uses the atomic `replace_published_free_preview` RPC when an administrator selects a replacement.
- The current preview cannot be unset without selecting a replacement.
- `/admin/content` labels the dynamic current row `Published` and `Free Preview`.
- `scripts/free-preview-acceptance.mjs` dynamically queries the current preview before creating test users and checks dashboard visibility, reload, detail access, playback controls, and download denial.

## Database protection

Migration: `supabase/migrations/20260805120000_atomic_free_preview_replacement.sql`

- The existing partial unique index remains in place.
- The replacement function clears the previous published preview and selects the new published audio-backed row atomically.
- It raises an error unless exactly one published preview remains.
- Execution is revoked from public roles and granted only to `service_role`.

The function has been applied to Supabase project `jekavejbfujhxmtryyob` and verified executable by `service_role`.

## Production runtime snapshot

Verified dynamically from Supabase on 2026-08-05:

- Current preview title: `Sir TJ`
- Current preview content ID: `6f098a40-5cb8-4df7-8342-40d6ec36a156`
- Status: `published`
- `is_free_preview`: `true`
- Audio present: `true`
- Published preview count: exactly one

This is a runtime observation only; application code does not depend on this title or ID.

## Verification

- `npm run lint`: passed with existing warnings only; 0 errors.
- `npx tsc --noEmit --incremental false`: passed.
- `npm run build`: passed on Next.js 16.2.6.
- Automated browser acceptance script: available as `npm run test:free-preview`; not run in this environment because local `.env.local` intentionally has no service-role key or test password.

To run the full acceptance test safely, provide temporary values only in the local environment:

```powershell
$env:FREE_PREVIEW_TEST_PASSWORD = 'temporary-test-password'
npm.cmd run test:free-preview
```

The script creates fresh unpaid users dynamically, deletes them after the run, and never grants a subscription. It must be run against a controlled local or production test deployment with the service-role key kept server-side.

## Remaining blocker

The replacement and query code are ready, but the full fresh-user browser acceptance run remains pending because no test credentials were supplied locally. A production deployment is also required for this change before production browser verification.
