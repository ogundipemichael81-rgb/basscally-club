# Basscally mobile responsive quality gate

**Status:** Official QA gate for layout, touch, and collision prevention  
**Companion docs:** `docs/motion-audit-rules.md`, `docs/visual-depth-quality-gate.md`  
**Last updated:** 2026-05-17 (navigation and CTA ownership)  
**Source audits:** Phase A responsive deep audit (`scripts/responsive-audit.mjs`), motion QA (`scripts/motion-qa.mjs`), legal content audit (`scripts/legal-audit.mjs`)

Convert every selling-path screen from “desktop shrunk” to **intentionally mobile** before Phase B backend work.

---

## Phase A sign-off record

| Field | Value |
| --- | --- |
| **Responsive deep audit completed** | **2026-05-17** |
| **Routes tested** | Selling path + legal: `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled`, `/terms`, `/privacy`, `/refund-policy` |
| **Required breakpoints** | 320, 375, 390, 768, 1024, 1280 |
| **Stress breakpoints** | 280, 1440+ |
| **P0 result** | **PASS** — 72/72 automated rows (Collision, Motion, Touch, Depth columns) |
| **Build** | `npm run typecheck`, `npm run lint`, `npm run build` — PASS |

### Resolved P1 (2026-05-17)

- **Legal footer placeholders** — Marketing footer links to `/terms`, `/privacy`, `/refund-policy`; Contact → `mailto:basscally.enquiry@gmail.com`; login footer links to `/privacy`, `/terms`.

### Remaining P1 (non-blocking)

- **Manual focus walkthrough** — Tab through nav, FAQ, login, and legal pages on a real device.
- **Landing hero CTA at 375×667** — Automated check passed; optional one device confirmation.
- **Solicitor review** of public legal copy (`docs/legal-public-content-draft.md`).
- **Depth on `/auth/login`** — Shell atmosphere only; no panel cards (documented exception).

---

## Navigation and CTA ownership

These rules apply to every Phase A route and are enforced before phase sign-off.

1. **`MarketingNav` owns top navigation** on public marketing pages (`MarketingShell` / `(marketing)` layout).
2. **Page components must not render their own top-right nav actions** under `MarketingNav` — no page-level Sign in + Join / Continue rows that mirror the nav cluster.
3. **Pricing cards own plan-specific CTAs** — each plan card contains its checkout/selection action; `/pricing` does not add a second top action bar.
4. **Checkout pages use checkout-specific CTAs only** — route-aware nav (support + Home); primary recovery CTAs live in the checkout hero/card, not duplicated in nav.
5. **Legal pages stay calm and readable** — nav shows Sign in only (no Join); document body uses footer contact and related legal links, not conversion banners.
6. **Mobile sticky CTAs must not duplicate visible primary CTAs** in a confusing way — when a bottom sticky bar is present, hide or defer competing hero/nav Join buttons on the same viewport (landing: hero Join ≥`lg`, sticky owns &lt;`lg`).
7. **A duplicate CTA audit is required before every phase sign-off** — run `node scripts/cta-nav-qa.mjs` at widths 320, 375, 390, 768, 1024, 1280, 1440 on all selling-path and legal routes; must be **PASS** with `typecheck`, `lint`, and `build`.

**CTA audit signed off:** 2026-05-17 — 63/63 route×width rows PASS (`scripts/cta-nav-qa.mjs`).

---

## 1. Required breakpoints

Test every Phase A route at these viewport widths (height ≥ 800px unless noted):

| Width | Role |
| --- | --- |
| **320px** | Minimum supported phone |
| **375px** | Primary mobile design target (design system default) |
| **390px** | Common iPhone width; reduced-motion spot check |
| **768px** | Tablet / `md` boundary |
| **1024px** | Desktop / `lg` boundary |
| **1280px** | Wide desktop |

### Stress widths (must not break)

| Width | Role |
| --- | --- |
| **280px** | Ultra-narrow stress — no horizontal scroll; critical CTAs still reachable or gracefully stacked |
| **1440px+** | Large desktop — max-width container centered; no orphaned whitespace breaking rhythm |

---

## 2. P0 collision checks (layout)

**FAIL if any decorative or structural element visually overlaps or clips:**

| Target | Check |
| --- | --- |
| **Nav** (`header`, sticky marketing nav) | No card, glow, orbit, or wave under nav links |
| **Headings** (`h1`–`h3`) | Readable full width; no spin bleed from vinyl/orbit |
| **CTAs** (primary/secondary buttons, `ButtonLink`) | Fully visible; not covered by sticky bars or decoration |
| **Inputs** (`input`, `textarea`, labels) | Login form fields clear; focus ring visible |

**CSS contract (collision prevention):**

```css
/* Page */
html, body { overflow-x: hidden; }

/* Decorative animation */
.decorative-motion {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  pointer-events: none;
}

/* Spin / orbit containers */
.pricing-orbit-wrap,
.checkout-vinyl-wrap,
.callback-vinyl-wrap {
  overflow: hidden;
  flex-shrink: 0;
}

/* Readable content above decoration in same card */
.basscally-panel-content,
.content-above-deco { position: relative; z-index: 1; }
/* Headings beside decoration may use z-index: 2 */
```

Animated rings/vinyl may expand **transform bounding boxes**; clipping parents must separate decoration from sibling headings (see motion doc §2).

---

## 3. P0 motion checks

Run automated motion QA:

```bash
npm run dev
node scripts/motion-qa.mjs
```

**FAIL if:**

