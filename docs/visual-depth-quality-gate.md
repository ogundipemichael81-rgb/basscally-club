# Basscally visual depth quality gate

**Status:** Addendum to the locked design system  
**Parent doc:** `docs/basscally-build-pack/03_DESIGN_MD/04_basscally_design_system.md` (v1.0 — do not replace)  
**Applies to:** Phase A selling-path React screens and all future production UI  
**Last updated:** 2026-05-18 (landing scroll performance — static atmosphere)

This document defines **how Basscally achieves depth on dark surfaces**. It extends §2 (color), §6 (shadows), and §9 (components). If this addendum conflicts with the locked system on tokens or the 60-30-10 rule, **the design system wins**.

---

## Phase A sign-off record

| Field | Value |
| --- | --- |
| **Visual depth pass completed** | **2026-05-17** |
| **Homepage motion + depth** | **2026-05-17** — `.landing-*` motion layered on existing depth cards (see `docs/motion-audit-rules.md` §6) |
| **Landing scroll performance** | **2026-05-18** — static body atmosphere; no fixed SVG noise on mobile; depth unchanged (see `docs/motion-audit-rules.md` §14) |
| **Routes tested** | Public set: `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled`, `/terms`, `/privacy`, `/refund-policy`, `/account/cancel` |
| **Breakpoints spot-checked** | 320, 375, 390, 768, 1024, 1280, 1440; stress 280, 1440+ |
| **P0 result** | **PASS** — `scripts/public-route-audit.mjs` 70/70 |
| **Legal pages** | Calmer than landing — `.basscally-legal-page`, section `.basscally-depth-card`, no decorative motion; max-width prose column |
| **Cancel info page** | `/account/cancel` — `Card` + `.basscally-depth-card` pattern; no cinematic motion; honest disabled portal |
| **Implementation** | `src/app/globals.css` (atmosphere, depth cards, landing motion); `src/components/legal/*`, `src/components/account/account-cancel-content.tsx` |

### Resolved P1 (2026-05-17)

- **Legal footer placeholders** — `/terms`, `/privacy`, `/refund-policy`; Contact `basscally.enquiry@gmail.com`.
- **Public dev-language cleanup** — Product-facing copy on public routes; no placeholder/MVP/webhook UI strings.
- **Homepage subtle motion pass** — Premium, slow, contained motion on `/` only.
- **Landing scroll performance** — Static full-page atmosphere; mobile non-fixed pseudo layers; premium depth retained.

### Remaining P1 (non-blocking)

- **Manual squint test** on `/pricing` at desktop — confirm plan-card hover glow stays within 60-30-10 (automated checks passed).
- **`/auth/login`** — no `.basscally-depth-card` on form shell by design; uses page atmosphere only (acceptable).
- **Solicitor review** of public legal copy before treating as launch-final.

### Navigation and CTA ownership (2026-05-17)

1. **`MarketingNav` owns top navigation** on public marketing pages (`(marketing)` layout: `/`, `/pricing`, `/checkout/*`, legal routes).
2. **Page components must not render their own top-right nav actions** under `MarketingNav` (no duplicate Sign in / Join / Continue rows at page level).
3. **Pricing cards own plan-specific CTAs** — conversion lives inside each plan card, not in a second header row.
4. **Checkout pages use checkout-specific CTAs only** — nav shows support/navigation labels (e.g. Need help?, Home); hero/card owns recovery actions.
5. **Legal pages stay calm and readable** — nav: Sign in only (no Join); body has contact/footer links, not aggressive conversion blocks.
6. **Mobile sticky CTAs must not duplicate visible primary CTAs** in a confusing way (e.g. landing: hero Join hidden below `lg`; sticky bar owns mobile conversion).
7. **A duplicate CTA audit is required before every phase sign-off** — `node scripts/cta-nav-qa.mjs` or `node scripts/public-route-audit.mjs` (see `docs/mobile-responsive-quality-gate.md`). **Remains mandatory** for every phase.

---

## Relationship to the locked design system

| Locked system (unchanged) | This addendum (production depth) |
| --- | --- |
| Token names and hex values in `:root` | How to **layer** those tokens with gradients and pseudo-elements |
| 60% bg / 30% surface+text / 10% brand max | How to add **atmosphere** without increasing visible orange area |
| Card anatomy (surface + border + radius) | `.basscally-panel-card` gradient stack and `::before` wash |
| `--shadow-brand-glow` on primary CTA hover only | Where glow is allowed vs forbidden |
| Typography, spacing, breakpoints | No changes |

Implement depth with **existing CSS variables**. Do not introduce new brand hex values or a second orange.

---

## 1. Body atmosphere rules

