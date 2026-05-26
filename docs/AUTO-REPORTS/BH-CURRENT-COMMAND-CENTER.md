# Basscally Hub — Current Command Center
*Updated: 2026-05-26T01:45:15Z*

## Current step: BH-04 — Magic Link Auth
**Status:** `pushed`
**After this:** BH-05

## What to do right now

```powershell
npm run bh:next
```

Then tell your IDE agent to read `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md`.

After IDE finishes: `npm run bh:complete`

## Progress
Completed: 4 / 23

✅ BH-00 — Repo Scan and Docs Truth
✅ BH-01 — Global Naming Pass
✅ BH-02 — Supabase Schema and Storage
✅ BH-03 — Lemon Squeezy Webhook and Subscription Access
▶️ BH-04 — Magic Link Auth
⬜ BH-05 — Landing Page and Waitlist
⬜ BH-06 — Artist and Style Page — The Conversion Engine
⬜ BH-07 — Pricing Page — Three-Tier
⬜ BH-08 — Checkout Success and Cancelled
⬜ BH-09 — Member Dashboard
⬜ BH-10 — Content Detail and Download API
⬜ BH-11 — Account and Billing Management
⬜ BH-12 — Paywall and Re-subscribe
⬜ BH-13 — Admin Upload Form and Content Management
⬜ BH-14 — Admin Metrics Dashboard
⬜ BH-15 — Email Automation
⬜ BH-16 — Legal Pages
⬜ BH-17 — Utility States
⬜ BH-18 — UI Simulator — Full Click Test
⬜ BH-19 — Mobile Responsive Audit
⬜ BH-20 — Motion Audit and Depth Fix
⬜ BH-21 — Performance
⬜ BH-22 — Production Readiness

## Locked decisions

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