- Horizontal scroll at any required width
- Orbit dot outside ring (desktop) or visible when rotator hidden (mobile)
- Decorative overlap with nav / headings / CTAs / inputs (unclipped)
- Mobile CTA bar overlapped or untappable when visible (`lg:hidden` bar only)
- `prefers-reduced-motion: reduce` still runs continuous loops

Full rules: `docs/motion-audit-rules.md`.

---

## 4. Landing-specific checks (`/`)

| Check | PASS criteria |
| --- | --- |
| Hero headline | Scales via mobile type rules; no clipping at 320px |
| Hero stats row | Fits 375px without overlap; readable mono labels |
| Drop preview cards | Stack or scroll cleanly; play affordance not cut off |
| Sticky mobile CTA | Visible ≤1023px; hidden ≥1024px; full-width button ≥44px tall; does not duplicate visible hero Join (hero Join hidden &lt;`lg`) |
| Live status dot | Contained in overflow box; pulse does not expand into nav |
| Section rhythm | `--space-8` between sections on mobile |
| FAQ / footer | Links tappable; no horizontal overflow |

---

## 5. Touch and interaction checks

- Minimum touch target **44×44px** for all primary actions on mobile
- `ButtonLink` / buttons: `min-h-11` preserved on full-width mobile CTAs
- No `pointer-events: none` on interactive elements (only on decorative layers)
- Focus visible on tab through nav, CTAs, inputs, FAQ triggers
- Sticky nav + sticky bottom CTA: content has enough bottom padding (`pb-16` or equivalent) so last section is not hidden behind CTA bar

---

## 6. Per-screen sign-off table

**Signed off:** 2026-05-17 (automated responsive + motion + legal QA). Re-run after any selling-path, legal layout, depth, or motion change.

| Screen | Route | Collision | Motion | Touch | Depth | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Landing hero + full | `/` | PASS | PASS | PASS | PASS | PASS |
| Pricing | `/pricing` | PASS | PASS | PASS | PASS | PASS |
| Auth login | `/auth/login` | PASS | PASS | PASS | PASS | PASS |
| Auth callback | `/auth/callback` | PASS | PASS | PASS | PASS | PASS |
| Checkout success | `/checkout/success` | PASS | PASS | PASS | PASS | PASS |
| Checkout cancelled | `/checkout/cancelled` | PASS | PASS | PASS | PASS | PASS |
| Terms of Service | `/terms` | PASS | PASS | PASS | PASS | PASS |
| Privacy Policy | `/privacy` | PASS | PASS | PASS | PASS | PASS |
| Refund Policy | `/refund-policy` | PASS | PASS | PASS | PASS | PASS |

**Gate rule:** All Phase A and legal rows must be **PASS** on Collision, Motion, and Touch before Phase B payment integration. Depth follows `docs/visual-depth-quality-gate.md`.

---

## 6b. Rules for every new screen

Before any new route or major UI surface merges:

1. **Visual depth check** — `docs/visual-depth-quality-gate.md`
2. **Responsive collision check** — This document §2–§5 + `node scripts/responsive-audit.mjs`
3. **Motion containment check** — `docs/motion-audit-rules.md` + `node scripts/motion-qa.mjs`
4. **Touch target check** — §5; buttons/inputs ≥44px / 16px body font on mobile
5. **Duplicate CTA audit** — Navigation and CTA ownership (above) + `node scripts/cta-nav-qa.mjs`

**Backend phase rule:** Do **not** start Phase B while any **selling-path** route has a **P0** fail on visual depth, responsive layout, motion, touch, or duplicate CTAs.

---

## 7. Automated + manual workflow

1. Start dev server: `npm run dev`
2. Run `node scripts/cta-nav-qa.mjs` (navigation + duplicate CTA audit at 320–1440)
3. Run `node scripts/responsive-audit.mjs` (selling path + `/terms`, `/privacy`, `/refund-policy`)
4. Run `node scripts/legal-audit.mjs` (content, footer links, forbidden providers)
5. Run `node scripts/motion-qa.mjs` (motion regression at 375, 390, 768, 1024, 1280, 1440)
6. Manually spot-check landing items in §4 if copy or layout changed
7. Record results in §6 table (store in PR description or QA ticket)

---

## 8. What fails the gate

- Horizontal scroll at any required or stress width
- Primary CTA requires scroll on 375px to tap (unless explicitly designed below fold with duplicate sticky CTA)
- Body text &lt;16px on mobile
- Decorative motion touching readable content without clipping/z-index fix
- More than ~10% visible brand orange on screen (60-30-10 violation)
- Mobile CTA shown on desktop breakpoint without usable layout purpose
- Duplicate top-right CTA cluster (nav + page-level Sign in / Join / Continue on the same route)
- Mobile sticky Join visible at the same time as hero Join on the same viewport

---

## References

- `docs/basscally-build-pack/03_DESIGN_MD/04_basscally_design_system.md` — §8 breakpoints, §13 accessibility
- `docs/motion-audit-rules.md` — motion containment linked to responsive collisions
- `docs/visual-depth-quality-gate.md` — atmosphere and card depth
- `docs/legal-pages-build-plan.md` — legal routes implementation record  
- `scripts/legal-audit.mjs` — legal content and footer smoke tests  
- `scripts/cta-nav-qa.mjs` — headless navigation and duplicate CTA audit
- `scripts/responsive-audit.mjs` — headless responsive deep audit (selling path + legal)
- `scripts/motion-qa.mjs` — headless motion/collision regression
