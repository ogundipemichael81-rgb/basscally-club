# Basscally Club Screens 7, 8, and 9 — Audit + Cursor Handoff

## Screen 7: Account / Membership

### Decisions made
- The page uses an active founding-member state as the default.
- Billing actions sit in one right-hand panel: manage billing, update card, cancel at period end.
- Past due and cancelled states are represented as production-state chips, not separate noisy screens.

### States included
- Default: active membership with founding member badge.
- Loading: skeleton line inside billing area.
- Empty: not applicable. Membership always has a user context.
- Error: handled through production status banner pattern, not shown as a full failure page.

### Audit results
- Color: PASS. Dark canvas dominates, surfaces carry hierarchy, orange stays restricted to primary CTA and status accent.
- Typography: PASS. Display headline uses Cabinet Grotesk, body uses Geist, mobile body stays readable.
- Spacing: PASS. Uses 8px scale, 24px to 32px card padding, 48px plus section rhythm.
- Components: PASS. Buttons, cards, badges, and sidebar remain consistent with Screens 4 to 6.
- UX: PASS. Billing actions are visible immediately, cancellation path is present but not louder than manage billing.
- Copy: PASS. Short, direct, bassist-aware, no SaaS filler.
- Accessibility: PASS. Touch targets, labels, focus rings, and reduced-motion handling are present.
- Gut check: PASS. The price/status hero creates the memorable focal point.

### Cursor handoff prompt
Create `app/(member)/account/page.tsx` for Basscally Club using `04_basscally_design_system.md` and the locked screen reference `basscally-screen-7-account-membership.html`. Build a server component by default, with client components only for interactive billing state toggles if needed. Use shadcn/ui `Card`, `Button`, `Badge`, and `Separator`. Props/data shape: `userEmail`, `planName`, `price`, `status`, `isFoundingMember`, `memberNumber`, `currentPeriodEnd`, `paymentMethodLabel`, `downloadCount`, `dropsThisMonth`, `nextDropLabel`, `billingPortalUrl`. Preserve the dark cinematic layout, sidebar pattern, large membership price hero, founding-member badge, billing card, access timeline, and membership-state chips. Primary action: `Manage billing`. Secondary actions: `Update card`, `Cancel at period end`. Do not add a new color palette, illustrations, or stock imagery. Keep orange only for CTA and active accents.

## Screen 8: Paywall / Re-subscribe

### Decisions made
- The screen uses one clear recovery CTA: join for $1.50/month.
- A locked content-preview card creates context without showing playable content.
- “I already paid. Sign in” remains visible for paid users who hit the page logged out.

### States included
- Default: anonymous or expired user.
- Loading: inherited checkout button loading state for production.
- Empty: not applicable.
- Error: expired and no-access states are represented by the red access badge and recovery copy.

### Audit results
- Color: PASS. Cinematic depth without extra brand colors.
- Typography: PASS. Oversized editorial title creates clarity at first glance.
- Spacing: PASS. Strong two-column desktop layout and single-column mobile layout.
- Components: PASS. Buttons and badges match system rules.
- UX: PASS. Recovery path is one click from the primary action.
- Copy: PASS. Uses the approved “This drop is for Club members” language.
- Accessibility: PASS. Locked preview has role image and aria label, controls meet target size.
- Gut check: PASS. Locked audio-card preview is the memorable moment.

### Cursor handoff prompt
Create `app/(member)/paywall/page.tsx` or a reusable `components/member/paywall-recovery.tsx` using `04_basscally_design_system.md` and the locked screen reference `basscally-screen-8-paywall-resubscribe.html`. Use shadcn/ui `Button`, `Badge`, `Card`, and `Separator`. Props: `contentTitle`, `contentType`, `difficulty`, `checkoutUrl`, `loginUrl`, `accessReason` (`anonymous | no_subscription | expired`). Preserve the cinematic full-page layout, locked drop preview, single primary CTA, and secondary sign-in action. The primary copy is: “This drop is for Club members.” The primary button label is: “Join Basscally Club — $1.50/month.” Avoid extra friction, pricing tables, or unnecessary FAQs. Use this component when `/api/content/[id]/download` returns 403 or when an expired member reaches protected content.

## Screen 9: Admin — Upload Form

### Decisions made
- The admin upload flow stays on one screen, as required.
- The right-side preview shows how the drop and email will feel before publish.
- Publish status uses three cards: Draft, Scheduled, Publish now.

### States included
- Default: publish-now-ready state.
- Loading: upload progress skeleton and production-ready button loading state.
- Empty: blank form state is supported by field placeholders.
- Error: visible validation example for missing email subject.

### Audit results
- Color: PASS. Admin page remains calm and dark, not dashboard-noisy.
- Typography: PASS. Clear hierarchy for admin scanning.
- Spacing: PASS. Form groups use consistent spacing and dividers.
- Components: PASS. Dropzone, form fields, cards, buttons, and badges match the existing system.
- UX: PASS. Required MVP upload fields are all visible on one surface.
- Copy: PASS. Labels are plain and operational.
- Accessibility: PASS. Labels, keyboard-focusable dropzone, touch targets, and focus rings are present.
- Gut check: PASS. Preview panel keeps the admin form artistic without making publishing ambiguous.

### Cursor handoff prompt
Create `app/(admin)/admin/content/new/page.tsx` using `04_basscally_design_system.md`, `01_PRD_basscally_club_mvp.md`, and the locked screen reference `basscally-screen-9-admin-upload-form.html`. Use shadcn/ui `Card`, `Button`, `Input`, `Textarea`, `Select`, `Badge`, `Separator`, and `RadioGroup`. Build a server-action-backed form with Zod validation. Fields: audio file, title, content type, difficulty, description, cover image, release date, status, email subject, email body. Actions: `Save draft`, `Preview email`, `Publish now`. Show a right-side preview card with generated cover treatment, metadata badges, email subject, and publish checklist. Keep the admin experience simple, one-screen, and low-noise. Use orange only for publish and active status.
