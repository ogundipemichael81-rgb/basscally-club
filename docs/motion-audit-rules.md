# Basscally motion audit rules (Phase A)

Practical rules for decorative and UI motion on public selling-path screens. Apply these before adding new animation to any screen.

**Last updated:** 2026-05-17 (homepage subtle motion pass + public route audit)

---

## Phase A sign-off record

| Field | Value |
| --- | --- |
| **Motion stabilization pass completed** | **2026-05-17** |
| **Homepage subtle motion pass completed** | **2026-05-17** — `.landing-*` classes on `/` only (§6) |
| **Routes tested (selling path)** | `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled` |
| **Public route audit** | `scripts/public-route-audit.mjs` — 70/70 PASS incl. `/` motion-alive check at 320–1440 |
| **Breakpoints (automated)** | 320, 375, 390, 768, 1024, 1280, 1440 (`motion-qa.mjs`: 375–1440; public audit: full set) |
| **Breakpoints (responsive gate)** | Also 280 (stress), 1440+ via `scripts/responsive-audit.mjs` |
| **P0 result** | **PASS** — 36/36 (`node scripts/motion-qa.mjs`); homepage motion verified in public route audit |

### Remaining P1 (non-blocking)

- Re-run motion QA and `public-route-audit.mjs` after any change to `globals.css` motion section or decorative markup on selling-path or `/` landing markup.
- Manual `prefers-reduced-motion` spot check on `/auth/callback` scanline when editing callback CSS.

---

## 1. Allowed motion types

| Type | Use | Duration / notes |
| --- | --- | --- |
| **Entrance (one-shot)** | Page sections, cards | `fade-rise` — **600ms**, `var(--ease-out)`, optional stagger (80–240ms). Use `MotionDiv`, `.basscally-rise-in`, or `.checkout-rise`. |
| **Hover / focus** | Buttons, cards, links | CSS `transition` only (`--motion-fast` / `--motion-default`). Pair with `motion-reduce:hover:translate-y-0` where hover lifts. |
| **Slow rotate** | Vinyl, orbit rings | 8–20s linear infinite, inside a clipped wrapper. |
| **Pulse / breathe** | Status dots, accent dots | 1.4–2.4s ease, small scale or opacity only. |
| **Bar wave** | EQ-style bars | Height 12px → 42px, 1.1s (pricing); **landing** uses `.landing-wave` at 2.4s, 8–30px. |
| **Scanline / rail shimmer** | Callback stage; landing founding panel | Callback: 4s scan on card. Landing: `.landing-rail-shimmer` 6s on decorative rails only. |
| **Landing entrance** | Home `/` only | `.landing-rise` — 700ms `fade-rise`, delays `.landing-rise-delay-1` … `-6`. |
| **Landing hover** | Home cards / CTAs | `.landing-interactive-card`, `.landing-cta-glow` — CSS transition only. |

**Not allowed on marketing/auth/checkout shells:** parallax, full-page drift, bounce loops, simultaneous unrelated infinite loops on one card, or JS-driven continuous motion.

---

## 2. Motion containment rules

Every **decorative** animated layer must use `.decorative-motion` (or an equivalent scoped wrapper):

```css
position: relative;
isolation: isolate;
overflow: hidden;
pointer-events: none;
```

Additional rules:

- Parent cards use `overflow-hidden` (e.g. `.basscally-panel-card`, `.callback-stage-card`).
- Spinning elements live **inside** a fixed-size box (`pricing-orbit-wrap`, `checkout-vinyl-wrap`, `callback-vinyl-wrap`) so rotation does not expand layout or overlap siblings.
- Page shells use `overflow-x: hidden` on `html`, `body`, and long marketing pages.
- Decorative markup is `aria-hidden` where it is purely visual.
- Animated layers must not sit above nav, headings, CTAs, or inputs without an explicit higher z-index on content (see §8).

---

## 3. Orbit rules (pricing)

- **Desktop (>680px):** `--orbit-size: 230px`. Rings use `absolute inset-*`; dot rides on `.pricing-orbit-rotator` at `top: 7px`, centered with `left: 50%` + negative margin. Rotator and ring-3 share **8s** spin so dot stays on ring.
- **Mobile (≤680px):** `--orbit-size: 185px`. **Hide** `.pricing-orbit-rotator` (`display: none`) — no orbital dot on small screens; rings may still spin.
- Wrap must have `overflow: hidden`, `margin-bottom` before the next heading, and `flex-shrink: 0`.
- Text below the orbit (`h3`, body) uses `relative z-[2]` so copy stays above any bleed.

