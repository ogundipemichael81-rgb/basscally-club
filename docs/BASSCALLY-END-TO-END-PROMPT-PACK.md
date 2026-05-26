# Basscally Hub End-to-End Prompt Pack

Version: 1.0  
Date: 2026-05-25  
Purpose: Copy-paste prompts for Cursor or Codex to continue Basscally Hub from the current repo state to production readiness.

## 0. How to use this prompt pack

Use this order:

1. Paste the Cursor resume prompt first.
2. Let Cursor inspect the repo.
3. Install or update the autopilot tools.
4. Run `npm run bh:status`.
5. If the controller exists, use `npm run bh:next`.
6. If the controller does not reflect current project truth, run the reconciliation prompt first.
7. Follow the BH prompts in order.
8. Do not skip testing gates.

## 1. Cursor resume prompt

```text
You are continuing the Basscally Hub MVP build from an existing repo.

Read these files first:
- docs/AUTO-REPORTS/BH-STATE.json if it exists
- docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md if it exists
- docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md if it exists
- docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md
- docs/BASSCALLY-COMPLETE-SETUP-GUIDE.md
- docs/GPT-PROJECT-MEMORY-HANDOVER.md
- docs/basscally-full-button-function-audit.md
- docs/launch-mvp-scope.md
- docs/mobile-responsive-quality-gate.md
- docs/visual-depth-quality-gate.md
- docs/motion-audit-rules.md

Current known state:
- Phase A UI, legal pages, visual depth, responsive gates, motion gates, and landing scroll performance fixes are already done.
- Phase B is not started.
- Current branch is visual-depth-responsive-fixes.
- Commit f1e9c26 optimized landing motion scroll performance.
- Working tree should be clean.
- Basscally Hub naming is now final.
- Resource Centre replaces Walkthrough.
- Weekly drops replaces every 3 days.
- Drops come from Chris and world-class bassists.
- Downloads stay, with streaming primary and download secondary.
- New required routes are /style/[slug], /waitlist, and /resources.
- Canonical legal routes are /terms, /privacy, and /refund-policy unless current repo says otherwise.
- The uploaded older audit references /legal/terms, /legal/privacy, and /legal/refund. Treat those as audit input, not final truth. Do not regress existing legal pages.

Your first job:
Create a current-state reconciliation before any backend work.

Do not start Supabase.
Do not start Lemon Squeezy.
Do not change production env logic.
Do not delete existing Phase A work.
Do not rewrite the design system.
Do not ignore the full button/function audit.

Create:
docs/basscally-current-state-reconciliation.md
docs/basscally-action-cycle-audit.md
docs/basscally-autopilot-patch-plan.md

Each document must:
1. Compare current repo state against uploaded autopilot docs.
2. Identify outdated route assumptions.
3. Preserve existing legal routes and Phase A completed work.
4. Map all buttons to route or API targets.
5. List P0 blockers before Phase B.
6. Confirm the next build step.

After docs are created, run:
npm run typecheck
npm run lint
npm run build

Return:
- Files created
- Files updated
- Conflicts found
- P0 blockers
- Next recommended autopilot step
- Check results

Stop after this. Do not continue to Phase B.
```

## 2. Autopilot installation prompt

```text
Install or update the Basscally Hub autopilot tools.

Use the uploaded files:
- basscally-autopilot-controller.py
- basscally-ui-simulator.py
- basscally-responsive-audit.py
- BASSCALLY-AUTOPILOT-ARCHITECTURE.md
- BASSCALLY-AUTOPILOT-SETUP-README.md
- BASSCALLY-COMPLETE-SETUP-GUIDE.md
- GPT-PROJECT-MEMORY-HANDOVER.md
- basscally-full-button-function-audit.md

Place them here:
- scripts/basscally-autopilot-controller.py
- scripts/basscally-ui-simulator.py
- scripts/basscally-responsive-audit.py
- docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md
- docs/BASSCALLY-AUTOPILOT-SETUP-README.md
- docs/BASSCALLY-COMPLETE-SETUP-GUIDE.md
- docs/GPT-PROJECT-MEMORY-HANDOVER.md
- docs/basscally-full-button-function-audit.md

Update package.json scripts:
- bh:status
- bh:next
- bh:complete
- bh:check

Create:
docs/AUTO-REPORTS/BH-TOOL-CONFIG.json

Use:
{
  "editor_command": "cursor",
  "agent_command": null,
  "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md"
}

Do not overwrite current project docs without backing up differences.
Do not delete existing docs.
Do not start a build step yet.

Run:
npm run bh:status

Return:
- Files copied
- package.json scripts added
- config created
- bh:status output
- Any mismatch with current repo state
```

