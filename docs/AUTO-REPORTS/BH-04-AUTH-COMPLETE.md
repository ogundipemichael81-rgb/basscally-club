# BH-04 — Magic Link Auth Complete

Date: 2026-05-26  
Step: BH-04

Implemented end-to-end auth flow for Basscally Hub using Supabase helpers from BH-02/BH-03.

## Implemented markers

- magic link
- auth callback
- middleware
- rate limit
- member routes protected
- admin routes protected

## What was implemented

1. `/auth/login` now sends a real **magic link** through `/api/auth/magic-link`.
2. `/api/auth/magic-link` validates email, applies in-memory resend **rate limit**, and calls `supabase.auth.signInWithOtp`.
3. `/auth/callback` page now processes tokens/codes with Supabase browser client (**auth callback**), then redirects to `/dashboard`.
4. Edge **middleware** now refreshes session, protects member/admin routes, preserves dev simulator mock-cookie access, and checks admin allowlist for admin pages.
5. Added helper `getUserFromRequest` for middleware-level session checks.

## Files updated

- `src/app/api/auth/magic-link/route.ts`
- `src/lib/auth/rate-limit.ts`
- `src/components/auth/login-form.tsx`
- `src/components/auth/callback-content.tsx`
- `src/lib/supabase/middleware.ts`
- `src/middleware.ts`
- `src/lib/routes.ts`

## Notes

- No legal route changes (`/terms`, `/privacy`, `/refund-policy` unchanged).
- No pricing/copy changes.
- No BH-05+ work included.

## Post-BH-04 patch — remember email & persistent session (2026-05-29)

- Login form adds **Remember my email on this device** (localStorage only — email string, no tokens or magic links).
- Prefills saved email on return visits; **Forget saved email** clears localStorage.
- Helper copy: login stays active on this device unless the user signs out.
- Middleware redirects signed-in users (and dev mock session) from `/auth/login` → `/dashboard`.
- Sign out clears Supabase session only; remembered email is preserved unless the user forgets it.
- Supabase SSR `updateSession` continues to refresh auth cookies on matched routes.
