# Basscally Club — Architecture, Backend, Auth, Payments, Email Logic

## Stack
- Next.js 15 App Router
- TypeScript strict
- Tailwind CSS v4
- shadcn/ui primitives
- Supabase Auth, Postgres, and private Storage
- Drizzle ORM
- Lemon Squeezy checkout and subscription webhooks
- Resend transactional email
- Vercel Cron with database queue tables
- Plausible or Umami analytics

## Core data model additions

### users
- id
- email
- name
- country
- is_founding_member
- created_at
- last_login_at

### subscriptions
- id
- user_id
- provider
- provider_customer_id
- provider_subscription_id
- provider_variant_id
- provider_price_id
- plan_code: founding_monthly, standard_monthly, annual_18, club_plus
- status: active, cancelled, past_due, unpaid, expired, paused, on_trial
- current_period_start
- current_period_end
- renews_at
- ends_at
- cancel_at_period_end
- customer_portal_url
- update_payment_method_url
- last_webhook_event_id
- created_at
- updated_at

### content
- id
- title
- type: bassless_track, groove, fill, challenge
- description
- difficulty: beginner, intermediate, advanced
- audio_storage_key
- cover_image_url
- status: draft, scheduled, published, archived
- scheduled_for
- published_at
- email_subject
- email_body
- created_by_admin_id
- created_at
- updated_at

### email_queue
- id
- user_id
- content_id
- email_type
- status: pending, processing, sent, failed
- attempts
- scheduled_for
- locked_at
- provider_message_id
- error_reason
- created_at
- updated_at

### email_logs
- id
- user_id
- content_id
- email_type
- status: queued, sent, failed, bounced, opened, clicked, complained
- provider_message_id
- provider_event_id
- error_reason
- sent_at
- created_at

### downloads
- id
- user_id
- content_id
- downloaded_at
- ip_hash
- user_agent_hash

### audit_events
- id
- actor_user_id
- actor_email
- action
- entity_type
- entity_id
- metadata_json
- created_at

## Pricing and Lemon Squeezy variants
Create these variant IDs in `.env`:

```bash
LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID=
LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID=
LEMONSQUEEZY_ANNUAL_18_VARIANT_ID=
LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID=
```

Plan logic:
- `founding_monthly` remains open until founding cap is reached.
- After cap or manual toggle, public monthly defaults to `standard_monthly`.
- `annual_18` is available from pricing and billing management.
- `club_plus` remains hidden until the offer exists.

## Subscription access rules
Access is granted when:
- status is `active`.
- status is `cancelled` and `ends_at` or `current_period_end` is in the future.
- status is `past_due` and current period is still active.

Access is denied when:
- user is anonymous.
- no subscription exists.
- status is `expired`.
- status is `unpaid` beyond allowed grace.

## Lemon Squeezy webhook events
Handle:
- subscription_created
- subscription_updated
- subscription_cancelled
- subscription_resumed
- subscription_expired
- subscription_payment_success
- subscription_payment_failed
- subscription_payment_recovered

Webhook requirements:
- Verify HMAC signature.
- Store provider event ID and reject duplicates.
- Upsert user by email.
- Upsert subscription by provider subscription ID.
- Store customer portal URLs from subscription payload where available.
- Trigger magic link after first subscription creation.
- Trigger payment failed email when status becomes `past_due`.
- Trigger cancellation confirmation when status becomes `cancelled`.

## Auth
- Supabase magic link.
- Server-side cookie session handling.
- Middleware protects member and admin routes.
- Admin routes require both authentication and server-side admin email or role check.

## Storage and downloads
- Audio files live in Supabase private Storage bucket `audio`.
- API route checks active access before generating signed URL.
- Signed URL expiry: 1 hour.
- Rate limit: 60 signed URL requests per user per hour.
- Log successful download requests.

## Email automation

### New drop flow
1. Admin publishes content.
2. Content status becomes `published`.
3. System inserts one `email_queue` row per active subscriber.
4. Cron runs every minute.
5. Cron locks pending rows, sends via Resend, writes `email_logs`.
6. Failed sends retry up to 3 times with backoff.

### Reminder logic
- New drop notification: immediately on publish.
- Welcome email: 1 hour after first login.
- Payment failed: when LS webhook marks subscription past_due.
- Cancellation confirmation: when cancellation webhook arrives.
- Renewal reminder for annual: 7 days before renewal, post-MVP if needed.
- Content buffer alert: admin only, when scheduled drops fall below 14 days.

## Admin responsibilities
- Upload audio and metadata.
- Publish now or schedule.
- View metrics.
- View content list.
- Edit content.
- Soft delete only, no hard delete from UI.
- View subscribers.
- Export subscribers.
- View email logs.
- Retry failed sends.

## Self-serve billing
- Member clicks billing portal button.
- App fetches latest subscription from DB.
- Redirects to stored or refreshed Lemon Squeezy customer portal URL.
- Member updates card, changes plan, views invoices, or cancels.
- Webhook syncs the result back to local DB.
