# BH-14 — Admin Metrics Dashboard Complete

Date: 2026-05-29  
Step: BH-14

## Implemented markers

- metrics dashboard
- active subscribers
- MRR
- export CSV
- subscribers list
- email delivery logs
- admin middleware

## What was implemented

### `/admin` — metrics dashboard

- **metrics dashboard** with four live DB cards: **active subscribers**, **MRR**, new this month, failed payments.
- Decorative **sparkline bars** on each metric card (12-day activity).
- Next scheduled drop countdown from `content.scheduled_for`.
- Recent content table with search and edit links.
- **Export CSV** button → `GET /api/admin/subscribers/export`.

### `/admin/subscribers`

- **subscribers list** with email search, status filter (active / past-due / cancelled), and pagination.
- **Export CSV** from the same server endpoint.

### `/admin/email-logs`

- **email delivery logs** table from `email_logs` (type, recipient, drop, status, sent time).

### `/admin/email-templates`

- Template preview cards for welcome, new drop, payment failed, and cancellation emails.

### **admin middleware**

- `/admin/*` routes require authenticated user on `ADMIN_EMAIL_ALLOWLIST`.
- `/api/admin/*` routes protected in middleware (401/403 JSON) plus `requireAdminApi()` on export.
- Dev mock admin cookie (`mock-admin-michael`) supported.

## Files

- `src/lib/admin/metrics/mrr.ts`
- `src/lib/admin/metrics/queries.ts`
- `src/lib/admin/email/templates.ts`
- `src/components/admin/admin-metrics-dashboard.tsx`
- `src/components/admin/admin-metrics-content-panel.tsx`
- `src/components/admin/admin-metric-sparkline.tsx`
- `src/components/admin/admin-drop-countdown.tsx`
- `src/components/admin/admin-subscribers-list.tsx`
- `src/components/admin/admin-email-logs-list.tsx`
- `src/components/admin/admin-email-templates-view.tsx`
- `src/app/api/admin/subscribers/export/route.ts`
- `src/middleware.ts`
- `src/app/(admin)/admin/page.tsx`
- `src/app/(admin)/admin/subscribers/page.tsx`
- `src/app/(admin)/admin/email-logs/page.tsx`
- `src/app/(admin)/admin/email-templates/page.tsx`

## Notes

- Metrics read from `subscriptions` using the same access rules as member gating.
- MRR sums monthly-equivalent plan prices for access-granting subscriptions.
- Email sending and log population ship in BH-15.
