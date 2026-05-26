# Basscally Hub MVP End-to-End Build Plan

Version: 1.0  
Date: 2026-05-25  
Owner: Michael Ogundipe  
Use with: Cursor, Codex, Claude, GPT, Gemini, and the Basscally Autopilot tools

## 1. Current state

This plan starts from the current repo state described by Michael:

- Phase A visual route work is done.
- Legal pages are implemented.
- Visual depth, responsive, motion, and scroll-performance gates are documented.
- Landing scroll performance is now a P0 gate.
- Phase B has not started.
- Branch: `visual-depth-responsive-fixes`
- Commit: `f1e9c26`, `fix: optimize landing motion scroll performance`
- Working tree is clean.
- Branch is 4 commits ahead of `origin/visual-depth-responsive-fixes`.

## 2. Uploaded tool pack alignment

The uploaded tool pack gives the project a repo-based autopilot workflow.

### Required uploaded tools

Copy these into the repo:

```text
scripts/basscally-autopilot-controller.py
scripts/basscally-ui-simulator.py
scripts/basscally-responsive-audit.py
docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md
docs/BASSCALLY-AUTOPILOT-SETUP-README.md
docs/BASSCALLY-COMPLETE-SETUP-GUIDE.md
docs/GPT-PROJECT-MEMORY-HANDOVER.md
docs/basscally-full-button-function-audit.md
```

### Main commands

```powershell
npm run bh:status
npm run bh:next
npm run bh:complete
npm run bh:check
```

### Daily loop

```powershell
npm run bh:next
```

Tell Cursor:

```text
Read docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md and execute it fully. Do not ask for clarification. Do not ask for permission. Do not summarise what you are about to do. Execute the step, create the artifact, include all required markers. When done, stop.
```

Then run:

```powershell
npm run bh:complete
```

## 3. Important reconciliation before continuing

The uploaded documents are strong, but they were prepared after several planning changes. The repo already has work that must not be overwritten.

Before running build steps, Cursor must create a current-state reconciliation.

### Reconciliation rules

1. Do not restart the project from a fresh repo assumption.
2. Do not remove existing Phase A pages.
3. Do not regress legal routes.
4. Do not treat legal pages as missing if the repo already has:
   - `/terms`
   - `/privacy`
   - `/refund-policy`
5. The uploaded button audit mentions `/legal/terms`, `/legal/privacy`, and `/legal/refund`. Treat those as audit input, not final route truth.
6. Canonical public legal routes for the current build:
   - `/terms`
   - `/privacy`
   - `/refund-policy`
7. Optional future aliases can be added:
   - `/legal/terms` redirects to `/terms`
   - `/legal/privacy` redirects to `/privacy`
   - `/legal/refund` redirects to `/refund-policy`
8. Basscally Hub naming is final.
9. Resource Centre replaces Walkthrough.
10. Weekly release replaces every 3 days.
11. Drops come from Chris and world-class bassists.
12. Downloads remain, with streaming primary and download secondary.
13. No bulk download.
14. Every download must pass server-side subscription verification.
15. No fake countdown timer.
16. Founding count must come from DB when wired.
17. No fake WhatsApp link.
18. If WhatsApp group link is not available, show: “Community invite will be sent in your welcome email.”

## 4. Product direction

### Public product name

Basscally Hub

### Domain

basscally.club

### Company

Basscally Ltd, Company No. 16656420, registered England and Wales

### Support

basscally.enquiry@gmail.com

### Core promise

Basscally Hub helps bassists practice with focused weekly drops: grooves, fills, bass-less covers, and challenges from Chris and world-class bassists.

## 5. Final funnel logic

### Cold traffic from TikTok or IG

```text
TikTok or IG hook
→ /style/[slug] or /
→ Artist or Style page
→ checkout
→ checkout success
→ magic link
→ dashboard
→ content detail
→ play, stream, download released drop
```

### General traffic

```text
/
→ /style/[slug]
→ /pricing
→ checkout
→ success
```

### Prelaunch or waitlist traffic

```text
/waitlist
→ email capture
→ launch notification
→ first style page
```

### Trust traffic