## 3. Autopilot reconciliation patch prompt

```text
Patch the autopilot docs and controller to match the current Basscally Hub truth.

Read:
- docs/basscally-current-state-reconciliation.md
- docs/basscally-action-cycle-audit.md
- docs/basscally-full-button-function-audit.md
- docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md
- scripts/basscally-autopilot-controller.py

Rules:
- Do not remove step gating.
- Do not remove BH-00 to BH-22.
- Do not skip steps.
- Do not start backend.
- Do not change app code unless needed for package scripts.
- Keep Basscally Hub naming.
- Keep weekly cadence.
- Keep Resource Centre.
- Keep canonical legal routes /terms, /privacy, /refund-policy.
- If old /legal routes are referenced, document them as optional redirects or aliases.
- Add /style/[slug], /waitlist, and /resources into relevant checks.

Patch:
1. BASSCALLY-AUTOPILOT-ARCHITECTURE.md
2. GPT-PROJECT-MEMORY-HANDOVER.md
3. basscally-full-button-function-audit.md if it contradicts current legal routes
4. basscally-autopilot-controller.py step metadata if it would force wrong legal routes
5. responsive and UI simulator route arrays if they are missing /style/makossa-tribe-fuego, /waitlist, /resources, and legal pages

After patch:
npm run typecheck
npm run lint
npm run build
npm run bh:status

Return:
- Files changed
- Old route assumptions corrected
- New routes added to audits
- Checks run
- Remaining conflicts
```

## 4. Full action-cycle audit prompt

```text
Run a complete action-cycle audit.

Do not write backend code yet.

Audit every interactive element across:
- /
- /style/makossa-tribe-fuego
- /pricing
- /waitlist
- /resources
- /auth/login
- /auth/callback
- /checkout/success
- /checkout/cancelled
- /terms
- /privacy
- /refund-policy
- /account/cancel
- /dashboard
- /c/[id]
- /account
- /account/billing
- /paywall
- /admin
- /admin/content
- /admin/content/new
- /admin/content/[id]
- /admin/subscribers
- /admin/email-logs
- /admin/email-templates

For each button, link, tab, form, modal, card click, download action, upload action, resend action, billing action, and sign out action, document:
- Label
- Route
- Component or file
- Target route or API
- Required auth state
- Required role
- Backend dependency
- Loading state
- Success state
- Error state
- Empty state
- Mobile behavior
- Keyboard focus behavior
- Status: live, UI-only, missing, needs backend, blocked by decision

Create:
docs/basscally-action-cycle-audit.md

Include:
- P0 blockers
- P1 blockers
- Backend API inventory
- Button target matrix
- Persona access matrix
- Test coverage map
- Items the UI simulator must test
- Items the responsive audit must test

Run:
npm run typecheck
npm run lint
npm run build

Return:
- Audit file created
- P0 blocker count
- Missing API count
- Broken or unclear button targets
- Check results
```

## 5. BH-00 prompt: Repo Scan and Docs Truth

