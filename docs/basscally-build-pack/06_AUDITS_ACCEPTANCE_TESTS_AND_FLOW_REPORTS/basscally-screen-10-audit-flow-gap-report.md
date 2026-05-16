# Basscally Club — Screen 10 Audit + Flow Gap Report

## Screen 10: Admin Metrics Dashboard

### Status
Locked for review.

### What this screen does
Screen 10 gives the admin a single operating view for:

- Active subscribers
- MRR
- New members this month
- Failed payments
- Next scheduled drop
- Recent content delivery
- Email send health
- Content mix
- Loading, empty, and error states

The screen completes the visible MVP sequence from Screen 1 to Screen 10.

---

## Design decisions made

- Kept the same admin shell pattern from Screen 9.
- Made Metrics the active admin sidebar item.
- Used a cinematic “Club metrics, without the noise” headline.
- Used four metric cards, each with compact spark bars.
- Added a launch health card as the artistic focal point.
- Kept orange limited to CTA, hot metric bars, and small system accents.
- Added a “Needs attention” rail for failed payments and email retries.
- Added visible loading, empty, and error state samples at the bottom.
- Kept the table compact but horizontally scrollable on mobile.

---

## UI audit

### 1. Color
PASS

- 60-30-10 ratio is respected.
- Background and surfaces dominate the screen.
- Amp Orange appears on the primary CTA, heat bars, tiny status accents, and brand mark.
- Semantic colors are only used for status meaning.

### 2. Typography
PASS

- Main headline uses the display font.
- Metrics use large display type for fast scanning.
- Labels use mono text for the editorial system language.
- Body text remains readable at mobile sizes.

### 3. Spacing
PASS

- Layout uses the 8px spacing rhythm.
- Cards use 24px to 32px padding.
- Sections breathe without becoming vague.
- Mobile stacks cleanly.

### 4. Components
PASS

- Buttons match primary, secondary, and ghost rules.
- Cards use the dark surface, border, and radius system.
- Badges follow the existing status treatment.
- Tables, side rails, search field, and metric cards stay within the same admin design pattern.

### 5. UX
PASS

- The most important information is above the fold.
- Admins can move from metrics to New drop in one click.
- Failed payments and email retries are visible without digging.
- Search and recent content support quick action.
- Loading, empty, and error states are represented.

### 6. Copy
PASS

- Copy is short and operational.
- No marketing fluff.
- Labels are clear.
- Error copy follows the design system tone: “Something broke. Try again?”

### 7. Accessibility
PASS

- Interactive controls have visible focus states.
- Touch targets meet 44px minimum.
- Table is keyboard-scrollable through the wrapper.
- Reduced motion support is included.
- Search input has an accessible label.

### 8. Gut check
PASS

- The screen feels closer to a music product control room than a generic SaaS dashboard.
- The launch health card creates a clear visual anchor.
- The admin view remains simple enough for daily use.

---

## Top 3 fixes before production

1. Replace mock numbers with live database queries.
2. Decide whether the metrics page should include the content table, or only a small recent-content preview linking to `/admin/content`.
3. Add a real failed-payments drilldown route or modal before launch.

---

## Cursor handoff prompt

Build Screen 10, the admin metrics dashboard, at `app/(admin)/admin/page.tsx`. Use `04_basscally_design_system.md` as the design contract and match the admin shell pattern from Screen 9. Create a server component for the page and split reusable UI into `components/admin/metrics-card.tsx`, `components/admin/recent-content-table.tsx`, `components/admin/admin-sidebar.tsx`, and `components/admin/admin-topbar.tsx` if those do not exist yet. Use shadcn/ui Card, Button, Badge, Input, and Table primitives, styled with the Basscally tokens. Props should include `activeSubscribers`, `mrr`, `newThisMonth`, `failedPayments`, `nextScheduledDrop`, `recentContent`, `contentMix`, `emailRetries`, and `contentBufferDays`. Include loading skeleton, empty state, and error state components. Keep the primary action visible: `New drop` linking to `/admin/content/new`. Keep `Export CSV` as a secondary action. The page must be mobile-first, with the table inside a horizontal scroll region and all touch targets at least 44px. Do not introduce new libraries. Use Lucide icons only.

