# Basscally Club — Screens 16–18 Audit + Remaining Flow Report

## Screens delivered

| Screen | Name | Route or placement | Status |
|---|---|---|---|
| 16 | Email Delivery Logs | `/admin/email-logs` or `/admin/content/[id]/email-logs` | Designed |
| 17 | Past-Due Member Banner | Variant inside `/dashboard` and `/account` | Designed |
| 18 | Cancel Confirmation | Modal/state inside `/account` | Designed |

## Why these three came next

The previous flow audit flagged email delivery logs, past-due member banner, and cancel confirmation as P0 missing or under-specified flows. The PRD also requires email delivery logs, payment-failed handling, and cancellation behavior where the member retains access until period end.

## Motion decisions

- Screen 16 uses a moving delivery scanline, staggered email rows, animated delivery ring, active queue pulses, and retry toast.
- Screen 17 uses an animated grace-period bar, warning pulse dot, breathing audio wave, and live payment-warning toast.
- Screen 18 uses a modal entrance, glowing continue action, cancellation timeline pulse, and cancellation-scheduled toast.

Motion is obvious but still operational. It explains status and direction, not decoration.

## UI audit

### Color
PASS

- Dark surface language remains consistent.
- Amp Orange stays mainly on CTAs, active motion, and focal system accents.
- Warning and danger colors only communicate payment risk, send failure, or cancellation.

### Typography
PASS

- Display headings stay large, editorial, and cinematic.
- Mono labels preserve the admin/control-room language.
- Mobile body text stays readable.

### Spacing
PASS

- Cards use 24px to 32px padding.
- Screens use the 8px rhythm.
- Tables and component variants breathe without drifting from the system.

### Components
PASS

- Buttons follow primary, secondary, ghost rules.
- Cards, badges, tables, banners, modals, and toasts are consistent with existing screens.
- Past-due banner is a reusable component, not an isolated one-off.

### UX
PASS

- Screen 16 lets admin retry failed sends quickly.
- Screen 17 explains the exact grace period and keeps Update card above the fold.
- Screen 18 prevents accidental cancellation and shows post-cancellation access clearly.
- Loading, empty, and error states are included where needed.

### Copy
PASS

- Copy is direct and operational.
- No marketing fluff.
- Payment and cancellation copy avoids panic and explains consequences.

### Accessibility
PASS

- Focus states exist.
- Buttons meet 44px target size.
- Tables remain horizontally scrollable on mobile.
- Modal includes dialog role and labelled heading.
- Motion respects reduced-motion settings.

### Gut check
PASS

- Screen 16 feels like a delivery control room.
- Screen 17 turns an ugly billing problem into a clear, calm product moment.
- Screen 18 makes cancellation honest without being hostile.

## Success toast system audit

Required toast variants:

| Toast | Trigger | Status |
|---|---|---|
| Magic link sent | Login form submit success | Already in Screen 3, toast variant still needed in production |
| Payment successful | Checkout success webhook confirmed | Needed |
| Card updated | Billing portal return success | Needed |
| Drop published | Admin publish action | Needed |
| Drop scheduled | Admin schedule action | Needed |
| Email retry queued | Admin resend failed emails | Designed in Screen 16 |
| Download ready | Signed URL generated | Needed |
| Cancellation scheduled | Cancel webhook processed | Designed in Screen 18 |
| Membership resumed | Resume action success | Needed |
| Something broke | API/server action failure | Needed |

Recommendation: build one reusable `ToastProvider`/`ToastViewport` with success, warning, danger, and info variants. Use it across member and admin surfaces.

## Remaining missing pages and states after Screens 16–18

### P0, still needed before build lock

1. Admin content edit page
   - Route: `/admin/content/[id]`
   - Needed to edit drafts, scheduled drops, email subject/body, release date, difficulty, and cover art.

2. Upload success state
   - Placement: after Screen 9 publish or schedule action.
   - Should show: status, email queue count, publish time, next action.

3. Member download blocked state
   - Placement: content detail page or API error surface.
   - Needed when signed URL endpoint returns 403, expired, or rate-limited.

4. Billing portal transition
   - Placement: small interstitial before Lemon Squeezy portal redirect.
   - Needed for Update card and Manage membership actions.

### P1, useful before soft launch

5. Branded 404 page
   - Needed for invalid drop links.

6. Branded 500/error page
   - Needed for production confidence.

7. Admin unauthorized page
   - Needed when a logged-in member tries `/admin`.

8. Manual resend confirmation modal
   - Needed when admin clicks Resend from a content row.

9. Soft delete confirmation modal
   - Needed for deleting draft content without accidental data loss.

10. Empty search results state
   - Needed for member library, admin content list, subscribers, and email logs.

11. Email template preview pages
   - Magic link
   - New drop
   - Payment failed
   - Welcome
   - Cancellation confirmation

12. Rate-limit state
   - Needed for too many download attempts or magic-link requests.

### P2, post-MVP polish

13. Mobile admin navigation drawer
14. Country breakdown page
15. Churn and recovery page
16. First-login orientation strip
17. Legal pages: Terms, Privacy, Refund Policy
18. Maintenance/offline page

## Recommended next three screens

1. Screen 19 — Admin Content Edit Page
2. Screen 20 — Upload Success / Publish Queued State
3. Screen 21 — Member Download Blocked State

These close the remaining P0 product holes before moving into error pages and polish.

## Cursor handoff prompt, Screen 16

Build Screen 16, Email Delivery Logs, at `app/(admin)/admin/email-logs/page.tsx` or as a tab inside `app/(admin)/admin/content/[id]/page.tsx`. Use `04_basscally_design_system.md` and match the existing admin shell from Screens 9, 10, 14, and 15. Show metrics for sent, queued, failed, and open signal. Include filters for All, New drop, Magic link, Payment failed, and Failed only. Render a table with email, type, content, status, attempts, sent time, and action. Include loading, empty, and error states. Include a retry failed action with success toast. Use shadcn Card, Button, Badge, Input, Table, and Toast primitives. Keep the table horizontally scrollable on mobile.

## Cursor handoff prompt, Screen 17

Build the past-due member banner as `components/member/past-due-banner.tsx`. Use it at the top of `/dashboard` and `/account` when subscription status is `past_due`. The banner must tell the member they keep play and download access until `current_period_end`, and the primary action must be `Update card`. Include a compact variant for dashboard and a larger membership variant for account. Use warning semantic color only for status meaning. Add a toast variant for payment still pending or card update success. Do not block access until the period end passes.

## Cursor handoff prompt, Screen 18

Build cancel confirmation as `components/member/cancel-membership-dialog.tsx` and use it inside `/account`. The dialog must explain that access continues until the end of the paid period. Include primary action `Continue to cancel`, secondary action `Keep membership`, and a confirmation checkbox. After `subscription_cancelled` webhook or portal return, show an account state with badge `Cancels at period end`, period end date, and `Resume membership` CTA. Use shadcn Dialog, Button, Card, Badge, and Toast primitives. Keep copy calm and clear. Do not immediately revoke access.
