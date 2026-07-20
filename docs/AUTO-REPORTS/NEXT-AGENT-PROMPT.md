# CONTINUE BASSCALLY HUB AUTOPILOT — BH-19

## Active step: BH-19 — Mobile Responsive Audit
**Status:** `pending`

## Hard rules — read before touching anything

- Do not break the dark editorial design system (04_basscally_design_system.md is the contract).
- Do not change schema without updating BH-02 artifact and this prompt.
- Do not deploy to production until BH-22 is complete.
- Do not remove download functionality — streaming primary, download secondary.
- Do not add cookie banners — analytics are cookieless by design.
- Do not change the founding member cap logic without explicit approval.
- Do not re-ask for locked decisions listed below.
- Every button and function must match the basscally-full-button-function-audit.md.

## Read these first (in order)

1. docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md
2. docs/AUTO-REPORTS/BH-STATE.json
3. docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md
4. docs/basscally-full-button-function-audit.md
5. 04_basscally_design_system.md
6. 01_PRD_basscally_club_mvp_UPDATED_v1_1.md
7. docs/AUTO-REPORTS/BH-19-RESPONSIVE-AUDIT.md (produce this)

## Locked decisions — do not re-open

- Name: Basscally Hub (was Basscally Club)
- Content cadence: weekly (was every 3 days)
- Drops from Chris AND world-class bassists
- Three-click flow: Hub → Style/Artist page → Checkout
- Pricing: Monthly $2.99 / Founding Member $1.50 (centre) / Annual $18
- Founding member cap: 500 (counter must be live from DB)
- Downloads kept: streaming primary, download secondary
- Magic link auth (no passwords)
- Lemon Squeezy as Merchant of Record — self-serve customer portal
- Supabase EU region
- Company: Basscally Ltd, No. 16656420, registered England and Wales
- Contact: basscally.enquiry@gmail.com
- Analytics: Plausible or Umami (cookieless, no cookie banner needed)
- WhatsApp community link in checkout success and welcome email
- Resource Centre (was Walkthrough)

## This step: BH-19

Run basscally-responsive-audit.py and Node responsive/scroll audits. Breakpoints 320/375/390/768/1024/1280. Spec: docs/mobile-responsive-quality-gate.md. Zero P0 FAILs on public routes.

## Artifact to produce

`docs/AUTO-REPORTS/BH-19-RESPONSIVE-AUDIT.md`

This file must contain ALL of the following (checked by controller):

- 320px
- 375px
- 768px
- 1024px
- zero P0 FAILs
- tap targets
- no horizontal overflow
- input font-size 16px

## Completed steps so far

- ✅ BH-00 — Repo Scan and Docs Truth
- ✅ BH-01 — Global Naming Pass
- ✅ BH-02 — Supabase Schema and Storage
- ✅ BH-03 — Lemon Squeezy Webhook and Subscription Access
- ✅ BH-04 — Magic Link Auth
- ✅ BH-05 — Landing Page and Waitlist
- ✅ BH-06 — Artist and Style Page — The Conversion Engine
- ✅ BH-07 — Pricing Page — Three-Tier
- ✅ BH-08 — Checkout Success and Cancelled
- ✅ BH-09 — Member Dashboard
- ✅ BH-10 — Content Detail and Download API
- ✅ BH-11 — Account and Billing Management
- ✅ BH-12 — Paywall and Re-subscribe
- ✅ BH-13 — Admin Upload Form and Content Management
- ✅ BH-14 — Admin Metrics Dashboard
- ✅ BH-15 — Email Automation
- ✅ BH-16 — Legal Pages
- ✅ BH-17 — Utility States
- ✅ BH-18 — UI Simulator — Full Click Test

## After IDE work

```powershell
npm run bh:complete
```

If bh:complete reports missing markers, fix them and run bh:complete again.
Do not run bh:next until bh:complete passes.

## Reference files

- Design reference screens: all basscally-screen-*.html files
- Button audit: docs/basscally-full-button-function-audit.md
- Mobile audit spec: docs/mobile-responsive-quality-gate.md
- Legal drafts: docs/basscally-legal-document-drafts.md
- Depth/color fix: docs/codex-depth-color-fix-prompt.md

---

## EXECUTE NOW

Read this file completely. Do not ask for clarification.
Do not ask for permission. Do not summarise what you are about to do.
Execute the step described above in full.
Create the artifact file at the path listed above.
Include every required marker in the artifact.
When done, stop. The user will run `npm run bh:complete` to verify.