---

## 4. Wave rules (pricing & callback)

- Waves live in a **fixed-height** container (`h-10` / `h-11`) with `overflow: hidden` and `.decorative-motion`.
- Bars animate **height and opacity only** — not width, not `translateX`.
- Stagger delays in 0.1s steps; max ~7 bars per group.
- Waves sit **below** headings and CTAs in the DOM, never overlapping primary actions.
- On callback mobile (≤680px), bar animation may stay; ensure the wave block does not cover `.callback-stage-status` content.

---

## 5. Glow and scanline rules

**Glow**

- Radial/brand glows belong on `::before` / pseudo-elements or static gradients with `pointer-events: none` and low z-index (`z-0`).
- Do not put heavy `box-shadow` glow on elements that overlap body text; keep glow inside decorative bounds.
- Hero live dot: 6px core inside a small overflow-hidden box; pulse on `::after` only.

**Scanline**

- Only on `.callback-stage-card::after`, `z-index: 1`, **hidden at ≤680px**.
- Must not cross `.callback-stage-status` (status strip at `z-index: 10`).
- Never place scanlines on forms, login, pricing plan cards, or checkout pass text.

---

## 6. Landing home rules (`/`)

Scoped to `.basscally-landing-hero` and `.landing-*` classes in `globals.css` — **do not reuse on legal or other routes**.

| Element | Rule |
| --- | --- |
| **Hero glow** | `.basscally-landing-hero::before` only — 22s drift (`landing-hero-glow-drift`), transform/scale on pseudo only. |
| **Drops visual** | `.landing-drops-stage` — wave (`.landing-wave`, 5 bars, `h-9`) + vinyl breathe (`.landing-vinyl-pulse-ring`, 7s). No orbit dot. |
| **Rail shimmer** | `.landing-rail-shimmer` on drops stage + founding panel top edge only; `overflow: hidden`, `aria-hidden`. |
| **Entrance** | `.landing-rise` on hero columns, section blocks, staggered cards — opacity + `translateY` only, no width/height layout animation. |
| **Cards** | `.landing-interactive-card` — hover lift `-2px`, brand border glow; `motion-reduce:hover:translate-y-0`. |
| **CTAs** | `.landing-cta-glow` on primary `ButtonLink` instances + mobile sticky bar. |

**Mobile / tablet (&lt;1024px):** vinyl ring breathe **off** (static ring). Drops-stage rail shimmer **hidden** (`max-lg:hidden`) so deco does not overlap sticky CTA at 768px. Keep wave + live dot. Hero uses `min-h-0` below `lg` and `pb-28` for CTA clearance.

**Not allowed on `/`:** pricing orbit, callback scanline, fast (&lt;1.5s) loops, continuous text motion, bounce.

---

## 7. Mobile motion rules (≤680px)

- **Pricing:** no orbit dot (rotator hidden); smaller orbit size (185px).
- **Callback:** no vinyl float, no scanline, static accent dots (no breathe loop).
- **Checkout success:** vinyl spin allowed but slower (**20s** vs 12s desktop).
- **Landing:** see §6; sticky mobile CTA bar (`z-40`, `lg:hidden`); test at 375px and 390px.
- Limit concurrent loops per viewport: prefer one hero motion + one card motion, not three competing loops on one screen.
- CTAs: full-width on small breakpoints; min tap target **44×40px** (buttons already use `min-h-11`).

---

## 8. Reduced-motion rules

**Global** (`prefers-reduced-motion: reduce` in `globals.css`):

- Collapse animation/transition duration to `0.01ms`, single iteration, `scroll-behavior: auto`.

**Explicit off** for continuous loops:

- Orbit rotator/rings, callback vinyl/float/accent/bars, pricing wave, checkout vinyl spin, hero pulse, callback scanline, callback status dot pulse, **landing** hero glow drift, `.landing-wave span`, `.landing-vinyl-pulse-ring`, `.landing-rail-shimmer::before`.

**Still allowed under reduce (brief, non-looping):**

- One-shot entrances are effectively instant due to global rule.
- Hover transitions are disabled via `motion-reduce:*` on components.

**Implementation pattern:** wrap infinite animations in `@media (prefers-reduced-motion: no-preference)`; duplicate kill list in `@media (prefers-reduced-motion: reduce)` with `animation: none !important`.

---

## 9. z-index rules

