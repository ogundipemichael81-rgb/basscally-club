# BH-15 — Email Automation Complete

Date: 2026-05-29  
Step: BH-15

## Implemented markers

- welcome email
- new-drop notification
- payment failed email
- unsubscribe link
- 100% active subscribers
- within 5 minutes
- 60 seconds

## What was implemented

### Resend templates

- **welcome email** — magic link + WhatsApp community link + dashboard CTA; queued on `subscription_created` and sent immediately when Resend is configured (target **60 seconds**).
- **new-drop notification** — play + download links via `/c/[id]`; custom subject/body from content row when set.
- **payment failed email** — update billing link from Lemon Squeezy portal URLs; queued on `subscription_payment_failed`.

### Unsubscribe

- Signed **unsubscribe link** on all non-transactional templates (welcome, new drop, payment failed).
- `GET /api/email/unsubscribe?token=…` records opt-out in `audit_events` and confirms in HTML.

### Queue + cron

- `email_queue` fan-out to **100% active subscribers** on publish (admin publish-now, schedule publish cron, resend).
- `GET /api/cron/publish-scheduled` — publishes due drops and queues emails.
- `GET /api/cron/send-email-queue` — processes pending queue via Resend.
- Target **within 5 minutes** SLA documented in `EMAIL_DROP_SLA_MINUTES`.

### Webhooks + logs

- Lemon Squeezy webhook triggers welcome / payment-failed queue.
- Resend webhook updates `email_logs` delivery status.
- All sends write to `email_logs`.

## Files

- `src/lib/email/constants.ts`
- `src/lib/email/config.ts`
- `src/lib/email/client.ts`
- `src/lib/email/unsubscribe.ts`
- `src/lib/email/magic-link.ts`
- `src/lib/email/subscribers.ts`
- `src/lib/email/templates/render.ts`
- `src/lib/email/queue/enqueue.ts`
- `src/lib/email/queue/process.ts`
- `src/lib/email/publish-scheduled.ts`
- `src/lib/cron/verify.ts`
- `src/lib/webhooks/lemonsqueezy-handler.ts`
- `src/lib/admin/content/queries.ts`
- `src/lib/admin/email/templates.ts`
- `src/app/api/cron/send-email-queue/route.ts`
- `src/app/api/cron/publish-scheduled/route.ts`
- `src/app/api/email/unsubscribe/route.ts`
- `src/app/api/webhooks/resend/route.ts`

## Notes

- Requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL` for live sends; queue rows remain pending when Resend is not configured.
- Magic link generation uses Supabase Admin `generateLink`; delivery is via Resend welcome template.
- Cron routes accept `Authorization: Bearer CRON_SECRET`.
- **Unchanged by remember-email / persistent-session patch (2026-05-29):** email templates, queue, cron, and webhook behavior were not modified in that auth UX patch.
