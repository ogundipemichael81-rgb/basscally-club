# Basscally Hub Cursor Resume Prompt

Use this as the first message in Cursor now.

```text
Read this carefully and continue the Basscally Hub build from the current repo state.

Current known state from Michael:
- Phase A visual work is complete.
- Legal pages are implemented.
- Visual depth, responsive, motion, and landing scroll performance gates are documented and passed for the current public routes.
- Landing scroll performance is now a P0 gate.
- Phase B has not started.
- Latest commit: f1e9c26, fix: optimize landing motion scroll performance.
- Branch: visual-depth-responsive-fixes.
- Working tree should be clean.
- Branch is 4 commits ahead of origin/visual-depth-responsive-fixes.

Uploaded tool pack available:
- scripts/basscally-autopilot-controller.py
- scripts/basscally-ui-simulator.py
- scripts/basscally-responsive-audit.py
- docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md
- docs/BASSCALLY-AUTOPILOT-SETUP-README.md
- docs/BASSCALLY-COMPLETE-SETUP-GUIDE.md
- docs/GPT-PROJECT-MEMORY-HANDOVER.md
- docs/basscally-full-button-function-audit.md

Locked decisions:
- Product name: Basscally Hub.
- Domain remains basscally.club.
- Resource Centre replaces Walkthrough.
- Content cadence is weekly, not every 3 days.
- Drops come from Chris and world-class bassists.
- Pricing:
  - Monthly: $2.99/month
  - Founding Member: $1.50/month, centre and highlighted
  - Annual: $18/year
- Founding cap: 500, live counter from DB when wired.
- Auth: magic link only.
- Payment: Lemon Squeezy.
- Billing: Lemon Squeezy customer portal.
- Downloads stay, with streaming primary and download secondary.
- Supabase region: EU.
- Analytics: Plausible or Umami, cookieless.
- Company: Basscally Ltd, No. 16656420.
- Support: basscally.enquiry@gmail.com.
- WhatsApp community link appears only if real. Otherwise use welcome-email fallback copy.

Important reconciliation:
Some uploaded docs still say legal pages are /legal/terms, /legal/privacy, and /legal/refund.
The current built Phase A legal routes are /terms, /privacy, and /refund-policy.
Do not regress these.
If old /legal routes are needed, add aliases later. Do not replace the current routes.

New required routes:
- /style/[slug]
- /style/makossa-tribe-fuego
- /waitlist
- /resources

First task:
Do not start backend yet.
Do not start Supabase yet.
Do not start Lemon Squeezy yet.

Create these docs:
1. docs/basscally-current-state-reconciliation.md
2. docs/basscally-action-cycle-audit.md
3. docs/basscally-autopilot-patch-plan.md

The docs must:
- compare current repo routes and components against uploaded autopilot docs
- preserve completed Phase A work
- preserve legal routes
- list all missing screens and routes
- audit every button and function from the uploaded full button audit
- map every button to target route or API
- identify P0 blockers before Phase B
- identify which controller metadata must be patched
- include the next safe command

Then install or verify autopilot tools:
- copy scripts into scripts/
- copy docs into docs/
- add package.json scripts:
  - bh:status
  - bh:next
  - bh:complete
  - bh:check
- create docs/AUTO-REPORTS/BH-TOOL-CONFIG.json if missing

Run:
npm run typecheck
npm run lint
npm run build
npm run bh:status

Return:
- files created
- files updated
- conflicts found
- P0 blockers
- bh:status output
- next safe command

Stop after this.
Do not start Phase B.
```
