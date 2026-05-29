# BH-13 — Admin Upload Form and Content Management Complete

Date: 2026-05-29  
Step: BH-13

## Implemented markers

- admin upload form
- audio upload
- artist style tag
- status toggle
- soft delete
- content edit
- email preview

## What was implemented

### `/admin/content/new`

- **admin upload form** — single-screen upload with metadata, email fields, and publish checklist sidebar.
- **audio upload** — MP3/WAV to private Supabase Storage `audio` bucket via server API (max 50MB).
- Optional cover upload to public `covers` bucket.
- Title, type, difficulty, description, release datetime.
- **artist style tag** — style select wired to `content_style_tags`.
- **status toggle** — Draft / Scheduled / Publish now radio cards.
- Email subject and body with validation before publish.
- **email preview** — modal preview of subject and body.
- Save drop → `POST /api/admin/content` with Zod validation and audit log.

### `/admin/content`

- Searchable table of all drops (title, type, style tag, status, dates).
- Edit link → `/admin/content/[id]`.
- Resend button (published rows) → queues `email_queue` placeholder.
- **soft delete** confirmation modal archives drop (`status = archived`).

### `/admin/content/[id]`

- **content edit** — same form pre-populated from DB; `PATCH /api/admin/content/[id]`.
- Replace audio/cover optional; soft delete from sidebar.

### `/admin/content/[id]/delete`

- Dedicated soft delete confirmation page.

### API

- `POST /api/admin/content` — create + storage upload
- `GET/PATCH/DELETE /api/admin/content/[id]` — read, update, soft delete
- `POST /api/admin/content/[id]/resend` — queue resend
- Admin auth via `ADMIN_EMAIL_ALLOWLIST` + session; writes logged to `audit_events`.

## Files

- `src/lib/admin/auth.ts`
- `src/lib/admin/audit.ts`
- `src/lib/admin/content/constants.ts`
- `src/lib/admin/content/schema.ts`
- `src/lib/admin/content/publish.ts`
- `src/lib/admin/content/storage.ts`
- `src/lib/admin/content/queries.ts`
- `src/app/api/admin/content/route.ts`
- `src/app/api/admin/content/[id]/route.ts`
- `src/app/api/admin/content/[id]/resend/route.ts`
- `src/components/admin/admin-content-form.tsx`
- `src/components/admin/admin-content-list.tsx`
- `src/components/admin/admin-email-preview-dialog.tsx`
- `src/components/admin/admin-soft-delete-dialog.tsx`
- `src/app/(admin)/admin/content/new/page.tsx`
- `src/app/(admin)/admin/content/page.tsx`
- `src/app/(admin)/admin/content/[id]/page.tsx`
- `src/app/(admin)/admin/content/[id]/delete/page.tsx`

## Notes

- Publish/schedule enqueues `email_queue` rows; full Resend delivery ships in later autopilot steps.
- Requires Supabase service role + storage buckets from BH-02.
