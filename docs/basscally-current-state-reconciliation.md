# Basscally Hub — Current State Reconciliation

**Date:** 2026-05-25  
**Branch:** `visual-depth-responsive-fixes`  
**Latest commit:** `f1e9c26` — fix: optimize landing motion scroll performance  
**Purpose:** Compare the **built repo** against uploaded autopilot docs before Phase B.

---

## Executive summary

| Area | Repo truth | Autopilot docs assumption | Action |
| --- | --- | --- | --- |
| Phase A UI gates | **Complete** (depth, responsive, motion, landing scroll) | BH-20 not marked complete in controller | Patch controller state / step completion in patch plan |
| Legal routes | **`/terms`, `/privacy`, `/refund-policy`** | BH-16 metadata says `/legal/*` | Patch controller BH-16; do **not** regress routes |
| Product naming | **“Basscally Hub”** in live UI + legal source (`src/content/legal.ts`) | **“Basscally Hub”** locked | ✅ BH-01 complete |
| Content cadence copy | **Weekly** on landing/FAQ/checkout | **Weekly** locked | ✅ BH-01 complete |
| Pricing tiers | 3 visible plans in `lib/plans.ts` | Monthly $2.99, Founding $1.50 centre, Annual $18 | **Partial** — founding not visually centred; annual is `highlighted` |
| New routes | **Missing** | `/style/[slug]`, `/waitlist`, `/resources` | BH-05 / BH-06 / post-MVP |
| Phase B backend | **Schema in repo** (migrations + Drizzle; cloud apply manual) | BH-02+ | BH-03 webhooks next |
| Button audit file | **Missing from repo** | `docs/basscally-full-button-function-audit.md` | Restore from upload or derive from action-cycle audit |

---

## Repo snapshot (verified)

### Git

- Branch: `visual-depth-responsive-fixes` (4 commits ahead of origin at handoff; latest `f1e9c26`)
- Phase A scroll perf commit includes: motion gate, static atmosphere, sticky nav overflow fix, QA scripts

### Implemented routes (Next.js App Router)

| Route | Status | Notes |
| --- | --- | --- |
| `/` | **UI complete** | Landing hero + sections; scroll perf P0 PASS |
| `/pricing` | **UI complete** | 3-tier cards; CTAs stub → `/checkout/success` |
| `/auth/login` | **UI complete** | Mock magic-link (setTimeout, no Supabase) |
| `/auth/callback` | **UI complete** | Static transition UI |
| `/checkout/success` | **UI complete** | No real subscription data |
| `/checkout/cancelled` | **UI complete** | Recovery CTAs |
| `/terms` | **UI complete** | Legal shell |
| `/privacy` | **UI complete** | Legal shell |
| `/refund-policy` | **UI complete** | Legal shell |
| `/account/cancel` | **Info page** | Disabled billing portal; pre–Phase B |
| `/dashboard` | **Placeholder** | Member shell |
| `/account` | **Placeholder** | Member shell |
| `/account/billing` | **Placeholder** | Member shell |
| `/account/billing/portal` | **Placeholder** | Member shell |
| `/c/[id]` | **Placeholder** | Content detail stub |
| `/admin/*` | **Placeholder** | Admin shell + stubs |
| `/style/[slug]` | **Missing** | Required for conversion flow (BH-06) |
| `/style/makossa-tribe-fuego` | **Missing** | Seed style page |
| `/waitlist` | **Missing** | BH-05 |
| `/resources` | **Missing** | Resource Centre index (Screen 36) |

### API routes (stubs vs real)

| Route | Status |
| --- | --- |
| `POST /api/webhooks/lemonsqueezy` | Stub (`notImplementedStub`) |
| `POST /api/webhooks/resend` | Stub |
| `GET /api/content/[id]/download` | Stub |
| `GET /api/cron/*` | Stub |
| `POST /api/waitlist` | **Not present** |
| `POST /api/admin/content` | **Not present** |
| `GET /api/admin/metrics` | **Not present** |
| `POST /api/mock-auth/session` | **Not present** (UI simulator expects mock auth) |

---

## Phase A work preserved (do not regress)

### Quality gates — PASS (2026-05-17 / 2026-05-18)

| Gate | Evidence |
| --- | --- |
| Visual depth | `docs/visual-depth-quality-gate.md`; public audit 70/70 |
| Responsive | `scripts/responsive-audit.mjs` 90/90 |
| Motion | `scripts/motion-qa.mjs` 36/36 |
| Landing scroll performance **(P0)** | `scripts/home-scroll-qa.mjs`; `scripts/scroll-performance-audit.mjs` |
| CTA / nav ownership | `scripts/cta-nav-qa.mjs` / public route audit |
| Legal pages | `/terms`, `/privacy`, `/refund-policy` — **not** `/legal/*` |
| Cancel info | `/account/cancel` honest policy page |
| Build tooling | typecheck / lint / build PASS at last sign-off |

### Key implementation files (Phase A)

- `src/app/globals.css` — atmosphere, depth cards, landing motion (scroll-optimized)
- `src/components/marketing/*` — landing, pricing, nav, footer
- `src/components/legal/*` — legal pages
- `src/components/marketing/landing-motion-gate.tsx` — off-screen motion pause
- `src/lib/routes.ts` — canonical paths (`legal.terms` → `/terms`, etc.)

