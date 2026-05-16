# Basscally Club — Final Missing Items and Pre-build Checklist

## No build-blocking screen gaps remain
Screens 01 to 33 cover marketing, pricing, auth, checkout, member flow, billing, admin flow, email logs, utility states, toasts, error states, and edge cases.

## Still needed before production build
- Lemon Squeezy store ID
- Lemon Squeezy API key
- Lemon Squeezy webhook secret
- Variant ID for founding monthly
- Variant ID for standard monthly
- Variant ID for annual $18
- Supabase project URL
- Supabase anon key
- Supabase service role key
- Supabase database URL
- Resend API key
- Verified sending domain
- Vercel project
- Domain decision and DNS
- Plausible or Umami choice
- Real admin emails
- Real logo or confirm text mark
- Real TikTok comments
- Real video thumbnails or cover art
- 30-day content buffer
- Terms of Service
- Privacy Policy
- Refund Policy
- Support email address

## Risk checks
- $1.50 plan should not remain open forever.
- Annual plan needs clear checkout and plan_code mapping.
- Past_due and cancelled states must not cut members off early.
- Expired and unpaid users must not access downloads.
- Admin must never hard delete content from UI.
- Email queue must avoid duplicate sends.
- Webhooks must be idempotent.
