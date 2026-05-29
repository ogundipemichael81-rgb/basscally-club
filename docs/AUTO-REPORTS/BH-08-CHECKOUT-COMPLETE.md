# BH-08 — Checkout Success and Cancelled Complete

Date: 2026-05-28  
Step: BH-08

## Implemented markers

- checkout success
- checkout cancelled
- membership pass
- WhatsApp community link
- resend magic link

## What was implemented

### `/checkout/success`

- **Membership pass** card reads live subscription data from Supabase (`users` + `subscriptions`) via `getCheckoutSuccessContext()`.
- **Three next-step cards** (payment, magic link, practice).
- **Magic link explanation** in lede and fine print.
- **Go to dashboard** primary CTA → `/dashboard`.
- **Resend magic link** button → `POST /api/auth/magic-link` with checkout email.
- **WhatsApp community link** when `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` is set; otherwise welcome-email fallback copy.

### `/checkout/cancelled`

- Reassurance copy and founding member price ($1.50 vs $2.99).
- **Return to checkout** CTA → Lemon Squeezy founding variant via `getFoundingCheckoutUrl()`.
- Live founding spots note when DB counter is available.

## Files

- `src/lib/checkout/success-context.ts`
- `src/lib/community/whatsapp.ts`
- `src/lib/social-links.ts`
- `src/lib/lemonsqueezy/checkout-url.ts`
- `src/app/(marketing)/checkout/success/page.tsx`
- `src/app/(marketing)/checkout/cancelled/page.tsx`
- `src/components/checkout/checkout-success-content.tsx`
- `src/components/checkout/checkout-cancelled-content.tsx`
- `src/components/checkout/checkout-meter.tsx` (`ResendMagicLinkButton`)

## Notes

- Official social CTAs (WhatsApp, TikTok, Instagram) added post-BH-08 verification via `src/lib/social-links.ts` and wired to checkout success + marketing footer.
- `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` optional override; defaults to the official WhatsApp community invite.
- Lemon Squeezy success redirect includes `?email={checkout_email}`.
