# Standard Login Migration

## Architecture

Basscally now uses Supabase email/password authentication as the normal sign-in path. The browser uses `@supabase/ssr` cookies; the server middleware refreshes sessions; `/auth/continue` performs the server-side user lookup, idempotently provisions `public.users`, and routes the official admin to `/admin` and other authenticated users to `/dashboard`. Magic-link code remains only as a recovery/migration fallback.

## Existing-user migration

Existing magic-link accounts keep their Supabase identities. They create a password through the signup flow or the password-recovery flow; passwords are never written to `public.users`, logs, or source. A signed-in account-security password form can be added to the account area without changing the Auth authority.

## Checkout account creation

Subscription access remains server-side and is resolved from the subscription row attached to `public.users.id`. New accounts do not receive paid access from an email string alone. Checkout/webhook binding must attach the authenticated Supabase user id before member access is granted; unclaimed accounts remain authenticated but paywalled.

## Recovery and Google

Forgot-password uses `resetPasswordForEmail` and a generic response, with recovery callback to `/auth/reset-password`. Google remains hidden because credentials/provider configuration were not available during this migration.

## Sign-out

The normal sign-out action uses `signOut({ scope: "local" })`, preserving sessions in other browsers. A future explicit global sign-out action can use global scope after confirmation.

## Verification

- Lint: PASS (pre-existing warnings only)
- Typecheck: PASS with `npx tsc --noEmit --incremental false`; package script was blocked by an existing Windows `tsconfig.tsbuildinfo` permission issue.
- Build: PASS (`next build` after stopping stale Node processes and removing generated `.next`).
- Database migration: none required; `public.users.last_login_at` and `subscriptions.user_id` already exist in the checked-in schema.
- Production admin/member repeated-login and multi-browser tests: pending because no password was supplied and no production credentials were printed or generated.

## Security notes

No access/refresh tokens are manually stored. The service-role key remains server-only. Login errors are generic to prevent account enumeration, and the remembered-email feature stores only an email string locally.
