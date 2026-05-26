# Basscally Hub — Product Requirements Document v1.1

> **BH-01:** Product name **Basscally Hub**; release cadence **weekly**; drops from **Chris and world-class bassists**.

Status: Updated after full screen design package 01 to 33
Owner: Michael, COO/co-founder

## Product promise
Basscally Hub is a bass practice membership. Members pay for habit, rhythm, downloadable practice material, identity, and progress. Audio is the engine. The product should never feel like a file dump.

## Pricing ladder

### MVP launch prices
- Founding Member: $1.50/month, locked for life while membership stays active.
- Public Monthly: $2.99/month after the founding window closes.
- Annual Lock-in: $18/year.

### Post-MVP tier
- Club Plus: $9/month later, only when the team has a real offer beyond downloads, such as feedback, live challenges, community recognition, or premium drops.

## Pricing rules
- Do not keep $1.50 open forever for every new user.
- Use $1.50 as a founding member acquisition hook.
- Use $18/year to reduce payment-fee drag and create upfront cash.
- Keep the core product affordable enough for global bassists.

## Product scope

### Member-facing
- Landing page
- Pricing page
- Hosted checkout
- Checkout success and cancelled pages
- Magic-link auth
- Dashboard empty and populated states
- Content detail page
- Download gating
- Account and billing management
- Paywall and re-subscribe flow
- Past-due grace state
- Cancel confirmation
- Utility states: 404, 500, download rate limit

### Admin-facing
- Admin metrics dashboard
- Upload form
- Upload success and publish queued state
- Content list
- Content edit
- Soft delete confirmation
- Subscribers list
- Email delivery logs
- Manual resend confirmation
- Email template previews
- Admin unauthorized state

## Screen inventory

| # | Screen | Route | Reference HTML | Purpose |
|---|---|---|---|---|
| 1 | Landing Hero | `/` | `basscally-hero-v2.html` | Marketing hero, pricing anchor, this week drops rail |
| 2 | Full Landing Page | `/` | `basscally-full-landing-v2.html` | Full marketing page using landing copy |
| 3 | Auth Login | `/auth/login` | `basscally-auth-login.html` | Magic link login, loading, validation, success |
| 4 | Dashboard Empty | `/dashboard` | `basscally-screen-4-dashboard-empty-art-motion.html` | New member before content or first login |
| 5 | Dashboard Populated | `/dashboard` | `basscally-screen-5-dashboard-populated-art-motion.html` | Normal library and latest drop |
| 6 | Content Detail | `/c/[id]` | `basscally-screen-6-content-detail-art-motion.html` | Audio player, play, download |
| 7 | Account Membership | `/account` | `basscally-screen-7-account-membership.html` | Subscription status and account actions |
| 8 | Paywall Re-subscribe | `/pricing or /paywall` | `basscally-screen-8-paywall-resubscribe.html` | Expired, no-sub, anonymous recovery |
| 9 | Admin Upload Form | `/admin/content/new` | `basscally-screen-9-admin-upload-form.html` | Audio upload and publish form |
| 10 | Admin Metrics | `/admin` | `basscally-screen-10-admin-metrics-dashboard.html` | MRR, subscribers, failed payments, content health |
| 11 | Checkout Success | `/checkout/success` | `basscally-screen-11-checkout-success.html` | Post-payment, magic link and dashboard direction |
| 12 | Checkout Cancelled | `/checkout/cancelled` | `basscally-screen-12-checkout-cancelled.html` | Recover abandoned checkout |
| 13 | Auth Callback | `/auth/callback` | `basscally-screen-13-auth-callback-motion.html` | Signing-in transition |
| 14 | Admin Content List | `/admin/content` | `basscally-screen-14-admin-content-list-motion.html` | Content table, filters, actions |
| 15 | Admin Subscribers | `/admin/subscribers` | `basscally-screen-15-admin-subscribers-list-motion.html` | Subscriber table, filters, export |
| 16 | Email Delivery Logs | `/admin/email-logs` | `basscally-screen-16-email-delivery-logs-motion.html` | Queue and delivery statuses |
| 17 | Past-Due Banner State | `/dashboard and /account state` | `basscally-screen-17-past-due-banner-motion.html` | Grace period billing state |
| 18 | Cancel Confirmation | `/account/cancel` | `basscally-screen-18-cancel-confirmation-motion.html` | Cancel flow and period-end clarity |
| 19 | Admin Content Edit | `/admin/content/[id]` | `basscally-screen-19-admin-content-edit-motion.html` | Edit scheduled, draft, or published drop |
| 20 | Upload Success Publish Queued | `/admin/content/new success state` | `basscally-screen-20-upload-success-publish-queued-motion.html` | Publish success and queue started |
| 21 | Member Download Blocked | `/c/[id] blocked state` | `basscally-screen-21-member-download-blocked-motion.html` | 403 recovery for non-active users |
| 22 | Billing Portal Transition | `/account/billing/portal` | `basscally-screen-22-billing-portal-transition-motion.html` | Redirect to LS portal |
| 23 | Toast System | `global component` | `basscally-screen-23-toast-system-motion.html` | Success, warning, danger, info toasts |
| 24 | 404 Not Found | `/not-found` | `basscally-screen-24-404-motion.html` | Broken routes and missing content |
| 25 | 500 Error | `/error` | `basscally-screen-25-500-motion.html` | Production error fallback |
| 26 | Admin Unauthorized | `/admin unauthorized state` | `basscally-screen-26-admin-unauthorized-motion.html` | Admin route guard rejection |
| 27 | Manual Resend Confirmation | `/admin/email-logs/resend` | `basscally-screen-27-manual-resend-confirmation-motion.html` | Resend failed emails safely |
| 28 | Soft Delete Confirmation | `/admin/content/[id]/delete` | `basscally-screen-28-soft-delete-confirmation-motion.html` | Archive content, do not hard delete |
| 29 | Empty Search Results | `member/admin state` | `basscally-screen-29-empty-search-results-motion.html` | Search/filter no-results |
| 30 | Download Rate Limit | `/c/[id] rate-limited state` | `basscally-screen-30-download-rate-limit-motion.html` | 60 downloads per user/hour protection |
| 31 | Email Template Previews | `/admin/email-templates` | `basscally-screen-31-email-template-previews-motion.html` | Magic link, new drop, payment failed, welcome, cancellation |
| 32 | Pricing Plan Selector | `/pricing` | `basscally-screen-32-pricing-plan-selector-motion.html` | Founding, monthly, annual, later Club Plus |
| 33 | Account Billing Management | `/account/billing` | `basscally-screen-33-account-billing-management-motion.html` | Self-serve plan, card, invoices, portal |


## Acceptance criteria
- A visitor understands the offer in under 10 seconds.
- A visitor subscribes from landing or pricing to checkout in no more than 3 clicks.
- Lemon Squeezy webhooks create or update users and subscriptions.
- Active, cancelled-in-grace, and past_due-in-period users keep access until the period ends.
- Expired and no-sub users see paywall or re-subscribe routes.
- Downloads use signed URLs and are rate-limited.
- Admin can publish a drop and queue emails.
- Emails send to all active subscribers within 5 minutes of publish.
- Admin can see email delivery health and retry failed sends.
- Members manage card, plan, invoices, and cancellation through the billing portal.
- Mobile view must match desktop quality, not feel like a compressed desktop.