```text
Execute BH-00: Repo Scan and Docs Truth.

Read:
- docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md
- docs/GPT-PROJECT-MEMORY-HANDOVER.md
- docs/basscally-full-button-function-audit.md
- docs/basscally-current-state-reconciliation.md if it exists
- docs/launch-mvp-scope.md
- docs/mobile-responsive-quality-gate.md
- docs/visual-depth-quality-gate.md
- docs/motion-audit-rules.md
- all reference HTML screen files
- current app routes under src/app

Create:
docs/AUTO-REPORTS/BH-00-REPO-SCAN.md

Must include these marker phrases:
- reference HTML screens present
- bridge doc verified
- button audit confirmed
- no contradictions

Also include:
- Current repo routes found
- Missing routes
- Legal route reconciliation
- New required screens 34, 35, 36
- Current Phase A completion status
- Phase B not started status
- Exact next step

Do not edit app code.
Do not start BH-01.
```

## 6. BH-01 prompt: Global Naming Pass

```text
Execute BH-01: Global Naming Pass.

Scope:
Copy and documentation only unless a route label is copy.

Apply:
- Basscally Club → Basscally Hub in user-facing copy
- Walkthrough → Resource Centre
- every 3 days → weekly
- Chris only → Chris and world-class bassists
- Join the Club → Join the Hub
- Club member → Hub member

Do not change:
- Basscally Ltd legal entity
- Company No. 16656420
- Support email
- Existing legal meaning
- Existing routes unless a link is wrong

Update:
- landing copy
- pricing copy
- FAQ source
- checkout success and cancelled copy
- Resource Centre labels
- docs
- legal docs only if service name must be user-facing Hub

Create:
docs/AUTO-REPORTS/BH-01-NAMING-PASS.md

Must include marker phrases:
- Basscally Hub
- weekly
- world-class bassists
- naming pass complete
- copy docs updated

Run:
npm run typecheck
npm run lint
npm run build
```

## 7. BH-02 prompt: Supabase Schema and Storage

```text
Execute BH-02: Supabase Schema and Storage.

Do not use destructive commands.
Do not reset production DB.
Do not expose service role key to client code.

Create Drizzle schema and migration plan for:
- users
- subscriptions
- content
- waitlist
- artists
- styles
- content_style_tags
- downloads
- email_events
- email_unsubscribes
- admin_audit_log

Storage buckets:
- audio, private
- covers, public or controlled public

Seed:
- mock-member-active
- mock-member-lapsed
- mock-admin-michael
- 1 demo artist
- 1 demo style: makossa-tribe-fuego
- 3 placeholder drops

Add RLS policy plan.
Add Supabase EU region confirmation checklist.
Add environment variable documentation.

Create:
docs/AUTO-REPORTS/BH-02-SCHEMA-COMPLETE.md
docs/database-schema-plan.md
docs/supabase-setup-checklist.md

Must include marker phrases:
- users table
- subscriptions table
- content table
- waitlist table
- artists table
- styles table
- downloads table
- audio bucket
- covers bucket
- EU region

Run:
npm run typecheck
npm run lint
npm run build
```

## 8. BH-03 prompt: Lemon Squeezy Webhook and Subscription Access

```text
Execute BH-03: Lemon Squeezy Webhook and Subscription Access.

Build:
- POST /api/webhooks/lemonsqueezy
- subscription access helpers
- download API subscription verification
- idempotency storage
- founding member assignment logic
- env validation

Required Lemon Squeezy events:
- subscription_created
- subscription_updated
- subscription_cancelled
- subscription_expired
- subscription_payment_failed
- subscription_payment_success

Security:
- HMAC SHA256 signature verification
- reject missing signature
- reject invalid signature
- never trust client checkout success
- service role only server-side

Founding logic:
- founding cap 500
- set is_founding_member only if active founder count < 500
- use transaction or safe locking where possible

Download API:
- GET /api/content/[id]/download
- active subscription required
- lapsed member gets 403
- anonymous gets 401 or redirect
- returns signed Supabase Storage URL only after server check
- logs download

Create:
docs/AUTO-REPORTS/BH-03-WEBHOOK-COMPLETE.md
docs/lemon-squeezy-setup-checklist.md
docs/subscription-access-rules.md

Must include marker phrases:
- subscription_created
- subscription_cancelled
- subscription_payment_failed
- HMAC SHA256
- idempotent
- is_founding_member
- download API
- subscription check server-side

Run:
npm run typecheck
npm run lint
npm run build
```