```text
/resources
→ FAQ
→ Terms
→ Privacy
→ Refund Policy
→ support
```

## 6. Three-click rule

The new three-click rule:

```text
Click 1: TikTok or IG bio link
Click 2: Artist or Style page value selection
Click 3: Checkout unlock
```

The user should see what they want before being asked to read long value sections.

Good example:

```text
Ad hook: “Can you play Makossa like this?”
Click 1: Open /style/makossa-tribe-fuego
Click 2: Tap a track preview or unlock CTA
Click 3: Checkout
```

## 7. MVP screen inventory

### Existing Phase A routes to preserve

```text
/
 /pricing
 /auth/login
 /auth/callback
 /checkout/success
 /checkout/cancelled
 /terms
 /privacy
 /refund-policy
 /account/cancel
```

### New routes now required

```text
/style/[slug]
/style/makossa-tribe-fuego
/waitlist
/resources
/paywall
/dashboard
/c/[id]
/account
/account/billing
/admin
/admin/content
/admin/content/new
/admin/content/[id]
/admin/subscribers
/admin/email-logs
/admin/email-templates
```

### Utility routes or states

```text
404
500
admin unauthorized
download blocked
rate limit
billing portal transition
cancel confirmation
soft delete confirmation
manual resend confirmation
empty search result
```

## 8. New screens from Chris and Michael feedback

### Screen 34: Artist or Style page

Route:

```text
/style/[slug]
```

Initial demo:

```text
/style/makossa-tribe-fuego
```

Purpose:

Make the user feel: “This is exactly what I came for.”

Must include:

- Visual hero
- “Play Makossa like Tribe Fuego”
- 3 to 5 preview tracks
- 20 to 30 second preview UI
- Locked full access indicator
- What you will learn
- Who it is for
- Pricing unlock panel
- Trust strip
- Sticky mobile CTA

### Screen 35: Waitlist page

Route:

```text
/waitlist
```

Fields:

- Email
- Experience level
- Style interest
- Optional note

### Screen 36: Resource Centre

Route:

```text
/resources
```

Must include:

- Start here
- FAQ
- Legal links
- Practice guide
- How Basscally Hub works
- Weekly drops
- Streaming and downloads
- Contact support

## 9. Pricing structure

### Desktop order

```text
Monthly
Founding Member
Annual
```

### Main launch highlight

Founding Member

### Prices

```text
Monthly: $2.99 per month
Founding Member: $1.50 per month
Annual: $18 per year
```

### Rules

- Founding Member is the centre card and the no-brainer option.
- No fake countdown.
- Use “Limited founding member window” until the DB counter is wired.
- When wired, counter must come from DB.
- Founding cap is 500.

## 10. Downloads policy

Downloads stay, but the funnel should be streaming-first.

### UI order

```text
Primary: Play or Stream
Secondary: Download released drop
```

### Backend rule

Every download request must check subscription server-side before returning a signed Supabase Storage URL.

### Launch limits

- No bulk download
- Only released drops
- Signed URL expires
- One file at a time
- Download history stored
- Daily limit can be added later

## 11. Database plan

Use Supabase Postgres, EU region.

### Tables

```text
users
subscriptions
content
waitlist
artists
styles
content_style_tags
downloads
email_events
email_unsubscribes
admin_audit_log
```

### Storage buckets

```text
audio: private
covers: public or controlled public
```

### Required seed users

```text
mock-member-active
mock-member-lapsed
mock-admin-michael
```

## 12. Lemon Squeezy setup plan

### Products and variants

Create one product: Basscally Hub Membership

Variants:

```text
Founding Member: $1.50/month
Monthly: $2.99/month
Annual: $18/year
```

### Required env variables

```text
LEMONSQUEEZY_API_KEY
LEMONSQUEEZY_WEBHOOK_SECRET
LEMONSQUEEZY_STORE_ID
LEMONSQUEEZY_VARIANT_FOUNDING
LEMONSQUEEZY_VARIANT_MONTHLY
LEMONSQUEEZY_VARIANT_ANNUAL
LEMONSQUEEZY_PRODUCT_ID
LEMONSQUEEZY_CUSTOMER_PORTAL_URL or portal API handling
```

