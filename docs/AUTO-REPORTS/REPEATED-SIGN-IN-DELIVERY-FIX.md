# Repeated Sign-In Delivery Fix

Date: 2026-08-03
Scope: production magic-link delivery and callback reliability only.

## Root cause

Production had the Resend-backed magic-link route deployed, but its production environment did not contain a usable `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. The route therefore logged `Resend is not configured` and returned a generic failure. Separately, the browser callback still attempted a second client-side PKCE exchange after the server callback had already been designed to exchange the code. That duplicate exchange caused the visible “PKCE code verifier not found in storage” error when links were opened from Gmail or another browser context.

## Changes

- Magic-link delivery configuration is checked before reserving a cooldown.
- A cooldown is committed only after a successful send; failed sends release the reservation so users are not falsely locked out.
- Concurrent sends for the same address are marked as in progress.
- The server callback is the single exchange point for both `code` and `token_hash` links.
- Callback cookies are written to the redirect response before navigation.
- Authenticated users are provisioned/upserted in `public.users` with `id`, `email`, and `last_login_at`.
- The callback routes the official admin email through `/admin`; other authenticated users go to `/dashboard`.
- Added a protected health endpoint that reports only configuration booleans.

## Vercel configuration

Configured without exposing secrets in source or chat:

- `RESEND_API_KEY` (Production and Preview)
- `RESEND_FROM_EMAIL` (Production and Preview; temporary controlled sender `onboarding@resend.dev`)

Existing Supabase and admin variables remain server-side. No secret is committed.

## Sender limitation

Resend currently has no verified sending domain in the connected account. `onboarding@resend.dev` is suitable for controlled testing, but arbitrary-member production delivery should not be considered complete until a Basscally-owned domain is verified in Resend and the sender is changed.

## Verification status

Local lint, typecheck, and build are required before commit. Production deployment and repeated inbox/browser tests must be recorded after the new deployment is ready; no successful repeated-login result is claimed until fresh links are opened in separate browser contexts.

## Retest

1. Open the production login page in Browser A and request a link for the official admin email.
2. Open the newest message in Browser B (or a separate private window) without forwarding or reusing an older message.
3. Confirm one redirect to `/admin`, then reload and navigate between admin pages.
4. Sign out, request a fresh link, and confirm sign-in again.
5. Repeat with a member address and confirm `/dashboard`.
6. Confirm two rapid requests show a friendly cooldown, while a failed provider request does not create a false 60-second lock.
7. Check Vercel runtime logs for successful delivery and absence of `resend_not_configured`, PKCE, or refresh-token loop errors.
