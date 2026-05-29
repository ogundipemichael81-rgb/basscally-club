# BH-11 — Account and Billing Management Complete

Date: 2026-05-29  
Step: BH-11

## Implemented markers

- account page
- subscription status
- LS customer portal
- cancel confirmation
- past-due banner
- billing management

## What was implemented

### `/account`

- **account page** — membership hero, plan/price, email, period end, renewal date.
- **subscription status** — live badge from `subscriptions.status` (Active, Past due, Cancelled, etc.).
- Founding member badge from `users.is_founding_member`.
- **Manage billing** → Lemon Squeezy **LS customer portal** URL from `customer_portal_url` (fallback `/account/billing/portal`).
- **cancel confirmation** — modal with “Yes, cancel” (portal) and “Keep my membership”.
- Sign out via Supabase.

### `/account/billing`

- **billing management** — plan info, subscription status, period end, access summary.
- **Open billing portal** button → LS customer portal.

### `/account/billing/portal`

- Server redirect to `customer_portal_url` when webhook-populated; fallback state if not yet available.

### Shared components

- **past-due banner** — shows when `status === past_due`; **Update payment** → LS portal.

## Files

- `src/lib/account/subscription-summary.ts`
- `src/app/(member)/account/page.tsx`
- `src/app/(member)/account/billing/page.tsx`
- `src/app/(member)/account/billing/portal/page.tsx`
- `src/components/account/account-membership-view.tsx`
- `src/components/account/account-billing-view.tsx`
- `src/components/account/past-due-banner.tsx`
- `src/components/account/cancel-subscription-dialog.tsx`
- `src/components/account/account-cancel-content.tsx`

## Notes

- Portal URLs stored on `subscriptions` via BH-03 Lemon Squeezy webhook (`customer_portal_url`, `update_payment_method_url`).
- Invoice downloads and plan switches remain in Lemon Squeezy (MoR).
