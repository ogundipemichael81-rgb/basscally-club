# Authentication and Join routing repair

## Scope

This repair keeps password authentication, Supabase SSR, Lemon Squeezy, and the existing session architecture unchanged.

## Changes

- Admin login now uses the shared Basscally `Input` and `Button` components.
- Admin email/password values are readable on the dark interface and password Show/Hide is available.
- Authentication diagnostics log only safe error code/status information; passwords, tokens, keys, and sessions are never logged.
- Join fields and checkout account fields no longer use `text-black` on dark surfaces.
- Shared input styling now includes Chrome autofill text/background protection.
- Added canonical `routes.joinPlan()` helper.
- Homepage desktop hero, mobile hero, sticky CTA, founding offer, and lower Join CTA now target `/join?plan=founding-monthly`.
- The existing `/join` server route preserves the selected plan, creates the account first, and sends an authenticated unpaid user directly to `/checkout?plan=...`.
- Existing pricing/style checkout destinations continue to use the server-owned checkout resolver; active members go to billing and admins go to `/admin`.

## Authentication interpretation

A laptop that is already signed in is an existing-session result, not proof that a fresh device accepts the password. Fresh-device password acceptance requires a clean browser context and controlled credentials supplied only through test environment variables.

## Verification status

- Production Supabase project parity: previously confirmed against project `jekavejbfujhxmtryyob` without exposing key values.
- Admin allowlist: existing server-side allowlist behavior preserved.
- Fresh password authentication: not executed from this environment because no credentials were requested or stored.
- Second clean-browser test: pending a controlled test credential.
- Local lint/typecheck/build: blocked in the relocated Windows shell because Node/npm is unavailable after SSD relocation; Vercel production build is the required deployment gate.

## Retest plan after READY

1. Open a private browser at `/admin/login`.
2. Enter the official admin credentials manually; do not reuse an existing session.
3. Confirm `/admin` loads, then reload and confirm persistence.
4. Repeat in a second clean browser context.
5. Open the homepage in a fresh context and activate the primary Join CTA.
6. Confirm destination `/join?plan=founding-monthly`.
7. Create a new account and confirm continuation to `/checkout?plan=founding-monthly`.
8. Repeat as an existing unpaid user and confirm no account-creation loop.
9. Confirm admin/account billing routing remains separate.
10. Verify desktop and 390px mobile field contrast and CTA hit areas.