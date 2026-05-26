# Basscally Hub — GPT Project Memory Handover

Paste this entire file as your first message when starting a new GPT session or saving to GPT project memory. It gives full context in one read.

---

## WHO I AM

Michael, co-founder/COO of Basscally. Chris is the UK-based public-facing bassist. I'm based in Nigeria handling strategy, tech, and systems. I am a vibecoder — I direct AI tools to build. I don't hand-code.

---

## WHAT WE ARE BUILDING

**Basscally Hub** — a bass guitar practice membership.

- $1.50/month founding member (first 500 — counter live from DB)
- $2.99/month standard after founding window closes
- $18/year annual option
- New practice drops weekly (bass-less covers, grooves, fills, challenges)
- From Chris AND world-class bassists
- Email notification on every drop
- Admin uploads audio + metadata; system handles delivery

**Company:** Basscally Ltd, registered England and Wales, Company No. 16656420
**Domain:** basscally.club
**Contact:** basscally.enquiry@gmail.com

---

## THE THREE-CLICK CONVERSION FLOW (architectural spine)

```
Click 1: TikTok/IG bio link → basscally.club
Click 2: Artist/Style page → e.g. "Play Makossa like Tribe Fuego" + preview tracks
Click 3: Checkout → founding member pricing → payment
```

After payment: magic link email → dashboard → practice content ready.

---

## LOCKED STACK

- Next.js 15 App Router + TypeScript strict
- Tailwind CSS v4
- shadcn/ui
- Supabase Auth + Postgres + Storage (EU region)
- Drizzle ORM
- Lemon Squeezy (Merchant of Record — handles global tax/VAT)
- Resend (email)
- Vercel Cron
- Plausible or Umami (cookieless analytics — no cookie banner needed)

---

## LOCKED DECISIONS — DO NOT RE-OPEN THESE

| Decision | Value |
|---|---|
| Product name | Basscally Hub (domain basscally.club stays) |
| Content cadence | Weekly |
| Drop creators | Chris + world-class bassists |
| Auth | Magic link only (no passwords) |
| Payment/billing | Lemon Squeezy as Merchant of Record |
| Billing self-serve | LS customer portal (no refund button in our UI) |
| Downloads | Kept — streaming primary, download secondary |
| Database region | Supabase EU |
| Analytics | Plausible/Umami (cookieless, confirmed no banner needed) |
| Founding cap | 500 (live counter from DB, not static) |
| WhatsApp community | Link in checkout success + welcome email |
| Nav: Walkthrough renamed | Resource Centre |
| Legal entity | Basscally Ltd, No. 16656420, registered England & Wales |
| Refund process | Via LS portal (MoR handles refund transaction) |
| Download risk mitigation | Weekly release schedule (not batch) |

---

## THE AUTOPILOT BUILD SYSTEM

The repo runs a self-managing build controller using three Python scripts:

```
scripts/basscally-autopilot-controller.py    ← four-command brain
scripts/basscally-ui-simulator.py            ← automated browser click tests
scripts/basscally-responsive-audit.py        ← breakpoint checks
```

Four commands run everything:

```powershell
npm run bh:status    # where are we
npm run bh:next      # write prompt file → open in IDE
npm run bh:complete  # verify artifact → advance or report gaps
npm run bh:check     # health checks only (build/lint/tsc)
```

State lives in `docs/AUTO-REPORTS/BH-STATE.json`.
Current task prompt lives in `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md`.
The command center at `docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md` always says what to do right now.

**The daily loop:**
```
npm run bh:next → IDE agent reads NEXT-AGENT-PROMPT.md → does work → npm run bh:complete
```

---

## THE 22 BUILD STEPS

| Step | Title |
|---|---|
| BH-00 | Repo Scan and Docs Truth |
| BH-01 | Global Naming Pass (Club→Hub, 3-days→weekly) |
| BH-02 | Supabase Schema and Storage |
| BH-03 | Lemon Squeezy Webhook + Subscription Access |
| BH-04 | Magic Link Auth |
| BH-05 | Landing Page + Waitlist |
| BH-06 | Artist/Style Page (the conversion engine) |
| BH-07 | Pricing Page (3-tier, founding member centre) |
| BH-08 | Checkout Success + Cancelled |
| BH-09 | Member Dashboard (empty + populated) |
| BH-10 | Content Detail + Audio Player + Download API |
| BH-11 | Account + Billing Management |
| BH-12 | Paywall + Re-subscribe |
| BH-13 | Admin Upload Form + Content Management |
| BH-14 | Admin Metrics Dashboard |
| BH-15 | Email Automation |
| BH-16 | Legal Pages |
| BH-17 | Utility States |
| BH-18 | UI Simulator Full Click Test |
| BH-19 | Mobile Responsive Audit |
| BH-20 | Motion + Depth Fix |
| BH-21 | Performance |
| BH-22 | Production Readiness |

---

## SCREENS LOCKED (reference HTML files)

33 screens + 3 new screens required:

