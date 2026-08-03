# Production Auth Reconciliation

Date: 2026-08-03

Cross-browser update: Supabase is now `ACTIVE_HEALTHY`. Existing Auth accounts for the official admin, the plural-email account, and the owner account were backfilled into `public.users` using an idempotent SQL upsert. The callback accepts `token_hash`/`type=email` as the cross-browser path and `code` as a backward-compatible PKCE path.

## Root causes

1. Production was serving an older deployment because the latest deployment failed its build on `/admin/content` (`useSearchParams` without Suspense).
2. The older callback path exposed the Supabase PKCE verifier error. The current callback now performs the exchange server-side and also accepts `token_hash` links where configured.
3. Middleware called Supabase `auth.getUser()` twice per request: once while refreshing the session and again while deciding redirects. This created unnecessary `/user` calls and made refresh/redirect behavior harder to reason about.
4. Authenticated users could exist without a matching `public.users` row. The callback and member resolver now provision that row idempotently.
5. `basscally.enquiry@gmail.com` is the canonical admin email. `basscally.enquiries@gmail.com` remains a separate account and is not admin unless explicitly added to the allowlist.

## Files changed

- `src/app/(auth)/auth/callback/route.ts`
- `src/lib/supabase/middleware.ts`
- `src/middleware.ts`
- `src/lib/subscriptions/resolve-member.ts`
- `src/app/(admin)/admin/content/page.tsx`

## Session flow: before → after

Before: magic link → callback → PKCE exchange → repeated middleware `/user` calls → redirect; missing public user rows and stale deployments could produce loops or blank workspaces.

After: magic link → server callback exchanges `code` (or verifies `token_hash`) → callback writes Supabase cookies on the redirect response → idempotent `public.users` sync → one middleware session refresh/user lookup → admin or member redirect.

No access or refresh tokens are manually stored. Service-role access remains server-only.

## Public user synchronization

After a successful callback, the server upserts the authenticated user into `public.users` using the service role. The member resolver repeats this safely when an authenticated user reaches the app without a row. The operation is idempotent by Auth user ID.

## Admin allowlist

`ADMIN_EMAIL_ALLOWLIST` and `ADMIN_EMAILS` are both parsed as comma-separated, trimmed, case-insensitive values. The canonical production value is:

`basscally.enquiry@gmail.com`

The plural email `basscally.enquiries@gmail.com` is a separate account and will go to `/dashboard` unless explicitly allowlisted.

## Dashboard blinking / navigation

The repeated `/user` lookup was removed from middleware. Session refresh and user classification now happen in one pass. This reduces navigation remounts and refresh loops. The dashboard remains dynamic and renders explicit membership/data failure states rather than a blank page.

## Deployment reconciliation

The previous production deployment was older than the current branch because the newer build failed at `/admin/content`. Production must be retested only after the fixed deployment reaches `Ready`.

## Local checks

- `npx tsc --noEmit --incremental false`: PASS
- `npm run lint`: required after the deployment build is unblocked
- `npm run build`: required after the deployment build is unblocked

## Exact production retest

1. Confirm Supabase project is Active.
2. Confirm Vercel Production variables use the exact active Supabase URL and publishable key.
3. Deploy the commit containing this reconciliation and confirm Vercel status is Ready.
4. Clear only the Basscally site cookies, then open `/auth/login`.
5. Request a magic link for `basscally.enquiry@gmail.com` in the same browser.
6. Open the link in that same browser. Confirm it reaches `/admin`, not `/dashboard`.
7. Repeat with a non-admin email. Confirm it reaches `/dashboard`.
8. Reload dashboard and click each navigation item. Confirm no repeated `/user` loop or redirect to login.
9. Confirm matching rows exist in `public.users` for both accounts.
10. If a link is opened from another device, configure Supabase email templates with `token_hash` support and test the callback branch separately.
