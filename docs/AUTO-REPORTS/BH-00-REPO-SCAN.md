# BH-00 — Repo Scan and Docs Truth

**Step:** BH-00  
**Date:** 2026-05-25  
**Branch:** `visual-depth-responsive-fixes`  
**Commit at scan:** `f1e9c26` — fix: optimize landing motion scroll performance  
**Scanner:** Cursor agent (BH-00 only — no backend, no BH-01 copy pass)

---

## 1. Repo scan summary

Basscally Hub autopilot tooling is **partially installed**. Phase A public UI, legal pages, visual depth, motion, responsive gates, and landing scroll performance are **complete and must be preserved**. Phase B (Supabase, Lemon Squeezy, real auth, gated APIs) is **not started**. Product naming and weekly cadence are **locked targets** but **not yet applied** in live UI copy — documented as BH-01 work, not changed in this step.

Autopilot controller references were patched for **canonical legal routes** and **correct architecture / mobile gate doc paths**. Full button audit is **present** at `docs/basscally-full-button-function-audit.md` with a canonical-route addendum.

---

## 2. Files present

### Reference HTML (33/33 screens)

All files under `docs/basscally-build-pack/01_SCREEN_HTML_ORIGINALS/` (numbered `01`–`33`):

| # | File |
| --- | --- |
| 01–33 | `01_landing_hero.html` … `33_account_billing_management.html` (full set verified) |

**Count:** 33 HTML reference screens — satisfies “33+” requirement.

### Bridge / wiring docs

| File | Role | Status |
| --- | --- | --- |
| `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/09_routes_wiring_screen_map_and_components.md` | Route ↔ screen ↔ component map | **Present** |
| `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/01_PRD_basscally_club_mvp_UPDATED_v1_1.md` | PRD v1.1 | **Present** |
| `docs/basscally-build-pack/03_DESIGN_MD/04_basscally_design_system.md` | Locked design system | **Present** |
| `docs/launch-mvp-scope.md` | Launch prioritization (overrides “all 33 before launch”) | **Present** |

### Phase A gate docs (complete)

| File |
| --- |
| `docs/visual-depth-quality-gate.md` |
| `docs/mobile-responsive-quality-gate.md` |
| `docs/motion-audit-rules.md` (§14 landing scroll P0) |
| `docs/legal-pages-build-plan.md` |

### BH-00 reconciliation docs (this pass)

| File |
| --- |
| `docs/basscally-current-state-reconciliation.md` |
| `docs/basscally-action-cycle-audit.md` |
| `docs/basscally-autopilot-patch-plan.md` |

### Autopilot tool pack

| File | Status |
| --- | --- |
| `scripts/basscally-autopilot-controller.py` | Present (BH-16/BH-19 paths patched) |
| `scripts/basscally-ui-simulator.py` | Present |
| `scripts/basscally-responsive-audit.py` | Present |
| `docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md` | Present |
| `docs/BASSCALLY-AUTOPILOT-SETUP-README.md` | Present |
| `docs/BASSCALLY-COMPLETE-SETUP-GUIDE.md` | Present |
| `docs/GPT-PROJECT-MEMORY-HANDOVER.md` | Present |
| `docs/BASSCALLY-END-TO-END-PROMPT-PACK.md` | Present |
| `docs/AUTO-REPORTS/BH-TOOL-CONFIG.json` | Present |
| `package.json` → `bh:status`, `bh:next`, `bh:complete`, `bh:check` | Present |

### Button audit

| File | Lines | Status |
| --- | --- | --- |
| `docs/basscally-full-button-function-audit.md` | 431+ | **Present** — canonical legal routes addendum added BH-00 |

### Node QA scripts (Phase A — keep)

| Script |
| --- |
| `scripts/public-route-audit.mjs` |
| `scripts/responsive-audit.mjs` |
| `scripts/motion-qa.mjs` |
| `scripts/home-scroll-qa.mjs` |
| `scripts/scroll-performance-audit.mjs` |
| `scripts/cta-nav-qa.mjs` |
| `scripts/legal-audit.mjs` |
| `scripts/console-key-warnings.mjs` |

