# BH-03 — Lemon Squeezy Webhook and Subscription Access

**Step:** BH-03  
**Date:** 2026-05-25  
**Status:** Complete in repo (configure secrets + LS webhook URL in dashboard to go live)

---

## subscription_created

- Handled in `src/lib/webhooks/lemonsqueezy-handler.ts`
- Upserts `users` + `subscriptions`, sets **is_founding_member** when plan is `founding_monthly` and cap &lt; 500
- Triggers Supabase Auth `admin.generateLink` magic link (email delivery via Supabase Auth settings)

## subscription_cancelled

- Forces internal status `cancelled`; access until `ends_at` / `current_period_end` per `subscriptionGrantsAccess()`

## subscription_payment_failed

- Maps to `past_due` status on subscription row

## Also handled

- `subscription_updated`, `subscription_expired`, `subscription_payment_success`, `subscription_resumed`, `subscription_payment_recovered`

## HMAC SHA256

- `src/lib/lemonsqueezy/verify-signature.ts` — verifies `X-Signature` header against raw body + `LEMONSQUEEZY_WEBHOOK_SECRET`
- Route returns `401` on invalid signature

## idempotent

- Dedupe key: `event_name:subscription_id:updated_at` stored in `audit_events` (`action = lemonsqueezy_webhook`)
- Duplicate deliveries return `200` with `{ duplicate: true }`

## is_founding_member

- Set on create/update when `plan_code === founding_monthly` and `count(users where is_founding_member) < 500` (`FOUNDING_MEMBER_CAP`)
- Existing founders keep flag once set

## download API

- `GET /api/content/[id]/download` — `src/app/api/content/[id]/download/route.ts`
- Delegates to `src/lib/downloads/guarded-download.ts`

## subscription check server-side

- Resolves member via Supabase session or dev `basscally_mock_user_id` cookie (simulator)
- Loads `subscriptions` from DB (service role)
- `subscriptionGrantsAccess()` enforces active / grace / cancelled-with-future-end rules
- Returns signed URL from private **audio** bucket; logs row in **downloads** table; rate limit 60/hour

---

## Files added

| Path |
| --- |
| `src/lib/lemonsqueezy/types.ts` |
| `src/lib/lemonsqueezy/verify-signature.ts` |
| `src/lib/lemonsqueezy/plan-from-variant.ts` |
| `src/lib/lemonsqueezy/map-status.ts` |
| `src/lib/subscriptions/access.ts` |
| `src/lib/subscriptions/resolve-member.ts` |
| `src/lib/webhooks/lemonsqueezy-handler.ts` |
| `src/lib/storage/audio-path.ts` |
| `src/lib/downloads/guarded-download.ts` |

## Files updated

| Path |
| --- |
| `src/app/api/webhooks/lemonsqueezy/route.ts` |
| `src/app/api/content/[id]/download/route.ts` |
| `src/lib/env.ts` |

## Env required (live)

```bash
LEMONSQUEEZY_WEBHOOK_SECRET=
LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID=
LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID=
LEMONSQUEEZY_ANNUAL_18_VARIANT_ID=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Webhook URL: `https://<your-domain>/api/webhooks/lemonsqueezy`

## Not in BH-03

- BH-04 login/callback UI wiring
- Resend payment-failed email (webhook stores state only)
- Lemon Squeezy checkout URL on pricing CTAs
