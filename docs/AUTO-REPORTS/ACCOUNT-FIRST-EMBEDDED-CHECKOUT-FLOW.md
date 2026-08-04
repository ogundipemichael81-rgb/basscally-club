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