### Implemented app routes (Next.js)

Public/marketing: `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled`, `/terms`, `/privacy`, `/refund-policy`  
Member: `/dashboard`, `/account`, `/account/billing`, `/account/billing/portal`, `/account/cancel`, `/c/[id]`  
Admin: `/admin`, `/admin/content`, `/admin/content/new`, `/admin/content/[id]`, `/admin/content/[id]/delete`, `/admin/subscribers`, `/admin/email-logs`, `/admin/email-logs/resend`, `/admin/email-templates`  
API stubs: `/api/webhooks/lemonsqueezy`, `/api/webhooks/resend`, `/api/content/[id]/download`, `/api/cron/*`

---

## 3. Files missing

| Expected by autopilot prompts | Notes |
| --- | --- |
| `docs/BASSCALLY-ARCHITECTURE.md` | Use **`docs/BASSCALLY-AUTOPILOT-ARCHITECTURE.md`** — controller prompt path fixed |
| `docs/basscally-mobile-responsive-deep-audit.md` | Use **`docs/mobile-responsive-quality-gate.md`** — controller BH-19 fixed |
| `docs/basscally-legal-document-drafts.md` | Not in repo; legal copy lives in `src/content/legal.ts` + implemented pages |
| `docs/codex-depth-color-fix-prompt.md` | Not in repo; superseded by `docs/visual-depth-quality-gate.md` PASS |
| `basscally-hero-v2.html`, `basscally-full-landing-v2.html` (names in bridge doc) | Numbered `01_*` / `02_*` originals exist instead — naming only |
| `docs/AUTO-REPORTS/BH-STATE.json` | Created on first `bh:next` / `bh:status` |
| App routes: `/waitlist`, `/style/[slug]`, `/style/makossa-tribe-fuego`, `/resources` | Required Hub routes — **not built** (BH-05, BH-06, later) |
| APIs: `/api/waitlist`, `/api/admin/*`, `/api/mock-auth/session` | Phase B / simulator prep |

---

## 4. Route truth table

| Route | Built in app | Canonical (`routes.ts`) | Autopilot / audit legacy | Action |
| --- | --- | --- | --- | --- |
| `/` | ✅ UI | ✅ | ✅ | Preserve Phase A |
| `/pricing` | ✅ UI | ✅ | ✅ | Wire LS in BH-03/07 |
| `/terms` | ✅ | ✅ | ~~`/legal/terms`~~ | **Keep `/terms`** |
| `/privacy` | ✅ | ✅ | ~~`/legal/privacy`~~ | **Keep `/privacy`** |
| `/refund-policy` | ✅ | ✅ | ~~`/legal/refund`~~ | **Keep `/refund-policy`** |
| `/auth/login` | ✅ mock auth | ✅ | ✅ | BH-04 |
| `/checkout/success` | ✅ | ✅ | ✅ | BH-03/08 |
| `/account/cancel` | ✅ info only | ✅ | ✅ | Portal BH-03 |
| `/waitlist` | ❌ | — | 🟡 NEW | BH-05 |
| `/style/[slug]` | ❌ | — | 🟡 NEW | BH-06 |
| `/style/makossa-tribe-fuego` | ❌ | — | 🟡 seed | BH-06 |
| `/resources` | ❌ | — | 🟡 Resource Centre | Post-MVP / BH-16+ |

---

## 5. Current conflicts

