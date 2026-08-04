# Session, preview and admin-flow repair

## Root cause

The account session was not deliberately signed out while choosing a plan. The loop came from every pricing CTA being generated as `/join?plan=...`, even when Supabase had an authenticated session. The old `/join` route always rendered account creation and did not resolve that session first.

## Repair

- Plan destinations are now resolved on the server: anonymous → `/join`, unpaid authenticated member → `/checkout`, active member → `/account/billing`, allowlisted admin → `/admin`.
- `/join` accepts no plan for an account-only entry. It redirects an existing session to checkout when a valid plan exists, otherwise dashboard.
- New accounts sign in through Supabase password auth, then continue directly to the selected checkout plan (or preview dashboard without a selected plan).
- The dashboard now renders an unpaid preview state rather than a membership-required dead end.
- `content.is_free_preview` is a server-enforced database flag. The signed preview API refuses premium content to unpaid people; downloads remain active-members-only.
- `/admin/login` is a separate password-auth interface. Its session check uses the server allowlist; unauthenticated admin routes go there and non-admin accounts are locally signed out.

## Database

Applied to Supabase project `jekavejbfujhxmtryyob`:

- `content.is_free_preview boolean not null default false`
- a partial unique index prevents more than one published free-preview content row.

No live preview track is claimed. An administrator must upload a Basscally-owned audio file and mark it as the free preview before an unpaid listener receives a signed URL.

## Verification

- `npm run typecheck`: passed
- `npm run lint`: passed with 12 pre-existing warnings in audit scripts and existing UI files; no errors
- `npm run build`: passed

## Required production retest

1. Create a new unpaid test account from `/join?plan=annual` and confirm it reaches `/checkout?plan=annual` without visiting `/join` again.
2. With that session open, visit `/pricing` and select Founding Member; confirm `/checkout?plan=founding-monthly`.
3. Visit `/join` while signed in; confirm redirect to `/dashboard`.
4. Sign in through `/admin/login` using `basscally.enquiry@gmail.com`; confirm `/admin`.
5. Sign in through `/admin/login` with a normal account; confirm the session is cleared and the generic unauthorised message is shown.
6. Publish an owned test track, mark it free preview, then confirm unpaid playback works only for that item and download remains rejected.
