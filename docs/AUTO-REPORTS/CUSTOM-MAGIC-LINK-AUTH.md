# Custom Cross-Browser Magic-Link Authentication

Date: 2026-08-03

## Architecture

Production login no longer calls `supabase.auth.signInWithOtp()` from the browser. The server uses the service-role client to generate a one-time Supabase magic link, builds a Basscally callback URL with `token_hash`, and sends it through the existing Resend sender.

The receiving browser verifies `token_hash` server-side and receives Supabase session cookies. No PKCE verifier or browser-local auth token is required.

## Security controls

- Service-role and Resend keys remain server-only.
- Email is normalized and validated.
- IP/email rate limiting remains active.
- Responses are generic and do not reveal account existence.
- Generated links are not logged, stored, or returned to the browser.
- Production callback origin is fixed to `https://basscallyhub.vercel.app`.
- Remembered email stores only the email address.

## Callback and user provisioning

The callback accepts `token_hash`/`type=email` as the primary flow and `code` as legacy fallback. It writes Supabase cookies to the redirect response, provisions `public.users` idempotently, and redirects the official admin to `/admin` and other authenticated users to `/dashboard`.

## Verification

- Supabase project: `ACTIVE_HEALTHY`
- Existing accounts backfilled into `public.users`
- Typecheck: passed
- Lint: passed with existing warnings
- Build: passed before this feature commit; rerun after deployment

Cross-browser email delivery requires Resend production credentials and a verified sender configuration already present in Vercel. No raw magic-link URL or token is included in this report.
