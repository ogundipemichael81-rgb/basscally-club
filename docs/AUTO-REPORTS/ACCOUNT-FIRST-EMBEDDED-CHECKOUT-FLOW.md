# Account-first embedded checkout flow

## Final journey
Public membership CTAs go to `/join?plan=founding-monthly|standard-monthly|annual`. Basscally creates the password account in the initiating browser, signs it in with password, and opens `/checkout`. The server creates the short-lived `checkout_intents` record and creates a custom Lemon Squeezy overlay checkout. The verified webhook, not the browser redirect or checkout email alone, atomically binds the subscription to the authenticated `public.users.id`. `/checkout/success` polls only the current user’s intent and redirects to `/dashboard` only after `paid`.

## Rejected journey
The former post-payment, email-linked manual account claim is removed. Public pages do not expose static Lemon Squeezy buy URLs. Magic-link login, public `/auth/signup`, OTP, and password recovery remain paused.

## Security decisions
- `subscriptions.user_id` is nullable only while a verified webhook is awaiting atomic binding.
- `checkout_intents` are user-bound, time-limited, explicit-state records; no raw payment URL or token is persisted.
- Lemon custom data carries only the opaque intent UUID; verified webhook signature plus matching intent, variant and normalized customer email is required.
- Email equality is a consistency check, never authorization. Ownership comes from Auth user ID -> intent -> signed webhook -> subscription.user_id.
- `complete_checkout_intent` locks intent and subscription records, refuses replay/expired/mismatched/other-owned subscriptions, and is executable only by `service_role`.
- A payment return is only a confirmation-pending screen. A lost redirect does not lose a later valid webhook binding.

## Deployment constraints
The repository now contains the server-side integration. A real checkout requires Production `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, plan variant IDs, webhook secret, Supabase service-role key, and a Lemon webhook configured for custom data. These values are not present in local `.env.local`, so no real payment was created in this pass.

## Tests completed
TypeScript, lint and production build run locally. The database migration was applied to Supabase project `jekavejbfujhxmtryyob`. No real Lemon Squeezy payment or Playwright payment test has been run because no test-mode payment configuration is available to this process.

## Remaining production gate
Before launching checkout, set/verify the existing server-only Lemon production values in Vercel, configure subscription webhook events, then run an isolated Lemon test purchase. Verify webhook binds the subscription once, dashboard unlocks after `paid`, cancellation stays unpaid, and an interrupted return still unlocks after later login.

## Production acceptance — 2026-08-04

### Verified without a payment attempt
- Production deployment `dpl_Cp6DaA8MHBdQcgTubajrCPmiyEko` is READY and serves commit `76fa9a86396081a855dff887d482e90933612699`.
- A fresh controlled unpaid account completed `/join?plan=annual` -> automatic password session -> `/checkout?plan=annual`; the session remained valid after reload.
- After clearing the browser session, password login completed -> `/auth/continue` -> `/dashboard`; the dashboard session also remained valid after reload.
- The production browser made zero calls to `/api/auth/magic-link` during this path.
- The join route requires email, password and confirmation. The public client sends no trusted user ID, service-role key or Lemon variant ID. Admin/system registration is rejected server-side.
- Post-test integrity query: all 6 `public.users` rows match an `auth.users` ID; none is an email-only or orphaned profile.
- There are currently 0 subscriptions and 0 checkout intents. Therefore no account has been granted membership by this acceptance test.
- Code review confirms checkout intents are user-bound, server-plan-selected, expire after 30 minutes, and status polling is scoped to the current authenticated user. The verified webhook performs email/variant/expiry checks and calls the single-use ownership-binding RPC. Existing subscription ownership is not overwritten by a replay.

### Not passed / intentionally not attempted
- Lemon test-mode configuration could not be verified from the available production configuration, so no Lemon overlay, test purchase, signed webhook, subscription binding, cancellation, or interrupted-return activation was attempted. No financial charge was made.
- Active-member dashboard access cannot be proven until a Lemon test purchase creates a real subscription. The unpaid controlled account reached the authenticated dashboard without a redirect loop; protected paid content remains unproven as active.
- There are no historical subscriptions in the database. Current records are development/unpaid accounts only; no legacy paid-member migration is required. Do not reconcile ownership by email.

### Production logs
- The earlier Vercel failure was deployment `dpl_Fvt8fyyjjfZr82Ux9Zbmk85FjHLK`, caused by an unwrapped `useSearchParams()` call on `/checkout/success`. It was superseded by the READY deployment above.
- Vercel reports no runtime errors in the most recent hour. Supabase Auth shows successful password-login activity from this test and no magic-link request from it. Older logs retain recovery/magic-link-era rate-limit events and clustered `/user` calls; they do not belong to this password-login acceptance path and should be allowed to age out before interpreting them as current incidents.

### Remaining release blocker
Confirm Lemon Squeezy **test mode** in Vercel, configure the signed webhook against this production URL, then run one isolated no-charge test purchase. Only that test can pass webhook binding, replay protection in production, active membership, cancelled checkout, and interrupted-return recovery.
