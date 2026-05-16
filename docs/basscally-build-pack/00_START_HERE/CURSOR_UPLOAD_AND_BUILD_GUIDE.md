# Cursor Upload and Project Folder Guide

## Should you upload all files to Cursor?

Best answer:
Put the whole package inside your project folder, then open the project in Cursor.

Do this:

1. Unzip this package.
2. Copy the full folder into your repo as:
   `docs/basscally-build-pack/`
3. Open the repo in Cursor.
4. Ask Cursor to read files from that folder.
5. Build phase by phase.

Do not paste all documents into one prompt. It will lose structure.

## Why project folder is better

Cursor can:
- Search across the docs.
- Compare the HTML references with the app components.
- Keep the build plan inside the repo.
- Re-run audits after code changes.
- Track route files and component files.
- Avoid forgetting the screen list.

## What to upload first

If you must upload to Cursor chat manually, upload in this order:

1. `00_START_HERE/README_START_HERE.md`
2. `00_START_HERE/BUILD_SEQUENCE_GUIDE.md`
3. `04_BACKEND_DOCUMENTATION/01_PRD_basscally_club_mvp_UPDATED_v1_1.md`
4. `03_DESIGN_MD/04_basscally_design_system.md`
5. `02_SCREEN_MD_AND_SCREEN_INDEX/06_locked_screen_designs_UPDATED_01_33.md`
6. `04_BACKEND_DOCUMENTATION/08_architecture_backend_auth_payments_email_logic.md`
7. `04_BACKEND_DOCUMENTATION/09_routes_wiring_screen_map_and_components.md`
8. `05_PROMPTS_AND_BUILD_PROMPTS/03_cursor_codex_build_prompt_UPDATED_v2.md`
9. `01_SCREEN_HTML_ORIGINALS/` screen files when building the related phase.

## What not to do

- Do not ask Cursor to build all 33 screens plus backend in one prompt.
- Do not let Cursor invent new colors, spacing, or layouts.
- Do not let Cursor skip webhook verification.
- Do not let Cursor store audio files inside the database.
- Do not let Cursor unlock members from checkout success alone.
- Do not let Cursor build admin routes without server-side guards.

## Minimum production environment variables

You still need real values for:

- Supabase URL
- Supabase anon key
- Supabase service role key
- Lemon Squeezy API key
- Lemon Squeezy webhook secret
- Lemon Squeezy store ID
- Lemon Squeezy variant IDs for monthly, annual, founder plan
- Resend API key
- Resend verified domain
- Storage provider credentials
- Vercel cron secret
- Admin email allowlist

## Recommended build mode

Build inside the project folder.

Use Cursor for implementation.
Use Codex for deeper audits after each phase.
Use this package as the single source of truth.