## 9. BH-04 prompt: Magic Link Auth

```text
Execute BH-04: Magic Link Auth.

Build:
- Supabase magic link login
- auth callback handling
- protected member middleware
- protected admin middleware
- rate limit magic link resend
- staging-only mock auth route for simulator

Routes:
- /auth/login
- /auth/callback
- /api/mock-auth/session, staging only

Rules:
- no passwords
- no client service role
- no production mock auth
- redirect active member to /dashboard
- redirect admin to /admin if intended
- anonymous member route access goes to /auth/login or /pricing based on context
- admin route requires ADMIN_EMAILS allowlist

Create:
docs/AUTO-REPORTS/BH-04-AUTH-COMPLETE.md
docs/auth-flow.md

Must include marker phrases:
- magic link
- auth callback
- middleware
- rate limit
- member routes protected
- admin routes protected

Run:
npm run typecheck
npm run lint
npm run build
```

## 10. BH-05 prompt: Landing Page and Waitlist

```text
Execute BH-05: Landing Page and Waitlist.

Update landing page:
- Basscally Hub naming
- weekly drops
- Chris and world-class bassists
- streaming-first, download-secondary copy
- primary CTA to /style/makossa-tribe-fuego where cold traffic needs desire-first flow
- secondary CTA to /pricing or /resources where appropriate
- mobile sticky CTA without scroll jank

Build /waitlist:
- email input
- experience level
- style interest
- optional note
- API POST /api/waitlist if DB ready
- no fake DB writes
- client success state only if API exists or clearly marked UI-only
- social share nudge

Create:
docs/AUTO-REPORTS/BH-05-LANDING-COMPLETE.md

Must include marker phrases:
- landing page complete
- waitlist page
- founding member counter
- mobile sticky CTA
- FAQ accordion

Run:
npm run typecheck
npm run lint
npm run build
python scripts/basscally-responsive-audit.py --route /
```

## 11. BH-06 prompt: Artist and Style Page

```text
Execute BH-06: Artist and Style Page.

Route:
- /style/[slug]
- /style/makossa-tribe-fuego

Build:
- hero with desired style outcome
- “Play Makossa like Tribe Fuego”
- 3 to 5 preview track cards
- 20 to 30 second preview UI
- play preview action, UI-only until audio ready if needed
- locked full access state
- what you will learn
- who it is for
- pricing unlock panel
- mobile sticky unlock CTA
- trust strip
- legal links
- weekly drops copy

Rules:
- value first, reading second
- no copyrighted image unless provided
- no fake audio claim
- no fake checkout
- no fake countdown
- no dev words
- must support three-click flow

Create:
docs/AUTO-REPORTS/BH-06-STYLE-PAGE-COMPLETE.md
docs/style-page-spec.md

Must include marker phrases:
- artist style page
- 30-second preview
- gated
- unlock CTA
- three-click flow
- /style/[slug]

Run:
npm run typecheck
npm run lint
npm run build
python scripts/basscally-responsive-audit.py --route /style/makossa-tribe-fuego
```

## 12. BH-07 prompt: Pricing Page

```text
Execute BH-07: Pricing Page.

Plans:
1. Monthly, $2.99
2. Founding Member, $1.50, centre and highlighted
3. Annual, $18/year

Rules:
- Founding Member is the no-brainer
- no fake countdown
- founding spot counter is live from DB when wired
- if DB not available, show non-fake “Limited founding member window”
- all CTAs use Lemon Squeezy variant URLs
- mobile may show Founding first if conversion needs it
- no duplicate top CTA cluster

Create:
docs/AUTO-REPORTS/BH-07-PRICING-COMPLETE.md

Must include marker phrases:
- three-tier pricing
- founding member centre
- spot counter live
- Monthly variant
- Annual variant

Run:
npm run typecheck
npm run lint
npm run build
```

