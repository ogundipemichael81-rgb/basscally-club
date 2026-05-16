# Basscally Club - Missing Flows Build Plan

## Context

Screens 1 to 10 now cover the primary marketing, member, paywall, admin upload, and admin metrics surfaces.

This report turns the remaining production gaps into a build queue.

Reference docs used:

- `01_PRD_basscally_club_mvp.md`
- `03_cursor_codex_build_prompt.md`
- `04_basscally_design_system.md`
- `06_locked_screen_designs.md`
- `basscally-screen-10-audit-flow-gap-report.md`

---

## Missing flows list

| Build order | Priority | Flow | Route or location | Why it matters | Design status |
|---|---:|---|---|---|---|
| 11 | P0 | Checkout success | `/checkout/success` | Confirms payment, explains magic link, guides user into dashboard | Designed now |
| 12 | P0 | Checkout cancelled | `/checkout/cancelled` | Recovers users who leave Lemon Squeezy before payment | Designed now |
| 13 | P0 | Auth callback transition | `/auth/callback` | Gives a clean signing-in state while Supabase processes magic link | Not designed |
| 14 | P0 | Admin content list | `/admin/content` | Full content management beyond Screen 10 recent-content preview | Not designed |
| 15 | P0 | Admin content edit | `/admin/content/[id]` | Edit drafts, scheduled drops, published metadata, resend email | Not designed |
| 16 | P0 | Admin subscribers list | `/admin/subscribers` | Search, filter, export, and inspect paying members | Not designed |
| 17 | P0 | Email delivery log | `/admin/email-logs` or `/admin/content/[id]` | Debug new-drop emails, retries, failures, bounces | Not designed |
| 18 | P0 | Past-due member banner | Dashboard and account state | Failed payment users keep access until period end but need card update | State variant needed |
| 19 | P0 | Cancel confirmation | Account modal or state | Prevents accidental cancel and explains access until period end | State variant needed |
| 20 | P0 | Upload success state | Screen 9 state | Confirms drop saved, published, scheduled, or queued for email | State variant needed |
| 21 | P0 | Download blocked state | Content detail modal or paywall redirect | Human recovery message when API returns 403 | State variant needed |
| 22 | P1 | 404 page | `/not-found` | Handles bad content links and broken routes | Not designed |
| 23 | P1 | 500 error page | `/error` | Production confidence when something breaks | Not designed |
| 24 | P1 | Admin unauthorized page | `/admin` guard result | Non-admin users need a clear denial screen | Not designed |
| 25 | P1 | Empty search results | Member dashboard, admin tables | Prevents dead UI when filters return no rows | State variant needed |
| 26 | P1 | Manual resend confirmation | Admin content or email logs | Confirms resend action before sending another email | State variant needed |
| 27 | P1 | Email template previews | Admin utility route | Preview magic link, new drop, payment failed, welcome, cancellation | Not designed |
| 28 | P1 | Billing portal redirect/loading | Account flow | Clean transition before opening Lemon Squeezy billing portal | Not designed |
| 29 | P1 | Soft delete confirmation | Admin content modal | Prevents accidental content deletion | State variant needed |
| 30 | P1 | Rate-limit state | Download API UI | Explains temporary block after too many download requests | State variant needed |
| 31 | P2 | Mobile admin drawer | Admin layout | Screen 9 and 10 imply mobile nav, but drawer behavior needs design | Not designed |
| 32 | P2 | Country breakdown | Admin analytics | Helps pricing, localization, and Africa payment checks | Not designed |
| 33 | P2 | Churn and recovery view | Admin analytics | Useful after cancellations begin | Not designed |
| 34 | P2 | Terms, privacy, refund pages | Footer routes | Needed before public launch and payment provider review | Content-first pages |

---

## Build plan, one after the other

### Phase A - Paid onboarding utilities

1. Build `/checkout/success`.
2. Build `/checkout/cancelled`.
3. Build `/auth/callback`.

Purpose: close the payment-to-login loop.

### Phase B - Member account edge states

4. Add past-due banner to Dashboard and Account.
5. Add cancel confirmation modal to Account.
6. Add download blocked modal to Content Detail.
7. Add empty search result states to Dashboard.

Purpose: make every subscription status clear.

### Phase C - Admin operating surfaces

8. Build `/admin/content`.
9. Build `/admin/content/[id]`.
10. Build `/admin/subscribers`.
11. Build email delivery logs.
12. Add upload success and publish queued states.
13. Add manual resend confirmation.

Purpose: make the product operable without developer help.

### Phase D - Production confidence

14. Build branded 404.
15. Build branded 500.
16. Build admin unauthorized page.
17. Build billing portal transition page.
18. Build terms, privacy, and refund pages.

Purpose: close trust and support gaps.

### Phase E - Post-launch analytics

19. Build country breakdown.
20. Build churn and recovery view.
21. Add email template preview utility.
22. Add mobile admin drawer if real admin use on phones becomes frequent.

Purpose: support scale after launch.

---

## Screen 11 - Checkout success

### Route

`/checkout/success`

### Purpose

Confirm payment, show membership status, explain magic link, and move the user to dashboard.

### States included

- Default success
- Webhook processing
- Magic-link delay
- Access sync error

### UI audit

| Check | Status |
|---|---|
| Color | PASS |
| Typography | PASS |
| Spacing | PASS |
| Components | PASS |
| UX | PASS |
| Copy | PASS |
| Accessibility | PASS |
| Gut check | PASS |

### Cursor handoff prompt

Build Screen 11 at `app/checkout/success/page.tsx`. Use `04_basscally_design_system.md` as the design contract and match the cinematic member utility style from Screens 7 and 8. The page should confirm payment, show a membership pass card, show three next-step cards, and include states for webhook processing, magic-link delay, and access sync error. Primary CTA: `Go to dashboard`. Secondary CTA: `Resend magic link`. Use shadcn/ui Card, Button, Badge, and Alert where useful. This should be a server component unless a polling status client component is needed. Props should include `email`, `planName`, `price`, `renewalDate`, `status`, and `dashboardHref`. Keep mobile-first layout, visible focus states, and 44px touch targets.

---

## Screen 12 - Checkout cancelled

### Route

`/checkout/cancelled`

### Purpose

Recover users who left checkout before payment finished.

### States included

- Default cancelled
- Payment failed variant
- Expired checkout link variant

### UI audit

| Check | Status |
|---|---|
| Color | PASS |
| Typography | PASS |
| Spacing | PASS |
| Components | PASS |
| UX | PASS |
| Copy | PASS |
| Accessibility | PASS |
| Gut check | PASS |

### Cursor handoff prompt

Build Screen 12 at `app/checkout/cancelled/page.tsx`. Use `04_basscally_design_system.md` and match the visual language of Screen 8 paywall recovery. The page should reassure the user, show the founding member price, explain no access is active yet, and offer a primary CTA back to Lemon Squeezy checkout. Secondary CTA: `See what you get`. Include variants for normal cancellation, failed payment, and expired checkout link. Use shadcn/ui Card, Button, Badge, and Alert. Props should include `checkoutHref`, `reason`, `price`, and `supportEmail`. Keep copy short, active, and free of marketing fluff.

---

## Files created

- `basscally-screen-11-checkout-success.html`
- `basscally-screen-12-checkout-cancelled.html`
- `basscally-missing-flows-build-plan.md`