| ID | Conflict | Resolution |
| --- | --- | --- |
| C1 | Legal paths `/legal/*` in button audit v2.0 | **Reconciled** — addendum + footer rows updated; app unchanged |
| C2 | `BASSCALLY-ARCHITECTURE.md` vs `BASSCALLY-AUTOPILOT-ARCHITECTURE.md` | **Reconciled** — controller points to autopilot doc |
| C3 | Mobile spec filename | **Reconciled** — use `mobile-responsive-quality-gate.md` |
| C4 | Bridge doc HTML filenames vs `01_SCREEN_HTML_ORIGINALS/` | **Documented** — numbered originals are source of truth for Phase A |
| C5 | Product name “Club” in UI vs locked “Hub” | **Deferred to BH-01** — not renamed in BH-00 |
| C6 | “Every 3 days” copy vs locked **weekly** | **Deferred to BH-01** |
| C7 | Founding plan not centre-highlighted (`annual_18` highlighted in `lib/plans.ts`) | **Deferred** — product fix before BH-07 |
| C8 | Pricing CTAs → `/checkout/success` stub | **Phase B** — BH-03 |
| C9 | BH-16 step says “build legal” but legal **done** | Controller focus updated to **verify**; mark BH-16 complete after BH-01 patch plan |
| C10 | BH-20 motion/depth in controller vs Phase A PASS | **Pre-complete** — reference gate docs; do not rebuild landing motion |

---

## 6. What is resolved

- **reference HTML screens present** — 33/33 in build pack  
- **bridge doc verified** — `09_routes_wiring_screen_map_and_components.md` matches route intent; HTML naming aligned to `01_SCREEN_HTML_ORIGINALS/`  
- **button audit confirmed** — `docs/basscally-full-button-function-audit.md` on disk; canonical legal routes documented  
- **Autopilot safe references** — controller legal paths, architecture path, mobile gate path  
- **Phase A preserved** — legal, motion, scroll, responsive, CTA ownership documented in gate docs  
- **Full button audit path** — no longer missing  

---

## 7. What remains for BH-01

- Global naming: **Basscally Hub** (UI, docs, package name where appropriate)  
- Cadence: **weekly** (landing, FAQ, pricing, emails in docs)  
- Drop attribution: Chris + world-class bassists  
- **Resource Centre** label (nav) when `/resources` is built  
- Update autopilot `NEXT-AGENT-PROMPT` reference filenames if still stale after `bh:next`  
- Optional: refresh `09_routes` bridge doc HTML filenames to numbered originals (docs only)  

**BH-01 rule:** docs and copy docs first; do not start Supabase or Lemon Squeezy.

---

## 8. What must not be started yet

| Blocked until after BH-01+ patch | Step |
| --- | --- |
| Supabase schema / EU project | BH-02 |
| Lemon Squeezy webhooks / checkout URLs | BH-03 |
| Magic link auth wiring | BH-04 |
| Waitlist + landing rebuild from scratch | BH-05 (extend existing landing) |
| Style / artist conversion page | BH-06 |
| Member dashboard population | BH-09+ |
| Email automation / cron | BH-15 |

**Do not run:** `bh:complete` for BH-02+ without completing BH-01.  
**Do not modify** live app UI for naming in BH-00 (per scope).

---

## 9. Confirmation that Phase B remains blocked

Phase B (Supabase, Lemon Squeezy, subscription guards, real download API, admin APIs) remains **blocked** until:

1. BH-00 marked complete (`npm run bh:complete`)  
2. BH-01 naming pass complete  
3. Autopilot patch plan applied (simulator routes, BH-16/BH-20 status in controller state)  
4. P0 product alignment (founding centre pricing, three-tier LS variants) documented  

No Supabase or Lemon Squeezy work was started in BH-00.

---

## 10. Required BH-00 markers (controller verification)

The following strings are required in this artifact:

- **reference HTML screens present** — Section 2: 33 files in `01_SCREEN_HTML_ORIGINALS/`  
- **bridge doc verified** — Section 2 + 4: `09_routes_wiring_screen_map_and_components.md`  
- **button audit confirmed** — Section 2: `docs/basscally-full-button-function-audit.md`  
- **no contradictions** — Section 5–6: conflicts listed with resolutions; no unresolved contradiction blocks Phase A legal routes, bridge authority, or button audit path  

---

## Autopilot step count

Controller defines **23 steps**: BH-00 through BH-22 (`STEP_IDS` in `scripts/basscally-autopilot-controller.py`). Wording “0 / 23” in `bh:status` is correct.

---

## Next command

```powershell
npm run bh:complete
```

If PASS, next step is **BH-01** via `npm run bh:next` — still **no** Supabase or Lemon Squeezy.
