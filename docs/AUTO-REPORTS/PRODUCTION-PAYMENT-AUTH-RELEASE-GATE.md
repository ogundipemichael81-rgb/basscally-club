# Production payment and authentication release gate

Date: 2026-08-04

## Locked authentication posture

- Email/password account creation and password login are immediate; no email verification or magic link is required.
- Supabase Auth holds passwords. `public.users` stores only profile metadata and the Auth user ID.
- Membership is granted only by the verified Lemon Squeezy webhook that atomically binds a checkout intent to the Auth user ID.
- Google sign-in is hidden because its provider configuration has not been evidenced as complete.
- Automated recovery and six-digit OTP recovery are deferred pending verified sending-domain SMTP setup. The public recovery route provides only a support contact path and does not claim an email or code was sent.

## Implemented password-change flow

`/account/security` is protected by the member middleware and provides a current-session password change. It requires a minimum 12-character password, confirmation, show/hide control and an explicit success/error state. It calls only `supabase.auth.updateUser({ password })`; no password is logged or written to `public.users`. Successful changes retain the current local session, while explicit sign-out clears only that browser session.

## Manual recovery procedure while SMTP is deferred

1. Member contacts `basscally.enquiry@gmail.com` from the email recorded on their account.
2. Basscally support verifies account ownership using non-public account evidence and support history; never disclose whether an arbitrary email exists.
3. Support documents the request and requires the member to create a new password through a controlled Supabase Admin process only after verification.
4. Support tells the member to sign in with the new password and invalidate the local session if they suspect device compromise.

No predictable temporary password, public admin reset endpoint, Resend request or magic-link request is used in this temporary procedure.

## Production evidence

- Current deployment under audit: `dpl_Cp6DaA8MHBdQcgTubajrCPmiyEko`, commit `76fa9a86396081a855dff887d482e90933612699`, READY at the time of audit.
- Controlled production browser test passed: join -> automatic session -> checkout route -> reload persistence -> local sign-out/clear -> password login -> dashboard -> reload persistence. No `/api/auth/magic-link` request occurred.
- `public.users` integrity query: 6 profiles, all match `auth.users.id`; no orphaned or email-only profiles.
- Database has 0 subscriptions and 0 checkout intents. No payment, webhook, cancellation, interrupted-return or replay test has been run.
- Vercel reported no runtime errors in the latest one-hour window. Older pre-password-login recovery/magic-link errors remain historical only.

## Password-change acceptance — production

A fresh controlled unpaid account completed the live sequence: account creation -> `/account/security` -> password update -> application sign-out -> old-password rejection using the same safe login error -> new-password login -> `/dashboard`. The browser made zero magic-link endpoint requests. This confirms the account-security route is authenticated, password-only, and independent of Resend or recovery SMTP.

## Payment gate: blocked pending safe test mode

Lemon test credentials, variant IDs and webhook secret must be confirmed in Vercel without revealing values. Confirm the credentials are test-mode, the webhook is subscribed to the required order/subscription events, and the target is `/api/webhooks/lemonsqueezy`. Then run one no-charge test purchase to prove the signed webhook, user-bound intent, atomic subscription binding, paid-content access, cancelled checkout, interrupted return and replay handling.

Do not use a live Lemon checkout or real card while this gate is unresolved.