Page shells (`html`, `body`, route wrappers) use `--color-bg` as the base. Atmosphere is added with **static pseudo-layers**, never by painting the whole page brand-orange.

**Allowed on marketing / pricing / checkout shells:**

- One or two **low-opacity radial gradients** (brand at ≤0.16 peak alpha, fading to transparent by 30–42% radius).
- Optional **grid texture** via `linear-gradient` lines at ~1.5–2% white alpha, `background-size: 64px`, masked with `radial-gradient` so edges fade out.
- Layers use `pointer-events: none` and sit **behind** content (`z-index: 0` with `.basscally-app-content` above).

**Scroll performance rules (P0 on `/`):**

- **No full-page continuous background animation** — atmosphere is static only.
- **No fixed SVG noise on mobile** — do not use `feTurbulence` data-URI on fixed `body::after`; grid-only texture. On ≤767px, atmosphere pseudo layers should not be `position: fixed` (reduces scroll repaint).
- **Do not** use `overflow-x: hidden` on `html`/`body` — breaks sticky nav; clip on `main` instead (`overflow-x: clip`).

**Rules:**

- Atmosphere must not reduce text contrast below WCAG AA on `--color-text` / `--color-bg`.
- No animated full-page gradients or drifting full-viewport glows.
- Long page wrappers (e.g. `.basscally-pricing-page`) may use route-scoped overflow rules without affecting `MarketingNav` sticky behavior.

**Reference in repo:** `body::before/::after`, `.basscally-app-content`, `.basscally-hero::before/::after`, `.basscally-pricing-page`, `.basscally-checkout-shell`, `.auth-page-shell`, `.basscally-callback-page`.

---

## 2. Card depth rules

Production cards use **border + gradient fill + inner light wash**, not heavy drop shadows at rest.

**Pattern (`.basscally-panel-card`, `.basscally-depth-card`, and equivalents):**

```
position: relative;
overflow: hidden;
background: linear-gradient(180deg, rgba(28,28,31,0.93), rgba(13,13,15,0.94));
border: 1px solid var(--color-border);
border-radius: var(--radius-xl);
```

**Inner wash (`::before` on card):**

- `position: absolute; inset: -1px; pointer-events: none; border-radius: inherit`
- Radial highlights: brand at **≤0.2** alpha top-left, secondary warm at **≤0.1** bottom-right
- Content wrapper: `relative z-[1]` so copy and CTAs sit above the wash

**Interactive cards:**

- Rest: border only (per design system §6)
- Hover: `--shadow-md`, `translateY(-2px)` or `-translate-y-1`, border toward brand at low alpha
- Always pair hover lift with `motion-reduce:hover:translate-y-0`

**Do not:** stack multiple competing card glows on one screen; one focal card may be stronger (e.g. highlighted plan).

---

## 3. Brand glow rules

Glow is **accent**, not atmosphere.

| Allowed | Forbidden |
| --- | --- |
| `--shadow-brand-glow` on **primary CTA hover** | Glow on body text, headings, or paragraphs |
| Small dot pulses (`hero-live-dot`, checkout eyebrow dot) inside clipped boxes | Full-card orange halos behind readable copy |
| Orbit core / vinyl decorative centers (aria-hidden) | Extra `%` of screen filled with brand color |
| Status dots with tight `box-shadow` (≤18px spread) | Gamer-style neon borders on every card |

**60-30-10 check:** If glow makes the screen feel >10% orange, reduce alpha or scope.

---

## 4. Gradient progress / scrub fill rules

For audio scrub bars and checkout “meter” style bars (Phase A checkout, future player):

- **Track:** `--color-border` or `--color-border-strong`, fixed height (4px scrub per design system §9.5; meter bars ~8–12px in decorative blocks).
- **Fill:** `linear-gradient` or solid `--color-brand` / `rgba(255,69,0,0.22–0.65)` — fill animates **width or height only**, not position across unrelated content.
- Container: `overflow: hidden`, fixed height, `aria-hidden` when decorative.
- Decorative meters must not overlap headings or CTAs (same containment as motion — see `docs/motion-audit-rules.md`).

---

## 5. Mobile depth boost rules (≤768px, stress at 320–390px)

Mobile should feel **intentional**, not flat, without adding motion or orange.

- Slightly **stronger card gradient contrast** (same hues, higher opacity delta between top/bottom stops) is OK.
- Borders may use `--color-border-strong` on primary cards for separation.
- Hero/pricing atmosphere radials may be **smaller radius** so they do not bleed under nav or sticky CTA.
- Reduce decorative element count on narrow widths (e.g. hide orbit dot rotator ≤680px — already in motion rules).
- Section padding: use `--space-8` between sections; side padding ≥ `--space-5` (24px), never <16px on 320px unless stress-test documents an exception.