| # | Screen | Reference file |
|---|---|---|
| 1 | Landing Hero | basscally-hero-v2.html |
| 2 | Full Landing Page | basscally-full-landing-v2.html |
| 3 | Auth Login | basscally-auth-login.html |
| 4 | Dashboard Empty | basscally-screen-4-dashboard-empty-art-motion.html |
| 5 | Dashboard Populated | basscally-screen-5-dashboard-populated.html |
| 6 | Content Detail | basscally-screen-6-content-detail.html |
| 7 | Account / Membership | basscally-screen-7-account-membership.html |
| 8 | Paywall / Re-subscribe | basscally-screen-8-paywall-resubscribe.html |
| 9 | Admin Upload Form | basscally-admin-screens-9-10.html |
| 10 | Admin Metrics | basscally-admin-screens-9-10.html |
| 11–33 | All utility/admin screens | See 06_locked_screen_designs_UPDATED_01_33.md |
| NEW 34 | Artist/Style Page | To be designed — first style content needed from Chris |
| NEW 35 | Waitlist Page | To be designed |
| NEW 36 | Resource Centre Index | To be designed |

---

## OPEN DECISIONS (must be resolved before build steps that need them)

| # | Decision | Blocks |
|---|---|---|
| D1 | Confirm name is Basscally Hub everywhere | BH-01 |
| D2 | Which artists/styles launch first? (Chris decides) | BH-06 |
| D3 | Preview track length on style page: 30s? Full? | BH-06 |
| D4 | Share button on /c/[id]: member-only URL or public preview? | BH-10 |
| D5 | WhatsApp community link confirmed ready | BH-08, BH-15 |
| D6 | Annual plan: include at launch or post-MVP? | BH-07 |
| D7 | Download rate limit: how many per day per member? | BH-10, BH-17 |
| D8 | Resource Centre: what content at launch? (Chris) | BH-16, Screen 36 |
| D9 | Founding spot counter: confirm 500 cap | BH-05, BH-07 |

---

## BUTTON/FUNCTION AUDIT SUMMARY

Full audit at `docs/basscally-full-button-function-audit.md`.

Critical API routes that must exist (all 🔴 before MVP):

| Route | Method | Purpose |
|---|---|---|
| /api/webhooks/lemonsqueezy | POST | Subscription lifecycle |
| /api/content/[id]/download | GET | Gated download — check subscription server-side |
| /api/admin/content | POST | Create drop |
| /api/admin/content/[id] | GET/PATCH/DELETE | Manage drop |
| /api/admin/subscribers | GET | Subscriber list |
| /api/admin/metrics | GET | Live metrics |
| /api/admin/email/resend/[id] | POST | Resend notification |
| /api/admin/export/subscribers | GET | CSV export |
| /api/waitlist | POST | Add to waitlist |
| /api/mock-auth/session | POST | Staging-only mock auth for simulator |
| /auth/callback | GET | Supabase magic link callback |

**Critical download API rule:** The download button existing in the UI is not enough. Server-side must check subscription status before returning the signed Supabase Storage URL. Lapsed member → 403 → paywall redirect.

---

## DESIGN SYSTEM SUMMARY (the contract)

- **Theme:** Dark only. Near-black `#030304` background.
- **Brand:** Amp Orange `#FF4A05` — primary CTAs only, max 10% of any screen.
- **Fonts:** Cabinet Grotesk (display), Geist (body), Geist Mono (metadata/mono accents).
- **Spacing:** 8px scale only. No invented values.
- **Mobile-first:** 375px is the primary design target. TikTok/IG traffic is phone-first.
- **Card depth:** 3-layer system — body atmosphere (radial gradients), gradient card surface + inner highlight `::before`, brand glow shadow.
- **References:** Spotify, Linear, Patreon, Apple Music.
- **Never:** purple gradients, stock guitarist photos, gamer neon, generic SaaS templates.

---

## LEGAL STATUS

- Three draft documents produced: Privacy Policy, Terms of Service, Refund Policy.
- File: `docs/basscally-legal-document-drafts.md`
- Status: needs UK solicitor review before publication.
- Key items resolved: LS as MoR, self-serve portal for billing, cookieless analytics (no banner), address on request not published, governing law England & Wales.
- Outstanding: solicitor review of 18 flagged items (listed in the draft doc).

---

## WHAT GPT SHOULD HELP WITH

When I continue this project in this GPT session, you should:

1. **Track the autopilot state** — always ask "what step is BH-STATE.json showing?" before suggesting work.
2. **Generate new docs** — if a build step needs a doc that doesn't exist (e.g. BH-06 style page spec), help draft it.
3. **Update existing docs** — when decisions change, flag which docs need updating.
4. **Generate Codex/Cursor prompts** — for each BH step, help write the exact prompt that goes into NEXT-AGENT-PROMPT.md if the controller needs updating.
5. **Resolve open decisions** — when Michael makes a call on D1–D9, document it and flag which steps are now unblocked.
6. **Audit and audit prompts** — help write prompt language for UI sim tests, responsive checks, motion fixes.
7. **Never re-open locked decisions** — the list above is final. Don't suggest alternatives.

---

## HOW TO CONTINUE IN THIS SESSION

Tell me:
1. What step is `docs/AUTO-REPORTS/BH-STATE.json` currently showing?
2. Is there anything about the current state I should know that isn't in these docs?

Then tell me what you need — a prompt, a doc, a decision, a fix — and we go.