| Layer | z-index |
| --- | --- |
| Decorative / stage background (`::before`, `.callback-stage-deco`) | `0` |
| Scanline (`::after` on callback card) | `1` |
| Card content wrapper | `1` |
| Orbit core / inline decorative | `1` |
| Headings beside decoration | `2` |
| Callback status strip | `10` |
| Mobile CTA bar | `40` |
| Marketing nav / dialogs | `50` / `100` (toasts) |

Rule: **content that must be read or clicked always stacks above decorative motion** in the same card.

---

## 10. What to avoid in future screens

- Animated elements overlapping **nav**, **h1–h3**, **CTAs**, or **inputs** (even if `pointer-events: none` — visual overlap fails QA).
- Orbit dots with transform-origin hacks outside the ring container.
- Multiple infinite animations on one card (callback pre-fix pattern).
- Scanlines or sweeping gradients over readable text.
- Waves or glows that extend outside `overflow: hidden` parents (causes horizontal scroll or false collisions).
- Different entrance timings per screen (stick to **600ms** `fade-rise`).
- Decorative motion without `aria-hidden` on non-informative visuals.
- Hiding mobile CTA in DOM but leaving zero-size links that fail tap-target checks.
- Adding motion only in Tailwind arbitrary classes without a `prefers-reduced-motion` path.

---

## 11. Checklist before accepting new motion

Run with dev server (`npm run dev`) and automated QA:

```bash
node scripts/motion-qa.mjs
```

Manual pass if you change motion CSS or decorative markup:

- [ ] Decorative block uses `.decorative-motion` + fixed size + `overflow: hidden`
- [ ] No overlap with nav, headings, CTAs, inputs at **375, 390, 768, 1024, 1280, 1440px**
- [ ] Orbit dot stays inside ring (desktop only); hidden on mobile
- [ ] Rings centered in orbit wrap
- [ ] No horizontal scroll (`document.documentElement.scrollWidth` vs viewport)
- [ ] Glow/scanline does not cover readable text
- [ ] Wave contained in its box; does not grow into content above
- [ ] Mobile CTA readable and tappable where shown
- [ ] `prefers-reduced-motion: reduce` disables all continuous loops
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` pass

**Selling-path routes to regression-test:** `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled`.

---

## 12. Motion containment and responsive layout

Motion failures are often **responsive failures**: a spinning ring or vinyl expands its bounding box and overlaps a heading on mobile even when desktop looks fine.

**Shared contract with** `docs/mobile-responsive-quality-gate.md`:

- Use `.decorative-motion` and fixed-size wrappers (`pricing-orbit-wrap`, `checkout-vinyl-wrap`, `callback-vinyl-wrap`) with `overflow: hidden`.
- Keep headings, CTAs, and inputs in a sibling layer at `relative z-[2]` (or higher) when decoration sits in the same card.
- Test motion at **375, 390, 768, 1024, 1280, 1440px**; run collision checks at **320px** and stress **280px** for horizontal scroll.
- A motion PASS at one width does not sign off the screen — all required breakpoints in the responsive gate must pass.

If motion QA passes but layout P0 fails, fix containment/z-index first, then re-run `node scripts/motion-qa.mjs`.

---

## 13. Rules for every new screen

Before any new route or major UI surface merges:

1. **Visual depth check** — `docs/visual-depth-quality-gate.md`
2. **Responsive collision check** — `docs/mobile-responsive-quality-gate.md` + `node scripts/responsive-audit.mjs`
3. **Motion containment check** — This document §2–§10 + `node scripts/motion-qa.mjs`
4. **Touch target check** — Mobile responsive gate §5

**Backend phase rule:** Do **not** start Phase B until **all public-route P0 items pass** (selling-path motion, responsive, touch, duplicate CTAs, public copy). **P0 cleared** 2026-05-17. Duplicate CTA audit remains a **required sign-off gate** before every phase (`scripts/cta-nav-qa.mjs` or `scripts/public-route-audit.mjs`).

---

## Reference

- Styles: `src/app/globals.css` (motion section; landing block under “Landing home”)
- Landing components: `src/components/marketing/landing-hero.tsx`, `landing-sections.tsx`
- Visual depth gate: `docs/visual-depth-quality-gate.md`
- Responsive gate: `docs/mobile-responsive-quality-gate.md`
- Wrapper utility: `.decorative-motion`
- Entrance component: `src/components/ui/motion.tsx` (`MotionDiv`)
- Automated QA: `scripts/motion-qa.mjs`, `scripts/responsive-audit.mjs`, `scripts/public-route-audit.mjs`