## 13. BH-08 prompt: Checkout Success and Cancelled

```text
Execute BH-08: Checkout Success and Cancelled.

Build /checkout/success:
- Your first practice drop is ready
- magic link explanation
- membership pass card
- Go to dashboard CTA
- Resend magic link
- featured hot track
- WhatsApp community link if real
- if WhatsApp URL missing, show “Community invite will be sent in your welcome email”
- never fake active subscription
- data must come from webhook-populated subscription when available

Build /checkout/cancelled:
- reassure user
- show founding offer
- Try again CTA
- See what you get CTA to style page or Resource Centre
- no guilt copy

Create:
docs/AUTO-REPORTS/BH-08-CHECKOUT-COMPLETE.md

Must include marker phrases:
- checkout success
- checkout cancelled
- membership pass
- WhatsApp community link
- resend magic link

Run:
npm run typecheck
npm run lint
npm run build
```

## 14. BH-09 prompt: Member Dashboard

```text
Execute BH-09: Member Dashboard.

Build:
- empty state
- populated state
- latest drop hero
- play primary CTA
- download secondary CTA
- content grid
- filters: All, Bass-less, Grooves, Fills, Challenges
- next drop countdown
- upcoming drop rail
- mobile bottom nav
- skeleton loading

Rules:
- active member only
- anonymous redirects
- lapsed member sees paywall
- stream first
- download second

Create:
docs/AUTO-REPORTS/BH-09-DASHBOARD-COMPLETE.md

Must include marker phrases:
- dashboard empty state
- dashboard populated
- latest drop hero
- filter tabs
- content grid
- next-drop countdown
- mobile bottom nav
- skeleton loading

Run:
npm run typecheck
npm run lint
npm run build
```

## 15. BH-10 prompt: Content Detail and Download API

```text
Execute BH-10: Content Detail and Download API.

Build /c/[id]:
- back to library
- audio player
- play/pause
- scrub bar
- time display
- metadata
- play primary CTA
- download secondary CTA
- share button
- locked or paywall state

Build /api/content/[id]/download:
- active subscription required
- lapsed gets 403
- anonymous gets 401
- returns signed Supabase Storage URL
- logs download
- handles rate limit state
- never returns file URL before subscription check

Create:
docs/AUTO-REPORTS/BH-10-CONTENT-DETAIL-COMPLETE.md

Must include marker phrases:
- audio player
- signed URL
- download API
- subscription check
- scrub bar
- rate limit state
- share button

Run:
npm run typecheck
npm run lint
npm run build
python scripts/basscally-ui-simulator.py --suite member
python scripts/basscally-ui-simulator.py --suite paywall
```

## 16. BH-11 prompt: Account and Billing

```text
Execute BH-11: Account and Billing Management.

Build:
- /account
- /account/billing
- /account/cancel
- subscription status
- founding badge
- renewal or period end date
- Manage billing button to LS customer portal
- cancel confirmation
- past-due banner
- update payment CTA

Rules:
- cancellation handled through LS portal or confirmed backend flow
- no fake cancellation success
- user keeps access until paid period ends
- refund not handled in our UI
- support email visible

Create:
docs/AUTO-REPORTS/BH-11-ACCOUNT-COMPLETE.md

Must include marker phrases:
- account page
- subscription status
- LS customer portal
- cancel confirmation
- past-due banner
- billing management

Run:
npm run typecheck
npm run lint
npm run build
```

## 17. BH-12 prompt: Paywall and Re-subscribe

