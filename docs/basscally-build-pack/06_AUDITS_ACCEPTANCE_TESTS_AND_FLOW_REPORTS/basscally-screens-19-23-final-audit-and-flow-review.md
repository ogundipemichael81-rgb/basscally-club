# Basscally Club — Screens 19–23 Audit + Final Flow Review

## Screens designed in this batch

| Screen | Name | Route / component target | Purpose |
|---|---|---|---|
| 19 | Admin Content Edit | `/admin/content/[id]` | Edit scheduled, draft, or published content without losing audit trail. |
| 20 | Upload Success / Publish Queued | Post-submit state from `/admin/content/new` | Confirms content publish, email queue creation, and next admin action. |
| 21 | Member Download Blocked | Download error state or `/paywall` recovery | Explains inactive access and routes user back to membership. |
| 22 | Billing Portal Transition | `/account/billing` or redirect interstitial | Builds trust before sending member to Lemon Squeezy. |
| 23 | Toast System | Shared UI component reference | Defines success, warning, info, and error feedback across member and admin flows. |

## Design audit

### Color
PASS

- 60-30-10 ratio is respected.
- Amp Orange stays on primary actions, hot highlights, and status motion.
- Semantic colors only signal state: success, warning, danger, info.

### Typography
PASS

- Display headlines use the same editorial Cabinet Grotesk treatment.
- Forms, labels, tables, and toasts use Geist / Geist Mono patterns.
- Mobile body text stays readable.

### Spacing
PASS

- Cards use 24px to 36px padding.
- Forms and tables follow the 8px rhythm.
- Mobile layout stacks cleanly.

### Components
PASS

- Buttons follow primary, secondary, and ghost variants.
- Cards, badges, forms, tables, and toast surfaces match the existing design system.
- Admin screens reuse the same admin shell pattern.

### UX
PASS

- Screen 19 protects editing without hiding status history.
- Screen 20 makes publish success clear and gives the next action.
- Screen 21 explains why download failed without sounding like a server error.
- Screen 22 prevents a confusing billing redirect.
- Screen 23 gives Cursor a reusable toast contract.

### Copy
PASS

- Copy is short and direct.
- No vague marketing language.
- Error copy is human and recoverable.

### Accessibility
PASS

- Focus styles are visible.
- Touch targets are at least 44px.
- Reduced-motion support is included.
- Inputs have visible labels.
- Tables remain horizontally scrollable on mobile.

### Motion
PASS

- Motion is obvious but controlled.
- Screen 20 uses a pulsing success orb.
- Screen 21 uses waveform motion to keep the music identity.
- Screen 22 uses rings to show secure redirect progress.
- Screen 23 uses live toast entry motion.

## MD audit findings

### 1. `06_locked_screen_designs.md` is now behind the actual design package

It still lists only Screens 1 and 2 as locked, while Screens 3–23 now exist as HTML references. This file must be updated before Cursor builds UI from it.

### 2. P0 design gap status

All previously flagged P0 design gaps now have a mockup or state reference:

- Checkout success: Screen 11
- Checkout cancelled: Screen 12
- Auth callback transition: Screen 13
- Admin content list: Screen 14
- Admin subscribers list: Screen 15
- Email delivery log: Screen 16
- Past-due member banner: Screen 17
- Cancel confirmation: Screen 18
- Admin content edit: Screen 19
- Upload success / publish queued: Screen 20
- Member download blocked: Screen 21
- Billing portal transition: Screen 22
- Toast system: Screen 23

### 3. Remaining screens to design before a polished launch

These are not P0 blockers for build, but they should be designed before public launch:

#### P1

1. Branded 404 page
   - Route: `/not-found`
   - Needed for invalid content links and broken routes.

2. Branded 500 / error page
   - Route: `global-error.tsx` or app error boundary.
   - Needed for production confidence.

3. Admin unauthorized page
   - Route/state: failed admin gate.
   - Needed when a logged-in member tries `/admin`.

4. Manual resend confirmation modal
   - Trigger: resend email from content row or email log row.
   - Needed because resend is a destructive/duplicating action.

5. Soft delete confirmation modal
   - Trigger: delete draft/content row.
   - Needed before content disappears from admin lists.

6. Empty search results state
   - Member dashboard, admin content list, admin subscribers list.
   - Needed for UX polish.

7. Rate-limit state
   - Trigger: too many download requests.
   - Needed because the build prompt requires download rate limiting.

8. Email template preview page
   - Magic link, new drop, payment failed, welcome, cancellation confirmation.
   - Useful for admin confidence before Resend automation.

#### P2

9. Mobile admin navigation drawer
   - Current admin shell stacks on mobile, but a real drawer pattern should be defined.

10. Country breakdown dashboard
   - Useful for pricing and payment-market decisions.

11. Churn / recovery dashboard
   - Useful after real cancellations start.

12. Legal utility pages
   - Terms, privacy, refund policy.

13. Onboarding first-login tour
   - Useful after MVP if new members need guidance.

## Toast system rules

### Toasts should be used for

- Save draft success
- Publish queued success
- Email resend started
- Email resend failed
- Upload failed
- Download blocked
- Payment update needed
- Card updated
- Subscription cancelled
- Billing redirect started

### Toasts should not replace

- Paywall pages
- Cancel confirmation
- Billing errors
- Failed subscription status
- Admin destructive confirmations

## Recommended next build order

1. Update `06_locked_screen_designs.md` with Screens 3–23.
2. Build Phase 1 scaffold.
3. Build Phase 2 marketing screens.
4. Build Phase 3 member/auth screens using Screens 3–7, 13, 17, 21, 22, 23.
5. Build Phase 4 checkout screens using Screens 8, 11, 12.
6. Build Phase 5 admin screens using Screens 9, 10, 14, 15, 16, 19, 20, 23.
7. Build Phase 6 email automation and logs.
8. Build Phase 7 download gate and rate-limit states.
9. Build Phase 8 polish pages: 404, 500, unauthorized, empty states, legal pages.

## Production verdict

The MVP design system now covers the core user journey, admin journey, payment transitions, content access gates, email delivery visibility, and system feedback layer.

The only serious documentation blocker is `06_locked_screen_designs.md`. It needs a full update so Cursor treats the designed screens as the source of truth.
