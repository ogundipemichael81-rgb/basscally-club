# BH-10 — Content Detail and Download API Complete

Date: 2026-05-29  
Step: BH-10

## Implemented markers

- audio player
- signed URL
- download API
- subscription check
- scrub bar
- rate limit state
- share button

## What was implemented

### `/c/[id]`

- **Content detail page** — metadata from DB (type, difficulty, published date, download count, issue label).
- **Back to library** → `/dashboard`.
- **Active member only** — auth middleware + `getMemberSession()`; lapsed members redirect to `/pricing?paywall=1`.

### Audio player

- **audio player** — play/pause, HTML5 audio via signed Storage URL.
- **signed URL** — loaded from `GET /api/content/[id]/preview` (`createPreviewAccess()` → Supabase signed URL).
- **scrub bar** — range input wired to `currentTime` / `duration`.
- **Time display** — current and total time (MM:SS).

### Download

- **download API** — existing `GET /api/content/[id]/download` (`createGuardedDownloadUrl()`).
- **subscription check** — server-side before signed URL; 403 when lapsed.
- **Download button** — fetches API; opens signed URL on success; redirects to paywall on 403.
- **rate limit state** — 429 from API shows download-blocked UI (hourly cap from `DOWNLOAD_RATE_LIMIT_PER_HOUR`).

### Share

- **share button** — Web Share API when available; clipboard fallback for `/c/[id]` member URL.

## Files

- `src/lib/content/queries.ts`
- `src/app/(member)/c/[id]/page.tsx`
- `src/components/content/content-detail-view.tsx`
- `src/components/content/content-audio-player.tsx`
- `src/components/content/content-download-button.tsx`
- `src/components/content/content-share-button.tsx`
- `src/app/api/content/[id]/download/route.ts` (existing gated download)
- `src/app/api/content/[id]/preview/route.ts` (existing signed URL for playback)
- `src/lib/downloads/guarded-download.ts` (existing subscription + rate limit)
- `src/lib/content/preview-access.ts` (existing signed URL generation)

## Notes

- Stream first, download second — Play in audio player; Download is secondary CTA.
- Demo content IDs match `supabase/seed.sql` when DB unavailable (metadata only; playback requires Storage).
