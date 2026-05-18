# Basscally motion audit rules (Phase A)

Practical rules for decorative and UI motion on public selling-path screens. Apply these before adding new animation to any screen.

**Last updated:** 2026-05-18 (landing scroll performance pass)

---

## Phase A sign-off record

| Field | Value |
| --- | --- |
| **Motion stabilization pass completed** | **2026-05-17** |
| **Homepage subtle motion pass completed** | **2026-05-17** — `.landing-*` classes on `/` only (§6) |
| **Landing scroll performance pass completed** | **2026-05-18** — static body atmosphere, transform-only loops, motion gate (§6, §14) |
| **Routes tested (selling path)** | `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled` |
| **Public route audit** | `scripts/public-route-audit.mjs` — 70/70 PASS incl. `/` motion-alive check at 320–1440 |
| **Landing scroll QA** | `scripts/home-scroll-qa.mjs` — 6 widths PASS; reduced-motion + CPU 4× @ 375 PASS (2026-05-18) |
| **Scroll performance audit** | `scripts/scroll-performance-audit.mjs` — 10 public routes @ 375 PASS (2026-05-18) |
| **Breakpoints (automated)** | 320, 375, 390, 768, 1024, 1280, 1440 (`motion-qa.mjs`: 375–1440; public audit: full set) |
| **Breakpoints (responsive gate)** | Also 280 (stress), 1440+ via `scripts/responsive-audit.mjs` |
| **P0 result** | **PASS** — 36/36 (`motion-qa.mjs`); homepage motion + **scroll smoothness** on `/` (§14) |

### Remaining P1 (non-blocking)

- Re-run motion QA, **scroll audits** (`home-scroll-qa.mjs`, `scroll-performance-audit.mjs`), and `public-route-audit.mjs` after any change to `globals.css` motion/atmosphere section or decorative markup on selling-path or `/` landing markup.
- Manual `prefers-reduced-motion` spot check on `/auth/callback` scanline when editing callback CSS.
- `pricing-wave` / `callback-wave` still use `height` in keyframes on non-landing routes — acceptable P1 until those routes get a scroll pass.

---

## 1. Allowed motion types

| Type | Use | Duration / notes |
| --- | --- | --- |
| **Entrance (one-shot)** | Page sections, cards | `fade-rise` — **600ms**, `var(--ease-out)`, optional stagger (80–240ms). Use `MotionDiv`, `.basscally-rise-in`, or `.checkout-rise`. |
| **Hover / focus** | Buttons, cards, links | CSS `transition` only (`--motion-fast` / `--motion-default`). Pair with `motion-reduce:hover:translate-y-0` where hover lifts. |
| **Slow rotate** | Vinyl, orbit rings | 8–20s linear infinite, inside a clipped wrapper. |
| **Pulse / breathe** | Status dots, accent dots | 1.4–2.4s ease, small scale or opacity only. |
| **Bar wave** | EQ-style bars | **Pricing/callback:** height 12px → 42px, 1.1s (legacy — do not add new height-based waves). **Landing:** `.landing-wave` at 2.4s uses **`transform: scaleY()`** only (fixed 30px bar height). |
| **Scanline / rail shimmer** | Callback stage; landing founding panel | Callback: 4s scan on card. Landing: `.landing-rail-shimmer` 6s on decorative rails only. |
| **Landing entrance** | Home `/` only | `.landing-rise` — 700ms `fade-rise`, delays `.landing-rise-delay-1` … `-6`. |
| **Landing hover** | Home cards / CTAs | `.landing-interactive-card`, `.landing-cta-glow` — CSS transition only. |

**Not allowed on marketing/auth/checkout shells:** parallax, **full-page continuous background animation**, bounce loops, simultaneous unrelated infinite loops on one card, or JS-driven continuous motion.

