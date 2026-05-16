# Basscally Club — Locked Screen Designs 01 to 33

Status: Complete locked bridge for Cursor/Codex build handoff.

## Override rules
- `04_basscally_design_system.md` is the design contract.
- The HTML files in this package are the visual truth for each screen.
- The PRD defines product behavior and backend logic.
- Cursor should not invent new layouts when a screen has a locked HTML reference.
- Production React can split components, but visual output must match the HTML references.

## Build phase mapping

| Build Phase | What gets built | Required screens |
|---|---|---|
| Phase 0 | Repo setup, env, schema, no UI | None |
| Phase 1 | Design tokens, shell, layout primitives | 1 to 3 for style alignment |
| Phase 2 | Marketing and pricing | 1, 2, 32 |
| Phase 3 | Auth and checkout bridge | 3, 11, 12, 13 |
| Phase 4 | Member product | 4, 5, 6, 7, 8, 17, 18, 21, 22, 30, 33 |
| Phase 5 | Payments and subscriptions | 8, 11, 12, 17, 18, 22, 32, 33 |
| Phase 6 | Admin core | 9, 10, 14, 15, 16, 19, 20, 26, 27, 28, 31 |
| Phase 7 | Email automation | 16, 20, 23, 27, 31 |
| Phase 8 | Utility and polish | 23, 24, 25, 29, 30 |

## Screen map

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


## Production component notes
- Use shared `MarketingNav`, `MemberShell`, `AdminShell`, `AudioPlayer`, `ContentCard`, `MetricCard`, `ToastProvider`, `PlanCard`, and `BillingPortalButton` components.
- Use Framer Motion only where the HTML uses obvious motion. Keep reduced-motion support.
- Use server components by default. Use client components for forms, audio player, portal redirects, toast interactions, and animation-heavy transitions.
