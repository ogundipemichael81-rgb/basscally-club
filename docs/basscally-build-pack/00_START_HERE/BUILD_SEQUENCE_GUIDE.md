# Basscally Club Build Sequence Guide

## Best way to use this package

Do not upload random files one by one into a blank chat.

Use this package inside the project folder.

Recommended process:

1. Create or open the Basscally web app project in Cursor.
2. Unzip this package into the project root under:
   `docs/basscally-build-pack/`
3. Let Cursor index the whole project.
4. Start a new Cursor chat from the project root.
5. Paste the Phase 0 prompt below first.
6. Build phase by phase.
7. After each phase, run the audit prompt before moving on.

## Visual QA gates before backend

Do **not** start Phase B (Supabase, Lemon Squeezy, webhooks) until Phase A selling-path UI passes these repo gates:

| Gate | Document | Quick check |
| --- | --- | --- |
| Visual depth | `docs/visual-depth-quality-gate.md` | Atmosphere on pseudo-layers; cards use gradient + wash; 60-30-10 holds |
| Responsive | `docs/mobile-responsive-quality-gate.md` | 320–1280px + stress 280 / 1440+; P0 collisions; touch targets |
| Motion | `docs/motion-audit-rules.md` | `node scripts/motion-qa.mjs` with dev server running |

Also read `docs/launch-mvp-scope.md` — Phase A sign-off requires all three gates plus `typecheck`, `lint`, and `build`.

The locked design system (`03_DESIGN_MD/04_basscally_design_system.md`) is unchanged; depth and responsive docs are **addenda**, not replacements.

This is better than uploading everything into a single Cursor chat because Cursor can read the files from the repo, track changes, inspect routes, and audit against the docs.

## File reading order for Cursor

Give Cursor this order:

1. `00_START_HERE/README_START_HERE.md`
2. `00_START_HERE/CURSOR_UPLOAD_AND_BUILD_GUIDE.md`
3. `04_BACKEND_DOCUMENTATION/01_PRD_basscally_club_mvp_UPDATED_v1_1.md`
4. `03_DESIGN_MD/04_basscally_design_system.md`
5. `02_SCREEN_MD_AND_SCREEN_INDEX/06_locked_screen_designs_UPDATED_01_33.md`
6. `04_BACKEND_DOCUMENTATION/08_architecture_backend_auth_payments_email_logic.md`
7. `04_BACKEND_DOCUMENTATION/09_routes_wiring_screen_map_and_components.md`
8. `05_PROMPTS_AND_BUILD_PROMPTS/03_cursor_codex_build_prompt_UPDATED_v2.md`
9. `05_PROMPTS_AND_BUILD_PROMPTS/07_master_build_sequence_and_ai_prompts.md`
10. `10_system_checks_audit_prompts_and_acceptance_tests.md` if Cursor asks for audit logic.

When polishing Phase A UI (before Phase B), also read:

- `docs/visual-depth-quality-gate.md`
- `docs/mobile-responsive-quality-gate.md`
- `docs/motion-audit-rules.md`

## Phase 0 prompt to paste first

Use this prompt in Cursor:

I have placed the complete Basscally Club build pack inside `docs/basscally-build-pack/`.

First, do not write application code yet.

Read these files in order:
- `docs/basscally-build-pack/00_START_HERE/README_START_HERE.md`
- `docs/basscally-build-pack/00_START_HERE/CURSOR_UPLOAD_AND_BUILD_GUIDE.md`
- `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/01_PRD_basscally_club_mvp_UPDATED_v1_1.md`
- `docs/basscally-build-pack/03_DESIGN_MD/04_basscally_design_system.md`
- `docs/basscally-build-pack/02_SCREEN_MD_AND_SCREEN_INDEX/06_locked_screen_designs_UPDATED_01_33.md`
- `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/08_architecture_backend_auth_payments_email_logic.md`
- `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/09_routes_wiring_screen_map_and_components.md`

Then return:
1. The stack you detect or recommend.
2. The app routes you will create.
3. The database tables you will create.
4. The API routes and server actions you will create.
5. The auth and subscription gating logic.
6. The screen implementation plan from Screen 01 to Screen 33.
7. The risks or missing environment variables.
8. A PASS / FAIL readiness table.