**Scroll performance (P0 on `/`):** Continuous motion must be **small and contained** — `transform` and `opacity` only. Do not animate `width`, `height`, `top`, `left`, `filter`, `backdrop-filter`, `box-shadow`, or `background-position` on infinite loops. See §14.

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
- **Do not** set `overflow-x: hidden` on `html` or `body` — it breaks `position: sticky` on `MarketingNav`. Clip horizontal bleed on `main` (`overflow-x: clip`) and route wrappers instead.
- Long marketing pages may use `overflow-x: hidden` on page-specific shells only when sticky nav is unaffected.
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
- **Pricing/callback (legacy):** bars may animate height — do not copy this pattern on `/`. **Landing:** `scaleY` + opacity only inside `.landing-wave-motion-root`.
- Not width, not `translateX` on bars.
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
| **Hero glow** | **Static** radial on `.basscally-hero::before` — **no** continuous drift animation (removed 2026-05-18). |
| **Drops visual** | `.landing-drops-stage` with `contain: paint` — wave (`.landing-wave`, `scaleY` only) + vinyl breathe (desktop only). No orbit dot. |
| **Motion gate** | `LandingMotionGate` toggles `landing-hero-motion-active` / `landing-deco-motion-active` — pauses loops when hero leaves viewport. |
| **Rail shimmer** | Animated shimmer **only** on drops-stage rail (≥1024px, hero in view). Founding panel uses static `.landing-rail-line`. |
| **Entrance** | `.landing-rise` — opacity + `translateY` one-shot only. |
| **Cards** | `.landing-interactive-card` — hover lift via CSS transition (not infinite). |
| **CTAs** | `.landing-cta-glow` on primary `ButtonLink` + mobile sticky bar (hover glow only). |

**Mobile (≤767px):** static EQ bar heights (no wave loop), vinyl ring static, no rail shimmer, **no** `backdrop-filter` on sticky nav or mobile CTA, body atmosphere pseudo layers **not fixed** (scroll with page).

**Tablet (768–1023px):** wave + live dot + vinyl when hero in view; drops rail shimmer off.

**Not allowed on `/`:** pricing orbit, callback scanline, animated full-page backgrounds, fixed SVG noise on mobile, fast (&lt;1.5s) loops, bounce.

---

## 7. Mobile motion rules (≤680px / ≤767px landing)

- **Pricing:** no orbit dot (rotator hidden); smaller orbit size (185px).
- **Callback:** no vinyl float, no scanline, static accent dots (no breathe loop).
- **Checkout success:** vinyl spin allowed but slower (**20s** vs 12s desktop).
- **Landing:** see §6 — **fewer loops**, static glows, no mobile backdrop blur on nav/CTA; sticky mobile CTA bar (`z-40`, `lg:hidden`).
- **Public sign-off:** smooth scroll required at **375px and 390px** (`scripts/home-scroll-qa.mjs` or manual scroll QA in §14).
- Limit concurrent loops: on `/` mobile, prefer static deco + optional live dot only when hero visible.
- CTAs: full-width on small breakpoints; min tap target **44×40px** (buttons already use `min-h-11`).

---

## 8. Reduced-motion rules

**Global** (`prefers-reduced-motion: reduce` in `globals.css`):

- Collapse animation/transition duration to `0.01ms`, single iteration, `scroll-behavior: auto`.

**Explicit off** for continuous loops:

