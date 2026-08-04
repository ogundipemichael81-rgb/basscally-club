# Auth Flow and Member Authorization Audit

## Findings

- Recovery callbacks previously created an ordinary Supabase session with no server-controlled flow purpose. This allowed an abandoned recovery session to be treated as a normal admin/member session.
- Cross-browser clickable confirmation links naturally established a session in the browser that opened the link, not the browser that began signup.
- Password login itself remains the primary flow and is independent of email delivery.

## Repairs

- Added an integrity-protected, HttpOnly `basscally_auth_flow` cookie using Web Crypto HMAC.
- Recovery callbacks set `recovery_pending` for 15 minutes and do not provision `public.users` or update login timestamps.
- Middleware quarantines recovery sessions to reset/cancel routes and returns `403 recovery_incomplete` for APIs.
- Reset completion signs out the temporary session locally and clears the flow cookie; cancellation does the same.
- Added six-digit signup and recovery OTP entry screens using Supabase `verifyOtp` with `signup` and `recovery` types.
- Added paste-friendly numeric OTP input, mobile numeric keyboard support, and safe errors.

## Authorization matrix

| Area | Normal user | Recovery pending | Admin |
|---|---|---|---|
| Login/signup/recovery | Allowed | Reset/cancel only | Allowed when not pending |
| Dashboard/account/content | Subscription rules apply | Blocked | Explicit admin policy |
| Admin pages/APIs | Blocked | Blocked | Server allowlist required |
| Downloads/previews | Active entitlement required | Blocked | Explicit server policy |

## Email readiness

OTP and recovery depend on Supabase Auth email delivery. The UI now handles returned errors instead of showing false success, but arbitrary-member delivery still requires a production-ready Supabase SMTP/provider configuration.

## Verification

- Typecheck: PASS (`npx tsc --noEmit --incremental false`)
- Build: PASS
- Lint: PASS with pre-existing warnings only
- Database migration: none required
- Live cross-browser and production credential tests: pending deployment and real user credentials

## Remaining blockers

Checkout-specific one-time account claims and full automated isolated-browser tests remain follow-up work. The current patch does not grant membership from email matching alone and preserves the existing subscription user-id authority.