```text
Execute BH-12: Paywall and Re-subscribe.

Build:
- /paywall
- blurred locked preview
- reactivate CTA
- plan options
- lapsed member messaging
- anonymous messaging
- founding re-join note only when allowed
- route guards from /c/[id]

Rules:
- no content leak
- no signed URL leak
- no client-only access check
- subscription helper must be server-side for gated content

Create:
docs/AUTO-REPORTS/BH-12-PAYWALL-COMPLETE.md

Must include marker phrases:
- paywall
- blurred preview
- reactivate CTA
- founding member re-join
- lapsed member
- anonymous user

Run:
npm run typecheck
npm run lint
npm run build
python scripts/basscally-ui-simulator.py --suite paywall
```

## 18. BH-13 prompt: Admin Upload and Content Management

```text
Execute BH-13: Admin Upload Form and Content Management.

Build:
- /admin/content/new
- /admin/content
- /admin/content/[id]
- audio upload to private bucket
- optional cover upload
- title, type, difficulty, release date, description
- artist and style tag field
- draft, scheduled, publish now
- email subject and body
- preview email
- save drop
- edit content
- soft delete modal
- resend action placeholder if email not ready

Rules:
- admin only
- server validation with Zod
- no client service role
- audit log admin writes

Create:
docs/AUTO-REPORTS/BH-13-ADMIN-CONTENT-COMPLETE.md

Must include marker phrases:
- admin upload form
- audio upload
- artist style tag
- status toggle
- soft delete
- content edit
- email preview

Run:
npm run typecheck
npm run lint
npm run build
python scripts/basscally-ui-simulator.py --suite admin
```

## 19. BH-14 prompt: Admin Metrics

```text
Execute BH-14: Admin Metrics Dashboard.

Build:
- /admin
- /admin/subscribers
- /admin/email-logs
- /admin/email-templates
- metric cards: active subscribers, MRR, new this month, failed payments
- subscriber list
- status filters
- search
- pagination
- export CSV
- email logs
- email resend button
- template preview

Rules:
- admin only
- no fake production metrics
- if seed data, label as demo in local only
- CSV endpoint server-side
- protect ADMIN_EMAILS

Create:
docs/AUTO-REPORTS/BH-14-ADMIN-METRICS-COMPLETE.md

Must include marker phrases:
- metrics dashboard
- active subscribers
- MRR
- export CSV
- subscribers list
- email delivery logs
- admin middleware

Run:
npm run typecheck
npm run lint
npm run build
python scripts/basscally-ui-simulator.py --suite admin
```

## 20. BH-15 prompt: Email Automation

```text
Execute BH-15: Email Automation.

Build Resend email system:
- welcome email
- magic link support if handled by Supabase
- new-drop notification
- payment failed email
- unsubscribe handling
- email event logs
- resend notification action
- admin template previews
- cron or queue for published drops

Rules:
- welcome email within 60 seconds after subscription_created
- new drop email to 100 percent active subscribers within 5 minutes
- all non-transactional emails include unsubscribe link
- payment failed email links to LS customer portal
- no secrets in client code
- no fake send success

Create:
docs/AUTO-REPORTS/BH-15-EMAIL-COMPLETE.md
docs/email-automation-plan.md

Must include marker phrases:
- welcome email
- new-drop notification
- payment failed email
- unsubscribe link
- 100% active subscribers
- within 5 minutes
- 60 seconds

Run:
npm run typecheck
npm run lint
npm run build
```

## 21. BH-16 prompt: Legal Pages

```text
Execute BH-16: Legal Pages.

Important:
The current repo may already have /terms, /privacy, and /refund-policy. Preserve those if present.

Canonical current routes:
- /terms
- /privacy
- /refund-policy

Optional aliases:
- /legal/terms → /terms
- /legal/privacy → /privacy
- /legal/refund → /refund-policy

Build or verify:
- Terms of Service
- Privacy Policy
- Refund Policy
- footer links
- support email
- company number
- address on request
- no solicitor markers publicly
- no residential address
- no Stripe or PayPal if not active
- Lemon Squeezy as payment provider where applicable

Create:
docs/AUTO-REPORTS/BH-16-LEGAL-COMPLETE.md

Must include marker phrases:
- terms of service
- privacy policy
- refund policy
- Basscally Ltd
- 16656420
- basscally.enquiry@gmail.com

Run:
npm run typecheck
npm run lint
npm run build
```

