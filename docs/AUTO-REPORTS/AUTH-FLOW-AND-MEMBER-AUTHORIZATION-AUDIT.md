# Auth Flow and Member Authorization Audit

## Findings

- Recovery callbacks previously created an ordinary Supabase session with no server-controlled flow purpose. This allowed an abandoned recovery session to be treated as a normal admin/member session.
- Cross-browser clickable confirmation links naturally established a session in the browser that opened the link, not the browser that began signup.
- Password login itself remains the primary flow and is independent of email delivery.

## Failed assumptions and current safety posture

The previous implementation incorrectly assumed that a signed browser flow cookie could quarantine a valid Supabase recovery session. It could not: the cookie may expire or be removed while the Supabase session remains valid. It also displayed six-digit code UI without confirming that production templates delivered `{{ .Token }}`.

Recovery and public signup are therefore temporarily fail-closed. Normal email/password login remains available. The recovery-link callback never establishes an application session, and the UI no longer claims a code or email was sent.

## Superseded repairs

- Added an integrity-protected, HttpOnly `basscally_auth_flow` cookie using Web Crypto HMAC.
- Recovery callbacks set `recovery_pending` for 15 minutes and do not provision `public.users` or update login timestamps.
- Middleware quarantines recovery sessions to reset/cancel routes and returns `403 recovery_incomplete` for APIs.
- Reset completion signs out the temporary session locally and clears the flow cookie; cancellation does the same.
- The earlier OTP UI has been removed until the production template and server-only verification architecture are proven.

## Authorization matrix

| Area | Normal user | Recovery pending | Admin |
|---|---|---|---|
| Login | Allowed | N/A (recovery disabled) | Allowed |
| Signup/recovery | Safely unavailable pending secure delivery/claim implementation | N/A | Safely unavailable |
| Dashboard/account/content | Subscription rules apply | Blocked | Explicit admin policy |
| Admin pages/APIs | Blocked | Blocked | Server allowlist required |
| Downloads/previews | Active entitlement required | Blocked | Explicit server policy |

## Email readiness

OTP and recovery depend on Supabase Auth email delivery. Production delivery of a visible six-digit token is unverified, so the code UI is disabled rather than making a false claim.

## Verification

- Typecheck: PASS (`npx tsc --noEmit --incremental false`)
- Build: PASS
- Lint: PASS with pre-existing warnings only
- Database migration: none required
- Live cross-browser and production credential tests: pending deployment and real user credentials

## Remaining blockers

Server-only recovery tickets, verified OTP templates, checkout-specific one-time account claims, and full automated isolated-browser tests remain follow-up work. The current patch does not grant membership from email matching alone and preserves the existing subscription user-id authority.
