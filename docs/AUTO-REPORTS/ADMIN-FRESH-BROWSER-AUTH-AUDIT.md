# Basscally Hub — Fresh-Browser Admin Authentication Audit

Date: 2026-08-08

## Current deployment

- Production: `https://basscallyhub.vercel.app`
- Production commit before this audit: `6616bde`
- Current production deployment: `dpl_LYaWHip4bvRiWtT9cHVniX2NjJ26`
- Deployment state: `READY`
- Production commit: `6616bde`
- Local repository: `C:\Users\USER\Desktop\Old Files\Programme Files\basscally-club`
- Unrelated BH-20/BH-21/BH-22 working-tree changes were preserved.

## Findings

1. The deployed code and GitHub `main` commit are aligned at `6616bde`.
2. The application uses `@supabase/ssr` for browser, server, and middleware clients.
3. Admin authorization is exact-match only after Supabase authentication. The singular account is authorized; the plural account is not fuzzy-matched.
4. The existing admin form performed a session check on mount, which can make an existing browser session look like password proof. Fresh-browser tests are therefore required for a definitive password result.
5. The form previously exposed only a generic authentication error and did not retain safe diagnostic fields. It now logs only `name`, `status`, `code`, and `message` to the browser console while keeping generic user-facing errors.
6. HTTP 429 is now shown as a cooldown message rather than being presented as an incorrect password.
7. The email field now uses `autocomplete="email"`; password uses `current-password`.
8. `public.users` includes `last_login_at`, and provisioning uses an idempotent upsert keyed by the Auth user ID.
9. No password, token, service-role key, or account merge behavior was added.

## Authentication flow

Fresh browser: password form → Supabase `signInWithPassword` → SSR session cookies → `/api/admin/session-check` → exact server allowlist → `/admin`.

Existing session: session check may redirect directly to `/admin`; this is intentionally classified as session reuse, not password proof.

## Verification status

- Direct Supabase password result: not executed because credentials were not available to the diagnostic process.
- Fresh Chrome result: pending.
- Fresh Edge result: pending.
- Second-device result: pending.
- Normal member fresh-login result: pending.
- Multi-session/logout-isolation result: pending.
- Production runtime logs for the new deployment: no matching error/warning logs found.
- Local lint/typecheck/build after the SSD relocation: blocked because the elevated shell could not locate Node/npm. Vercel build completed successfully and deployment is READY.

## Exact retest matrix

1. Open Chrome Incognito and visit `/admin/login`.
2. Confirm there is no existing Supabase storage/cookie state.
3. Enter the exact singular admin email and password; do not use browser autofill.
4. Confirm successful redirect to `/admin`; reload and confirm it remains authenticated.
5. Repeat in Edge InPrivate.
6. Repeat with the normal member account; confirm redirect to `/dashboard`, not `/admin`.
7. Enter an intentionally wrong admin password; confirm no session and the generic error.
8. Test the plural email; confirm it cannot authorize administration.
9. Sign out in one browser and confirm another browser remains signed in.

## Remaining blocker

A fresh password-authentication result from a clean browser/device is still required to distinguish a Supabase credential/account problem from an application/session problem. Do not reset the password until direct Supabase authentication has been tested.
