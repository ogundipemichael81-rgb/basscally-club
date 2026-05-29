# BH-07 — Pricing Page Complete

Date: 2026-05-28  
Step: BH-07

## Implemented markers

- three-tier pricing
- founding member centre
- spot counter live
- Monthly variant
- Annual variant

## What was implemented

1. **Three-tier pricing** on `/pricing` — Monthly Hub ($2.99), Founding Member ($1.50), Annual lock-in ($18/year) in a three-column grid with orbit/wave decorative motion preserved.
2. **Founding member centre** — display order is Monthly | **Founding** | Annual; founding card is highlighted, scaled, and visually dominant (compromise effect).
3. **Spot counter live** — `PricingFoundingCounter` uses `getFoundingMemberStats()` from Supabase `founding_member_stats` view (fallback when service role unavailable).
4. **Monthly variant** — `standard_monthly` CTA uses `getCheckoutUrl("standard_monthly")` → `LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID`.
5. **Annual variant** — `annual_18` CTA uses `getCheckoutUrl("annual_18")` → `LEMONSQUEEZY_ANNUAL_18_VARIANT_ID`.

Founding CTA uses `LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID`. When a variant ID is unset, checkout URLs fall back to `/pricing`.

## Files updated

- `src/app/(marketing)/pricing/page.tsx`
- `src/components/marketing/pricing-plan-selector.tsx`
- `src/components/marketing/pricing-founding-counter.tsx`
- `src/lib/plans.ts`
- `src/lib/lemonsqueezy/checkout-url.ts`

## Notes

- No schema or legal copy changes.
- Pricing CTAs no longer stub to `/checkout/success`.
