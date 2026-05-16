# Basscally Club — Routes, Wiring, Screen Map, Components

## Route table

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


## App routes

### Marketing
- `/` maps to Screen 2 and includes Screen 1 hero.
- `/pricing` maps to Screen 32.

### Auth
- `/auth/login` maps to Screen 3.
- `/auth/callback` maps to Screen 13.

### Checkout
- `/checkout/success` maps to Screen 11.
- `/checkout/cancelled` maps to Screen 12.

### Member
- `/dashboard` maps to Screen 4 or 5 by content state and subscription state.
- `/c/[id]` maps to Screen 6, Screen 21, or Screen 30 by access/download state.
- `/account` maps to Screen 7.
- `/account/billing` maps to Screen 33.
- `/account/billing/portal` maps to Screen 22.
- `/account/cancel` maps to Screen 18.

### Admin
- `/admin` maps to Screen 10.
- `/admin/content` maps to Screen 14.
- `/admin/content/new` maps to Screen 9 and Screen 20 after success.
- `/admin/content/[id]` maps to Screen 19.
- `/admin/content/[id]/delete` maps to Screen 28.
- `/admin/subscribers` maps to Screen 15.
- `/admin/email-logs` maps to Screen 16.
- `/admin/email-logs/resend` maps to Screen 27.
- `/admin/email-templates` maps to Screen 31.
- unauthorized admin access maps to Screen 26.

### Utility
- `not-found.tsx` maps to Screen 24.
- `error.tsx` maps to Screen 25.
- Global toasts map to Screen 23.
- Empty search states map to Screen 29.

## API routes
- `POST /api/webhooks/lemonsqueezy`
- `POST /api/webhooks/resend`
- `GET /api/content/[id]/download`
- `GET /api/cron/publish-scheduled`
- `GET /api/cron/send-email-queue`
- `GET /api/cron/send-reminders`

## Shared components
- `components/layout/member-shell.tsx`
- `components/layout/admin-shell.tsx`
- `components/marketing/pricing-plan-card.tsx`
- `components/member/audio-player.tsx`
- `components/member/content-card.tsx`
- `components/member/subscription-banner.tsx`
- `components/member/billing-portal-button.tsx`
- `components/admin/admin-sidebar.tsx`
- `components/admin/admin-topbar.tsx`
- `components/admin/content-form.tsx`
- `components/admin/metrics-card.tsx`
- `components/admin/email-log-table.tsx`
- `components/ui/toast-provider.tsx`

## Routing prompt for Cursor
Paste this after scaffolding:

```text
Implement the full Basscally route map from `09_routes_wiring_screen_map_and_components.md`. Use Next.js App Router route groups `(marketing)`, `(member)`, and `(admin)`. Do not create new routes outside the map unless required by Next.js utility files. Every route must render the matching locked screen reference from `06_locked_screen_designs_UPDATED_01_33.md`. Use server components by default. Use client components only for forms, audio playback, toast interaction, modal confirmation, portal redirect, and animation. Add loading, empty, error, unauthorized, paywall, past_due, rate-limit, and success states exactly where mapped.
```