## 22. BH-17 prompt: Utility States

```text
Execute BH-17: Utility States.

Build or verify:
- 404
- 500
- admin unauthorized
- download rate-limit state
- billing portal redirect
- cancel confirmation modal
- past-due grace state
- manual resend confirmation
- soft delete confirmation
- empty search state

Rules:
- match Basscally dark editorial design system
- no dev language
- no fake success
- each state has a clear next action
- mobile quality equals desktop

Create:
docs/AUTO-REPORTS/BH-17-UTILITY-COMPLETE.md

Must include marker phrases:
- 404 page
- 500 page
- admin unauthorized
- rate limit state
- cancel confirmation modal
- billing portal redirect
- past-due grace

Run:
npm run typecheck
npm run lint
npm run build
```

## 23. BH-18 prompt: UI Simulator

```text
Execute BH-18: UI Simulator Full Click Test.

First start dev server in another terminal:
npm run dev

Run:
python scripts/basscally-ui-simulator.py --suite all

If FAILs appear:
- read docs/AUTO-REPORTS/UI-SIM-FIX-PROMPT.md
- fix every FAIL
- rerun suite all

Required:
- anonymous blocked from /dashboard
- anonymous blocked from /c/[id]
- anonymous blocked from /admin
- active member accesses dashboard
- active member opens content
- active member sees player
- lapsed member sees paywall
- lapsed member download rejected
- admin accesses admin routes
- member cannot access admin
- zero FAILs
- screenshots available for failures, or none if all pass

Create or confirm:
docs/AUTO-REPORTS/UI-SIM-LATEST.md

Must include marker phrases:
- anonymous blocked
- member access
- lapsed paywall
- admin access
- download rejected
- zero FAILs
- screenshots
```

## 24. BH-19 prompt: Responsive Audit

```text
Execute BH-19: Mobile Responsive Audit.

First start dev server:
npm run dev

Run:
python scripts/basscally-responsive-audit.py

Required widths:
- 320px
- 375px
- 390px
- 768px
- 1024px
- 1280px

Required:
- zero P0 FAILs
- no horizontal overflow
- tap targets at least 44px
- input font size at least 16px
- grids do not overflow
- landing CTA visible at 375x667
- screenshots for failures
- scroll performance still smooth on /
- no overflow-x hidden on html/body if sticky nav rule says clip main instead

Create or confirm:
docs/AUTO-REPORTS/BH-19-RESPONSIVE-AUDIT.md

Must include marker phrases:
- 320px
- 375px
- 768px
- 1024px
- zero P0 FAILs
- tap targets
- no horizontal overflow
- input font-size 16px
```

## 25. BH-20 prompt: Motion and Depth Fix

```text
Execute BH-20: Motion Audit and Depth Fix.

Audit:
- orbit dots
- wave bars
- vinyl motion
- scanline
- glows
- sticky nav
- mobile CTA
- pricing wave
- callback wave
- callback pulse glow
- landing scroll smoothness

Rules:
- no full-page continuous background animation
- no fixed SVG noise on mobile
- continuous motion must be transform or opacity only
- do not animate filter, backdrop-filter, blur, or box-shadow in infinite loops
- decorative motion pointer-events none
- animated containers relative isolate overflow-hidden where needed
- no horizontal scroll
- reduced motion disables loops
- mobile uses reduced glow and fewer loops

Create:
docs/AUTO-REPORTS/BH-20-MOTION-DEPTH-COMPLETE.md

Must include marker phrases:
- orbit dot fix
- overflow-hidden
- pointer-events none
- body atmosphere
- gradient card
- inner highlight
- mobile contrast

Run:
npm run typecheck
npm run lint
npm run build
node scripts/scroll-performance-audit.mjs if present
node scripts/home-scroll-qa.mjs if present
```

## 26. BH-21 prompt: Performance