Do not guess. Cite the exact build-pack file names you used.

## Phase 1 prompt

Now scaffold the app only.

Rules:
- Do not implement business logic yet.
- Create the app structure, route groups, shared layout, design tokens, font setup, reusable UI primitives, sidebar shell, page shell, button, badge, card, toast, and motion wrappers.
- Use the design system from `04_basscally_design_system.md`.
- Use the locked screen index from `06_locked_screen_designs_UPDATED_01_33.md`.
- After scaffolding, run TypeScript, lint, and build checks.
- Return changed files, routes created, and any failed checks.

## Phase 2 prompt

Now implement the public and auth screens.

Build:
- Screen 01 Landing Hero
- Screen 02 Full Landing Page
- Screen 03 Auth Login
- Screen 13 Auth Callback Transition
- Screen 24 404
- Screen 25 500

Use the HTML files in `01_SCREEN_HTML_ORIGINALS/` as visual references. Do not flatten the design quality. Rebuild as production components.

Audit:
- Mobile layout
- Focus states
- Reduced motion
- Route correctness
- Auth callback handling
- No fake subscription unlock

## Phase 3 prompt

Now implement member subscription and content access.

Build:
- Screen 04 Dashboard Empty
- Screen 05 Dashboard Populated
- Screen 06 Content Detail
- Screen 07 Account Membership
- Screen 08 Paywall / Re-subscribe
- Screen 11 Checkout Success
- Screen 12 Checkout Cancelled
- Screen 17 Past-Due Banner
- Screen 18 Cancel Confirmation
- Screen 21 Download Blocked
- Screen 22 Billing Portal Transition
- Screen 30 Download Rate Limit
- Screen 32 Pricing Plan Selector
- Screen 33 Account Billing Management

Rules:
- Access must depend on server-verified subscription state.
- Do not trust client-only status.
- Active users get dashboard, play, and download.
- Past-due users keep access only until paid period end.
- Cancelled users keep access until period end.
- Expired users go to re-subscribe/paywall.
- Downloads use signed URLs and rate limits.

## Phase 4 prompt

Now implement the admin system.

Build:
- Screen 09 Admin Upload Form
- Screen 10 Admin Metrics Dashboard
- Screen 14 Admin Content List
- Screen 15 Admin Subscribers List
- Screen 16 Email Delivery Logs
- Screen 19 Admin Content Edit
- Screen 20 Upload Success / Publish Queued
- Screen 23 Toast System
- Screen 26 Admin Unauthorized
- Screen 27 Manual Resend Confirmation
- Screen 28 Soft Delete Confirmation
- Screen 29 Empty Search Results
- Screen 31 Email Template Previews

Rules:
- Admin routes require server-side admin check.
- Uploads go to object storage.
- Metadata goes to database.
- Publish actions queue emails.
- Soft delete archives content, it must not hard-delete production rows.
- Metrics must be calculated from database, not static mock data.

## Phase 5 prompt

Now implement integrations.

Build:
- Supabase auth and database.
- Lemon Squeezy checkout, portal, and webhook sync.
- Resend transactional emails.
- Vercel cron reminders and weekly drop checks.
- Cloudflare R2 or Supabase Storage signed audio URL handling.
- Admin upload and publish queue.
- Email event logs.

Required email triggers:
- Welcome email after first successful subscription.
- Magic link login email.
- New drop email when a drop is published.
- Payment failed email.
- Renewal or past-due reminder.
- Cancellation confirmation.
- Manual resend for failed recipients only.

## Phase 6 audit prompt

Before saying complete, run this audit.

Check:
- All 33 routes or states exist.
- Every protected member route uses server-side subscription guard.
- Every admin route uses server-side admin guard.
- Webhook validates signature.
- Checkout success does not unlock access without webhook confirmation or verified subscription fetch.
- Audio files are not stored directly in the database.
- Downloads use signed URLs.
- Download rate limit exists.
- Email logs write status and errors.
- Mobile view matches desktop quality.
- Reduced motion support exists.
- Toasts exist for success, error, warning, and info.
- `npm run lint` passes.
- `npm run build` passes.
- TypeScript passes.
- No placeholder secrets exist in code.
- No mock access remains in production paths.

Return a PASS / FAIL table and fix every FAIL before moving on.