---

# Flow gap audit

## Current screen map

| Screen | Name | Status | Notes |
|---|---|---|---|
| 1 | Landing Hero | Designed | Locked direction exists. |
| 2 | Full Landing Page | Designed | Marketing flow complete. |
| 3 | Auth Login | Designed | Includes magic-link success state. |
| 4 | Dashboard Empty | Designed | New-member state covered. |
| 5 | Dashboard Populated | Designed | Normal member state covered. |
| 6 | Content Detail | Designed | Audio player and download flow covered. |
| 7 | Account / Membership | Designed | Membership management covered. |
| 8 | Paywall / Re-subscribe | Designed | Expired and non-member recovery covered. |
| 9 | Admin Upload Form | Designed | Publishing surface covered. |
| 10 | Admin Metrics Dashboard | Designed | Admin monitoring surface covered. |

## Main issue

`06_locked_screen_designs.md` needs to be updated. It still marks Screens 3 to 10 as not started. Cursor should not build Phase 3 to Phase 5 screens until this bridge document reflects the locked HTML files.

---

## Missing or under-specified flows before production

### P0, must design or specify before build

1. Checkout success page
   - Route: `/checkout/success`
   - Purpose: confirm payment, explain magic link, guide user to dashboard.
   - Why it matters: it is part of the 3-click paid onboarding flow.

2. Checkout cancelled page
   - Route: `/checkout/cancelled`
   - Purpose: recover users who backed out of Lemon Squeezy.
   - Use Screen 8 paywall/recovery language as the base.

3. Auth callback transition
   - Route: `/auth/callback`
   - Purpose: show a clean “Signing you in” state while Supabase processes the magic link.
   - Can be a tiny page, not a full new screen.

4. Admin content list
   - Route: `/admin/content`
   - Screen 10 has recent content, but PRD still needs a full content-management page with filters and actions.

5. Admin subscribers list
   - Route: `/admin/subscribers`
   - Needed because the PRD requires search, filter, paginate, country, status, founding member, signup month, and export.

6. Email delivery log
   - Could be part of `/admin/content/[id]` or `/admin/email-logs`.
   - Needed to debug whether notification emails were sent.

7. Past-due member banner
   - This should be a state variant of Screen 5 and Screen 7.
   - It must say the member keeps access until period end, but should update card.

8. Cancel confirmation state
   - Should live inside Screen 7.
   - Needed before redirecting to Lemon Squeezy portal or after cancellation webhook.

### P1, useful before soft launch

9. Branded 404 page
   - Needed for broken content links and invalid routes.

10. Branded 500/error page
   - Needed for production confidence.

11. Member email templates visual preview
   - Magic link
   - New drop
   - Payment failed
   - Welcome
   - Cancellation confirmation

12. Admin content edit page
   - Route: `/admin/content/[id]`
   - Needed for updating a scheduled or draft drop.

13. Manual resend confirmation
   - Needed because admin has a Resend action in content tables.

14. Upload success state
   - Screen 9 shows the form, but should also have a clear “drop published / queued” state.

15. Member download blocked state
   - API will return 403, but UI should show a human recovery message.

### P2, polish after MVP build

16. Onboarding first-login tour
   - Small “where to start” surface on dashboard.

17. Empty search results state
   - For member dashboard and admin content list.

18. Mobile admin navigation drawer
   - Current mockups show mobile top bar, but the drawer behavior needs implementation.

19. Country breakdown view
   - Useful for pricing, Africa payment checks, and localization.

20. Churn/recovery view
   - Needed once real cancellations begin.

---

## Recommended final design package order for Cursor

1. `04_basscally_design_system.md`
2. Updated `06_locked_screen_designs.md`
3. Screen HTML references 1 to 10
4. `03_cursor_codex_build_prompt.md`
5. `01_PRD_basscally_club_mvp.md`

---

## Final build readiness verdict

Screen design sequence is now complete from 1 to 10.

MVP build can start after updating `06_locked_screen_designs.md` with Screens 3 to 10 and deciding whether checkout success/cancelled pages get full screen designs or simple branded utility pages.