```text
Execute BH-21: Performance.

Targets:
- Lighthouse mobile score at least 85
- CLS below 0.1
- no page above agreed JS budget
- skeleton loaders for async data
- no cookie banner because analytics are cookieless
- Plausible or Umami installed if chosen
- smooth scroll at 375px and 390px
- no long tasks from decorative motion
- images optimized
- audio lazy loaded
- admin charts do not bloat public bundle

Create:
docs/AUTO-REPORTS/BH-21-PERFORMANCE.md

Must include marker phrases:
- Lighthouse ≥ 85
- CLS < 0.1
- < 2 seconds
- skeleton loaders
- Plausible
- no cookie banner

Run:
npm run typecheck
npm run lint
npm run build
```

## 27. BH-22 prompt: Production Readiness

```text
Execute BH-22: Production Readiness.

Verify:
- all MVP acceptance criteria
- all legal checklist items
- all env variables present
- Supabase RLS enabled
- Lemon Squeezy production mode ready
- webhook secret set
- ADMIN_EMAILS set
- Resend domain verified
- legal pages reviewed
- solicitor review status documented
- WhatsApp community link confirmed or fallback copy active
- founding counter wired
- no mock auth in production
- no service role in client
- no fake data in production routes
- UI simulator zero FAIL
- responsive audit zero P0 FAIL
- performance pass
- production deploy checklist complete

Create:
docs/AUTO-REPORTS/BH-22-PRODUCTION-READY.md

Must include marker phrases:
- 13 acceptance criteria
- legal checklist
- D1 resolved
- D6 resolved
- RLS enabled
- webhook secret
- production mode
- solicitor review
- Program complete

Run:
npm run typecheck
npm run lint
npm run build
python scripts/basscally-ui-simulator.py --suite all
python scripts/basscally-responsive-audit.py
```

## 28. Lemon Squeezy manual setup prompt

```text
Create a Lemon Squeezy manual setup checklist.

Include:
- Create store
- Create product: Basscally Hub Membership
- Create variants:
  - Founding Member $1.50 monthly
  - Monthly $2.99 monthly
  - Annual $18 yearly
- Capture store ID
- Capture variant IDs
- Generate API key
- Create webhook endpoint:
  /api/webhooks/lemonsqueezy
- Select required subscription events
- Copy webhook secret
- Set checkout success URL:
  /checkout/success
- Set checkout cancelled URL:
  /checkout/cancelled
- Confirm Merchant of Record handling
- Confirm customer portal flow
- Confirm refund and invoice handling via LS portal
- Confirm test mode values
- Confirm production mode values

Create:
docs/lemon-squeezy-manual-setup.md

Do not put real secrets in the doc.
Use placeholders only.
```

## 29. Supabase manual setup prompt

```text
Create a Supabase setup checklist.

Include:
- Create project in EU region
- Add database URL
- Add direct URL if needed
- Add anon key
- Add service role key server-only
- Enable Auth magic link
- Configure Site URL
- Configure redirect URLs
- Create tables from Drizzle schema
- Enable RLS
- Add RLS policies
- Create audio bucket private
- Create covers bucket
- Seed mock users
- Seed demo style
- Seed demo content
- Verify no service role in client bundle

Create:
docs/supabase-manual-setup.md

Do not put real secrets in the doc.
Use placeholders only.
```

## 30. Final QA prompt before every commit

```text
Run final QA before commit.

Check:
- npm run typecheck
- npm run lint
- npm run build
- no console React key warnings
- no duplicate CTA clusters
- no dev words in public UI
- no fake legal markers
- no horizontal overflow at 320, 375, 390, 768, 1024, 1280
- no landing scroll jank
- no fixed SVG noise on mobile
- legal routes work
- Resource Centre route works
- style route works
- waitlist route works
- all buttons have targets
- every API button either works or is clearly blocked by current phase

Return:
- PASS/FAIL table
- files changed
- remaining P0
- remaining P1
- exact commit message
```