---

## Autopilot tool pack vs repo

### Already present (untracked at reconciliation start)

| File | Location | Notes |
| --- | --- | --- |
| `basscally-autopilot-controller.py` | `scripts/` | BH-00–BH-22; BH-16 wrong legal paths |
| `basscally-ui-simulator.py` | `scripts/` | Expects `/style`, `/waitlist`; mock auth cookie |
| `basscally-responsive-audit.py` | `scripts/` | Subset of routes; no legal/style/waitlist |
| Architecture / setup / handover docs | `docs/` | Reference `/legal/*` in places |

### Missing from repo

| File | Expected by autopilot |
| --- | --- |
| `docs/basscally-full-button-function-audit.md` | Setup README, END-TO-END pack, GPT handover |
| `docs/AUTO-REPORTS/BH-STATE.json` | Created on first `bh:status` / `bh:next` |
| `package.json` `bh:*` scripts | **Added in this reconciliation** |
| `docs/AUTO-REPORTS/BH-TOOL-CONFIG.json` | **Created in this reconciliation** |

### Existing Node QA scripts (keep — not replaced by Python audits)

| Script | Role |
| --- | --- |
| `scripts/public-route-audit.mjs` | Combined public gate (70 rows) |
| `scripts/responsive-audit.mjs` | Full public responsive |
| `scripts/motion-qa.mjs` | Selling-path motion |
| `scripts/home-scroll-qa.mjs` | Landing scroll P0 |
| `scripts/scroll-performance-audit.mjs` | Public scroll regression |
| `scripts/cta-nav-qa.mjs` | Duplicate CTA |
| `scripts/legal-audit.mjs` | Legal smoke |

---

## Route conflicts (autopilot vs repo)

| Topic | Autopilot / old audit | **Repo truth (keep)** |
| --- | --- | --- |
| Terms | `/legal/terms` | **`/terms`** |
| Privacy | `/legal/privacy` | **`/privacy`** |
| Refund | `/legal/refund` or `/legal/refund-policy` | **`/refund-policy`** |
| Legal aliases | Sometimes implied | Optional **redirects later** — do not replace canonical routes |

---

## Locked decisions vs current UI (gaps)

| Decision | Locked value | Current repo |
| --- | --- | --- |
| Product name | Basscally **Hub** | “Basscally”, “Basscally Club”, “Join the Club” |
| Cadence | **Weekly** | “Every 3 days” (landing hero, FAQ, pricing copy) |
| Drop creators | Chris + world-class bassists | Chris-focused / generic copy |
| Founding plan | **$1.50/mo, centre, highlighted** | Founding exists; **annual** is `highlighted: true` in `lib/plans.ts` |
| Monthly | $2.99/mo | Correct in `lib/plans.ts` |
| Annual | $18/year | Correct in `lib/plans.ts` |
| Founding cap | 500 live from DB | Static “500” on landing |
| Nav label | Resource Centre (not Walkthrough) | Not implemented — `/resources` missing |
| Auth | Magic link only | UI mock only |
| Payment | Lemon Squeezy | No checkout URLs |
| Downloads | Stream primary, download secondary | Not wired |

---

## Missing screens (build pack 01–33 + new)

### Launch MVP UI still placeholder

Screens **04–07**, **09–10**, **06** content detail, admin lists, email tools — routes exist as placeholders only.

### New screens required by Hub strategy

| Screen | Route | BH step |
| --- | --- | --- |
| Artist/Style page | `/style/[slug]` | BH-06 |
| Makossa seed | `/style/makossa-tribe-fuego` | BH-06 |
| Waitlist | `/waitlist` | BH-05 |
| Resource Centre | `/resources` | Post-MVP / BH-16+ |

---

## P0 blockers before Phase B (backend)

1. **Autopilot reconciliation** — controller BH-16 legal paths; simulator/audit route lists; missing button audit file.
2. **BH-00 artifact** — produce `docs/AUTO-REPORTS/BH-00-REPO-SCAN.md` via `npm run bh:next` → complete.
3. **BH-01 naming pass** — Hub naming, weekly cadence, drop attribution (copy/docs; no backend).
4. **Pricing UX alignment** — founding member centre/highlight per locked decision (before LS variant wiring).
5. **Do not start** Supabase / Lemon Squeezy until BH-00 and BH-01 are complete and patch plan applied.

**Not P0 for starting BH-02 prep docs:** solicitor sign-off, WhatsApp link, style page creative from Chris.

---

## Next safe command

```powershell
npm run bh:status
```

Then (after reviewing patch plan):

```powershell
npm run bh:next
```

Read `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md` and execute **BH-00** only. Do **not** start Supabase or Lemon Squeezy.

---

## References

- `docs/launch-mvp-scope.md` — Phase A gate record
- `docs/basscally-action-cycle-audit.md` — button/function map
- `docs/basscally-autopilot-patch-plan.md` — controller + simulator patches
- `docs/GPT-PROJECT-MEMORY-HANDOVER.md` — locked decisions
- `src/lib/routes.ts` — canonical routes
