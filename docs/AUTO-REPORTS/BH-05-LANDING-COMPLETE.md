# BH-05 — Landing Page and Waitlist Complete

Date: 2026-05-28  
Step: BH-05

## Implemented markers

- landing page complete
- waitlist page
- founding member counter
- mobile sticky CTA
- FAQ accordion

## What was implemented

1. **Landing page** (`src/app/(marketing)/page.tsx`) — `LandingHero`, `LandingSections` (value, how-it-works, comparison, testimonials, FAQ), `FoundingMemberOffer`, `MarketingFooter`, and `MobileCtaBar`.
2. **Waitlist page** (`src/app/(marketing)/waitlist/page.tsx`) — public email capture with optional experience, style, and note fields via `WaitlistForm`.
3. **Founding member counter** — `getFoundingMemberStats()` reads `founding_member_stats` view (fallback: count `users.is_founding_member`); displayed live in `FoundingMemberOffer` with cap from `FOUNDING_MEMBER_CAP` (500).
4. **Mobile sticky CTA** — `MobileCtaBar` uses `IntersectionObserver` on `#hero-cta-sentinel` in the hero; bar slides in on mobile after hero CTA leaves viewport (`lg:hidden`).
5. **FAQ accordion** — `FaqAccordion` in `LandingSections` `#faq` section.

## API and routes

- `POST /api/waitlist` — upserts email into Supabase `waitlist` table (`source: waitlist_page`).
- `routes.waitlist` → `/waitlist`
- `routes.api.waitlist` → `/api/waitlist`

## Files added or updated

- `src/app/(marketing)/page.tsx`
- `src/app/(marketing)/waitlist/page.tsx`
- `src/components/waitlist/waitlist-form.tsx`
- `src/components/marketing/landing-hero.tsx`
- `src/components/marketing/landing-sections.tsx`
- `src/components/marketing/founding-member-offer.tsx`
- `src/components/marketing/mobile-cta-bar.tsx`
- `src/lib/founding/stats.ts`
- `src/app/api/waitlist/route.ts`
- `src/lib/routes.ts`

## Notes

- No legal route or pricing copy changes.
- No schema changes (uses BH-02 `waitlist` table and `founding_member_stats` view).
- Service role used server-only for waitlist API and founding stats.
