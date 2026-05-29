# BH-12 — Paywall and Re-subscribe Complete

Date: 2026-05-29  
Step: BH-12

## Implemented markers

- paywall
- blurred preview
- reactivate CTA
- founding member re-join
- lapsed member
- anonymous user

## What was implemented

### `/paywall`

- **paywall** — dedicated Screen 8 recovery route with reason-specific copy (anonymous, lapsed, past-due).
- **blurred preview** — locked drop card with blurred cover art, lock overlay, and obscured metadata.
- **reactivate CTA** — primary button links to Lemon Squeezy checkout (founding $1.50 when eligible, otherwise standard monthly); past-due routes to LS billing portal when available.
- **founding member re-join** — note shown only when `is_founding_member=true` and founding spots remain (live DB counter).
- **anonymous user** — middleware redirects unauthenticated `/c/[id]` visits to `/paywall?contentId=…&reason=anonymous`.
- **lapsed member** — authenticated users without access redirect from `/c/[id]`, `/dashboard`, and download 403 to `/paywall` with `reason=lapsed`.

### Routing updates

- Middleware: anonymous `/c/:id` → paywall (not login).
- `/c/[id]`: lapsed and past-due (no access) → paywall with content context.
- `/dashboard`: lapsed → paywall.
- `/pricing?paywall=1` → redirects to `/paywall` for backwards compatibility.

## Files

- `src/app/(marketing)/paywall/page.tsx`
- `src/components/paywall/paywall-view.tsx`
- `src/components/paywall/locked-drop-preview.tsx`
- `src/lib/paywall/types.ts`
- `src/lib/paywall/resolve-context.ts`
- `src/lib/routes.ts` — `routes.paywall()`
- `src/middleware.ts`
- `src/app/(member)/c/[id]/page.tsx`
- `src/app/(member)/dashboard/page.tsx`
- `src/components/content/content-download-button.tsx`
- `src/app/(marketing)/pricing/page.tsx`

## Notes

- Past-due members with grace-period access can still open content; paywall triggers when access is blocked.
- Design follows `08_paywall_resubscribe.html` and the dark editorial system.