- Orbit rotator/rings, callback vinyl/float/accent/bars, pricing wave, checkout vinyl spin, hero pulse, callback scanline, callback status dot pulse, `.landing-wave span`, `.landing-vinyl-pulse-ring`, `.landing-drops-stage .landing-rail-shimmer::before`.

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
node scripts/scroll-performance-audit.mjs   # all public routes @ 375
node scripts/home-scroll-qa.mjs             # / at 320–1280 + reduced-motion + CPU throttle
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
- [ ] **Landing scroll smoothness** at 375px and 390px — no hang, stutter, horizontal scroll, CTA jump, or sticky nav flicker (§14)
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` pass

**Selling-path routes to regression-test:** `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled`.

**After any `/` motion or depth change:** run `home-scroll-qa.mjs` and `scroll-performance-audit.mjs`.

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
4. **Landing scroll performance** — §14 + `node scripts/home-scroll-qa.mjs` (required for `/` changes)
5. **Touch target check** — Mobile responsive gate §5

**Backend phase rule:** Do **not** start Phase B until **all public-route P0 items pass** (selling-path motion, responsive, touch, duplicate CTAs, public copy). **P0 cleared** 2026-05-17. Duplicate CTA audit remains a **required sign-off gate** before every phase (`scripts/cta-nav-qa.mjs` or `scripts/public-route-audit.mjs`).

---

## 14. Scroll performance rules (landing P0)

**Scope:** `/` is a **P0 scroll smoothness** route. Other public routes must not regress layout/overflow when landing CSS changes.

### P0 rules (must pass before phase sign-off)

1. **No full-page continuous background animation** — body/html atmosphere is **static** (radials + grid only).
2. **No fixed SVG noise on mobile** — `feTurbulence` data-URI removed from `body::after`; on ≤767px atmosphere pseudo layers are **not** `position: fixed` (avoids repaint during scroll).
3. **Continuous motion is small and contained** — inside `.decorative-motion`, `.landing-drops-stage`, or clipped card wrappers; `pointer-events: none`.
4. **Transform and opacity only** for infinite loops on `/` — e.g. `.landing-wave` uses `scaleY`, not `height`.
5. **Do not animate** `filter`, `backdrop-filter`, `blur`, or `box-shadow` on continuous loops. Hover/focus transitions on CTAs are OK (short, user-triggered).
6. **Mobile (≤767px):** reduced glow (static hero radial), fewer loops (static EQ bars, static vinyl ring), **no** `backdrop-blur` on sticky nav or mobile CTA bar.
7. **Sticky nav must work** — no `overflow-x: hidden` on `html`/`body` (breaks `position: sticky`); clip on `main` instead.
8. **`will-change`** only on small active deco elements when animating — never on full-page sections.
9. **Public route sign-off** requires smooth scroll on `/` at **375px and 390px** (automated or manual).
10. After any motion or depth change on `/` or global atmosphere CSS, run **`node scripts/home-scroll-qa.mjs`** and **`node scripts/scroll-performance-audit.mjs`** (or equivalent manual scroll QA below).

### Manual scroll QA (when automation unavailable)

1. Slow scroll top → bottom; fast scroll down; fast scroll up; repeat ×3.
2. DevTools Performance: record scroll — watch for long tasks, layout thrashing, heavy paint, dropped frames.
3. `prefers-reduced-motion: reduce` — no continuous decorative loops.
4. CPU 4× throttle at 375px — scroll should remain usable (no persistent hang).

### Automated tools

| Script | Purpose |
| --- | --- |
| `scripts/home-scroll-qa.mjs` | `/` at 320–1280, overflow, CTA/nav stability, motion gate, reduced-motion, CPU 4× |
| `scripts/scroll-performance-audit.mjs` | All public routes @ 375 — infinite loops, heavy keyframes, mobile blur |

---

## Reference

- Styles: `src/app/globals.css` (motion section; landing block under “Landing home”)
- Landing components: `src/components/marketing/landing-hero.tsx`, `landing-sections.tsx`, `landing-motion-gate.tsx`
- Visual depth gate: `docs/visual-depth-quality-gate.md`
- Responsive gate: `docs/mobile-responsive-quality-gate.md`
- Wrapper utility: `.decorative-motion`
- Entrance component: `src/components/ui/motion.tsx` (`MotionDiv`)
- Automated QA: `scripts/motion-qa.mjs`, `scripts/responsive-audit.mjs`, `scripts/public-route-audit.mjs`, `scripts/home-scroll-qa.mjs`, `scripts/scroll-performance-audit.mjs`