### Required webhook events

```text
subscription_created
subscription_updated
subscription_cancelled
subscription_expired
subscription_payment_failed
subscription_payment_success
```

### Webhook requirements

- Verify signature with HMAC SHA256.
- Idempotent writes.
- Store event ID.
- Update subscriptions table.
- Set `is_founding_member` only if current founding count is below 500.
- Trigger welcome email and magic link after subscription_created.
- Never trust client-only payment state.

## 13. Supabase auth plan

### Auth mode

Magic link only.

### Routes

```text
/auth/login
/auth/callback
```

### Behaviors

- Login accepts email.
- Send magic link with Supabase.
- Success state tells user to check email.
- Callback confirms session.
- Redirect active users to `/dashboard`.
- Anonymous users cannot access member routes.
- Admin routes require admin email allowlist.

### Mock auth

Staging only:

```text
/api/mock-auth/session
```

Never enabled in production.

## 14. API inventory

Required before MVP:

```text
POST /api/webhooks/lemonsqueezy
GET  /api/content/[id]/download
POST /api/admin/content
GET  /api/admin/content/[id]
PATCH /api/admin/content/[id]
DELETE /api/admin/content/[id]
GET /api/admin/subscribers
GET /api/admin/metrics
POST /api/admin/email/resend/[id]
GET /api/admin/export/subscribers
POST /api/waitlist
POST /api/mock-auth/session
GET /auth/callback
```

## 15. Action cycle audit

Every action must have:

```text
Owner route
Visible button or link
Permission rule
Target route or API
Success state
Error state
Loading state
Empty state
Mobile state
Keyboard focus state
Audit/report hook
```

### Action categories

- Public conversion actions
- Auth actions
- Checkout actions
- Member content actions
- Download actions
- Account and billing actions
- Paywall actions
- Admin content actions
- Admin metrics actions
- Email automation actions
- Utility states
- Legal and support actions

## 16. Testing strategy

### Local checks

```powershell
npm run typecheck
npm run lint
npm run build
npm run bh:check
```

### UI simulator

```powershell
python scripts/basscally-ui-simulator.py --suite all
```

Suites:

```text
auth
conversion
member
paywall
admin
responsive
```

### Responsive audit

```powershell
python scripts/basscally-responsive-audit.py
```

Required widths:

```text
320
375
390
768
1024
1280
```

### Motion and scroll gates

Landing scroll performance is P0.

Must pass:

```text
375px smooth scroll
390px smooth scroll
no full-page continuous background animation
no fixed SVG noise on mobile
continuous motion only on small contained transform/opacity elements
no animated filter, blur, backdrop-filter, or box-shadow loops
```

## 17. Build sequence

Use the autopilot order:

```text
BH-00 Repo Scan and Docs Truth
BH-01 Global Naming Pass
BH-02 Supabase Schema and Storage
BH-03 Lemon Squeezy Webhook and Subscription Access
BH-04 Magic Link Auth
BH-05 Landing Page and Waitlist
BH-06 Artist and Style Page
BH-07 Pricing Page
BH-08 Checkout Success and Cancelled
BH-09 Member Dashboard
BH-10 Content Detail and Download API
BH-11 Account and Billing Management
BH-12 Paywall and Re-subscribe
BH-13 Admin Upload Form and Content Management
BH-14 Admin Metrics Dashboard
BH-15 Email Automation
BH-16 Legal Pages
BH-17 Utility States
BH-18 UI Simulator Full Click Test
BH-19 Mobile Responsive Audit
BH-20 Motion and Depth Fix
BH-21 Performance
BH-22 Production Readiness
```

## 18. Current next step

Do not jump straight to Supabase yet.

First task in Cursor:

```text
Create current-state reconciliation docs and patch the autopilot plan so it respects existing Phase A work, legal routes, scroll P0 gates, Basscally Hub naming, Resource Centre, weekly releases, and the new /style/[slug], /waitlist, /resources flow.
```

Then run:

```powershell
npm run bh:status
```

If the controller is installed:

```powershell
npm run bh:next
```

If it is not installed, use the Cursor resume prompt from `BASSCALLY-CURSOR-RESUME-PROMPT.md`.