---

## 6. Color token adjustment rules

**Do not change locked token hex values** in `04_basscally_design_system.md` without a formal design-system version bump.

**Allowed in implementation (globals / components):**

- `rgba()` mixes using existing tokens (e.g. `rgba(255, 69, 0, 0.16)` on `--color-bg`)
- Gradient stops between `--color-surface` and `--color-surface-sunken`
- Opacity on decorative layers only

**Forbidden:**

- New primary brand hex
- Orange used for non-CTA backgrounds at large area
- Replacing `--color-surface` cards with flat `#1a1a1a` off-palette grays
- Light mode or alternate brand colors in Phase A

---

## 7. What not to change

- Locked typography scale and font stacks
- Button variants (primary / secondary / ghost) and label rules
- 60-30-10 orange budget
- Semantic colors (success / warning / danger) usage tables
- Spacing scale (8px base only)
- Border radius tokens per component type
- Accessibility minimums (contrast, focus ring, 44px touch targets)
- Motion containment and reduced-motion contracts (`docs/motion-audit-rules.md`)

---

## 8. Sign-off checklist (visual depth)

Before merging depth work on any route:

- [ ] Page background is `--color-bg` with atmosphere as pseudo-layers only
- [ ] Cards use gradient + `::before` wash; content at `z-[1]` or higher (`.basscally-panel-content` where needed)
- [ ] Brand glow only on CTAs / small decorative dots — not on readable text
- [ ] 60-30-10 visually holds (squint test: screen is dark, not orange)
- [ ] No new hex tokens; only `var(--color-*)` and rgba derivatives
- [ ] Mobile 375px: depth readable, no clipped headings, no horizontal scroll
- [ ] Passes `docs/mobile-responsive-quality-gate.md` P0 layout checks
- [ ] **Landing scroll smoothness** at 375px and 390px if route is `/` (`scripts/home-scroll-qa.mjs`)
- [ ] After motion/depth/atmosphere change: run `scroll-performance-audit.mjs` or manual scroll QA (`docs/motion-audit-rules.md` §14)
- [ ] Passes navigation and CTA ownership rules (§ Phase A sign-off — Navigation and CTA ownership)

**Routes (signed off 2026-05-17):** `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled`, `/terms`, `/privacy`, `/refund-policy`, `/account/cancel` (info page).

---

## 9. Rules for every new screen

Before any new route or major UI surface merges:

1. **Visual depth check** — This document §8 checklist; use `.basscally-depth-card` or `.basscally-panel-card` for elevated surfaces.
2. **Responsive collision check** — `docs/mobile-responsive-quality-gate.md` + `node scripts/responsive-audit.mjs`.
3. **Motion containment check** — `docs/motion-audit-rules.md` + `node scripts/motion-qa.mjs`.
4. **Landing scroll performance** — `docs/motion-audit-rules.md` §14 + `node scripts/home-scroll-qa.mjs` (when `/` or global atmosphere changes).
5. **Touch target check** — Primary actions ≥44×44px; inputs ≥16px font-size on mobile.
6. **Duplicate CTA audit** — Navigation and CTA ownership rules (Phase A sign-off above) + `node scripts/cta-nav-qa.mjs` or `node scripts/public-route-audit.mjs`.

**Backend phase rule:** Do **not** start Phase B until **all public-route P0 items pass**. **P0 cleared** 2026-05-17. Duplicate CTA audit **remains required** before every phase sign-off. P1 items may ship with documented follow-up.

---

## References

- `src/app/globals.css` — atmosphere, `.basscally-depth-card`, `.basscally-panel-card`, fills, mobile boost
- `src/components/ui/card.tsx` — default `Card` uses `.basscally-depth-card`
- `docs/motion-audit-rules.md` — decorative overlap and glow motion
- `docs/mobile-responsive-quality-gate.md` — breakpoint QA
- `docs/legal-pages-build-plan.md` — legal pages implementation
- `scripts/responsive-audit.mjs` — automated responsive gate (selling path + legal)
- `scripts/cta-nav-qa.mjs` — duplicate navigation and CTA audit (public routes)
- `scripts/public-route-audit.mjs` — combined public-route gate
- `scripts/legal-audit.mjs` — legal content smoke tests
- `scripts/home-scroll-qa.mjs` — landing scroll smoothness regression
- `scripts/scroll-performance-audit.mjs` — public-route scroll/motion performance
- `src/components/marketing/landing-hero.tsx`, `landing-sections.tsx`, `landing-motion-gate.tsx` — homepage depth + motion
