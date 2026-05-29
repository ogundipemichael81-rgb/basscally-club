# BH-06 — Artist and Style Page Complete

Date: 2026-05-28  
Step: BH-06

## Implemented markers

- artist style page
- 30-second preview
- gated
- unlock CTA
- three-click flow
- /style/[slug]

## What was implemented

1. **Artist style page** (`/style/[slug]`) — server-rendered from `styles`, `artists`, and `content_style_tags` with demo fallback (`makossa-tribe-fuego`).
2. **30-second preview** — `GET /api/content/[id]/preview` returns a signed audio URL; client stops playback at `PREVIEW_MAX_SECONDS` (30).
3. **Gated** — visitors get preview-only; active members receive full playback (`gated: false` in API response).
4. **Unlock CTA** — primary and sticky mobile CTAs link to Lemon Squeezy founding checkout via `getFoundingCheckoutUrl()` (falls back to `/pricing` when variant ID is unset).
5. **Three-click flow** — landing hero and mobile sticky CTA route to `routes.defaultStyle` (click 2); style page unlock CTA is click 3 (checkout).
6. **Route** — `routes.style(slug)` → `/style/[slug]`; static param for default slug.

## Page sections

- Artist hero image (or editorial placeholder)
- Style headline and description
- 3–5 track preview cards with type/difficulty badges
- “What you will learn” bullet grid
- Mobile sticky unlock bar (`StyleMobileCtaBar` + `#style-unlock-sentinel`)

## Files added or updated

- `src/app/(marketing)/style/[slug]/page.tsx`
- `src/components/style/style-page-view.tsx`
- `src/components/style/track-preview-player.tsx`
- `src/components/style/style-mobile-cta-bar.tsx`
- `src/app/api/content/[id]/preview/route.ts`
- `src/lib/style/queries.ts`
- `src/lib/style/demo-data.ts`
- `src/lib/style/types.ts`
- `src/lib/style/content-labels.ts`
- `src/lib/content/preview-access.ts`
- `src/lib/lemonsqueezy/checkout-url.ts`
- `src/lib/storage/cover-url.ts`
- `src/lib/routes.ts`
- `src/lib/constants.ts`
- `src/components/marketing/landing-hero.tsx`
- `src/components/marketing/mobile-cta-bar.tsx`

## Notes

- No schema changes.
- No legal or pricing copy changes on `/pricing`.
- Download API remains subscription-gated; preview API is public for published content.
