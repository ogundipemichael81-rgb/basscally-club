# BH-17 — Utility States Complete

Date: 2026-05-29  
Step: BH-17

## Implemented markers

- 404 page
- 500 page
- admin unauthorized
- rate limit state
- cancel confirmation modal
- billing portal redirect
- past-due grace

## What was implemented

### 404 page

- `src/app/not-found.tsx` — branded Screen 14 layout via `UtilityErrorLayout`
- CTAs: dashboard + home

### 500 page

- `src/app/error.tsx` — branded Screen 15 client error boundary with Retry + dashboard
- `src/components/utility/utility-error-layout.tsx` — shared dark editorial shell (404 / 403 / 500)

### admin unauthorized

- `src/app/admin/unauthorized/page.tsx` — Screen 26; outside admin shell so non-admins never see admin nav
- Middleware redirects non-allowlisted users from `/admin/*` → `/admin/unauthorized`
- CTAs: dashboard + sign in with another email

### rate limit state

- `src/components/utility/download-rate-limit-state.tsx` — Screen 30 informational panel (no retry button)
- Wired in `ContentDownloadButton` when download API returns HTTP 429
- Limit: `DOWNLOAD_RATE_LIMIT_PER_HOUR` (60/hour) enforced server-side in `guarded-download.ts`

### cancel confirmation modal

- `src/components/account/cancel-subscription-dialog.tsx` — Screen 20
- “Yes, cancel” → Lemon Squeezy portal; “Keep my membership” closes modal
- Used on `/account` membership view

### billing portal redirect

- `src/components/account/billing-portal-redirect.tsx` — loading + auto-redirect when portal URL exists
- `src/app/(member)/account/billing/portal/page.tsx` — Screen 28 route; pending state when webhook has not synced URL yet

### past-due grace

- `src/components/account/past-due-banner.tsx` — grace copy when `isPastDue && hasAccess` (access until period end)
- Shown on `/account`, `/account/billing`, `/dashboard`, and `/c/[id]` during past-due grace

## Files

- `src/app/not-found.tsx`
- `src/app/error.tsx`
- `src/app/admin/unauthorized/page.tsx`
- `src/components/utility/utility-error-layout.tsx`
- `src/components/utility/download-rate-limit-state.tsx`
- `src/components/account/billing-portal-redirect.tsx`
- `src/components/account/cancel-subscription-dialog.tsx`
- `src/components/account/past-due-banner.tsx`
- `src/components/content/content-download-button.tsx`
- `src/app/(member)/account/billing/portal/page.tsx`
- `src/app/(member)/dashboard/page.tsx`
- `src/app/(member)/c/[id]/page.tsx`
- `src/middleware.ts`
- `src/lib/routes.ts`

## Notes

- Admin unauthorized page uses root layout only (not `AdminShell`).
- Rate limit state is informational only per button audit Screen 30.
- Legal pages and email automation unchanged.
