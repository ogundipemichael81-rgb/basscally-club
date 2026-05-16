# Basscally Club — Locked Screen Designs (Design-to-Build Bridge)

**Version:** 0.1 (updated per screen as designs are locked)
**Date:** 15 May 2026
**Owner:** Michael (COO/co-founder)
**Status:** Living document — grows as each screen is locked

---

## How this document works

This file sits between the Design System (`04`) and the Cursor build prompt (`03`).

**Reading order for Cursor / Codex / any AI code tool:**

```
1. 04_basscally_design_system.md     → tokens, components, rules (the contract)
2. 06_locked_screen_designs.md       → THIS FILE — what each screen actually looks like
3. 03_cursor_codex_build_prompt.md   → build phases, tech stack, repo structure
4. 02_landing_page_copy_and_wireframe.md → copy source (use verbatim text, ignore layout)
5. 01_PRD_basscally_club_mvp.md      → product logic, data model, access rules
```

**The override rule:**
- `02_landing_page_copy_and_wireframe.md` is the **copy source** — use its text verbatim.
- `02_landing_page_copy_and_wireframe.md` wireframe layouts are **superseded** by this file.
- If this file describes a screen's layout, **ignore the wireframe layout** for that screen.
- If this file does NOT yet describe a screen, fall back to the wireframe as a rough guide but match the Design System aesthetic (dark, editorial, asymmetric — not centered SaaS).

**The copy rule:**
- All user-facing text comes from `02_landing_page_copy_and_wireframe.md` unless this file explicitly overrides specific copy.
- FAQ answers, section body text, and CTA labels: use doc 02 verbatim.
- Headlines and structural copy: use what this file specifies (the editorial treatment may rebreak lines or adjust phrasing).

---

## Design sequence (mirrors Design System §15)

| # | Screen | Design status | Build status | Reference file |
|---|---|---|---|---|
| 1 | Landing — Hero | ✅ Locked (v2) — editorial, asymmetric, typography-led | ⬜ Not started | `basscally-hero-v2.html` |
| 2 | Landing — Full page | ✅ Locked (v2) — editorial sections, SVG icons, smart sticky CTA | ⬜ Not started | `basscally-full-landing-v2.html` |
| 3 | Auth — Login (magic link) | ⬜ Not started | ⬜ Not started | — |
| 4 | Member Dashboard — empty | ⬜ Not started | ⬜ Not started | — |
| 5 | Member Dashboard — populated | ⬜ Not started | ⬜ Not started | — |
| 6 | Content Detail (a drop) | ⬜ Not started | ⬜ Not started | — |
| 7 | Account / Membership | ⬜ Not started | ⬜ Not started | — |
| 8 | Paywall / Re-subscribe | ⬜ Not started | ⬜ Not started | — |
| 9 | Admin — Upload form | ⬜ Not started | ⬜ Not started | — |
| 10 | Admin — Metrics dashboard | ⬜ Not started | ⬜ Not started | — |

**Rule:** Cursor does NOT build a screen until its design status is ✅ Locked.

---

## Mapping: Cursor build phases → Design screens

The Cursor prompt (doc 03) defines 8 build phases. Here's how they map to design screens, so nothing gets built before it's designed:

| Cursor phase | What it builds | Required locked screens |
|---|---|---|
| Phase 1 — Scaffolding | Repo, deps, schema, no UI | None |
| Phase 2 — Landing page | `app/(marketing)/page.tsx` | Screen 1 + Screen 2 |
| Phase 3 — Auth + dashboard | Login, dashboard, content detail, account | Screens 3, 4, 5, 6, 7 |
| Phase 4 — Lemon Squeezy | Webhooks, checkout pages | Screen 8 (paywall) |
| Phase 5 — Admin dashboard | Admin layout, content mgmt, subscribers | Screens 9, 10 |
| Phase 6 — Email automation | Templates, queue, cron | None (email templates are code-only) |
| Phase 7 — Content access gate | Download API, paywall banner | Screen 8 (already locked by Phase 4) |
| Phase 8 — Polish | Loading states, error pages, SEO | All screens (add states to locked designs) |

**Implication:** Cursor can start Phase 1 (scaffolding) immediately — no design needed. Phase 2 waits until Screens 1 + 2 are locked. Phase 3 waits until Screens 3–7 are locked.

---

## Screen 1: Landing — Hero

**Status:** 🟡 In review (v2)
**Reference HTML:** `basscally-hero-v2.html`
**Design direction:** Editorial / magazine — asymmetric, oversized type, monospace metadata accents

### Layout

Two-column asymmetric grid at desktop (`lg:grid-cols-[minmax(0,1fr)_360px]`), single column on mobile (<1024px).

**Left column (headline):**
- Monospace metadata row: live dot + "Now accepting members" / separator / "Issue 001 — May 2026"
- Display headline, 4-line break:
  - Line 1: "Practice"
  - Line 2 (indented): "with"
  - Line 3: "Basscally." (orange italic, brand accent — ONLY place italic is used)
  - Line 4 (indented): "$20" (struck through with orange line) "$1.50" (orange) "/month." (muted)
- Lede paragraph: uses verbatim copy from doc 02 hero subheadline, with "bass-less covers, grooves, fills, and challenges" bolded
- CTA cluster: primary button "Join the Club — $1.50/month →" + monospace fine print "Cancel anytime · No contracts"

**Right column (drops rail):**
- Monospace label: "// This week's drops"
- 3 placeholder drops, each showing: issue number + day code, title, type/difficulty/duration tag
- First drop highlighted with orange pulse dot on the left border
- Footer: "Next drop in" + countdown "02d : 14h"

**Bottom strip (full-width):**
- 3 stats in display type (90,000+ / 10,000+ / 20k–400k) with mono labels (TikTok / Instagram / Avg. views)
- Right-aligned mono note: "Trusted by bassists in 40+ countries"

### Nav (sticky)
- Left: orange-bg square mark with "B" + "Basscally Club" wordmark
- Right: ghost "Sign in" (hidden on mobile) + primary "Join — $1.50/mo"

### Copy overrides from doc 02
| Doc 02 says | This design uses | Why |
|---|---|---|
| "Practice with Basscally for $1.50/month." (one line) | 4-line editorial break with $20 strike-through | Price anchoring + editorial drama |
| "Join Basscally Club — $1.50/month" (CTA) | "Join the Club — $1.50/month →" | Shorter, arrow adds motion |
| "90,000+ bassists already follow Basscally on TikTok" (trust line) | Stat strip with 3 metrics | More data, editorial format |

All other copy from doc 02 hero section is preserved verbatim.

### Component breakdown for Cursor

```
app/(marketing)/_components/
├── nav.tsx                    # Sticky nav — server component
├── hero.tsx                   # Hero section — server component
├── drop-rail.tsx              # Right column drops list — server component
├── next-drop-countdown.tsx    # Countdown timer — CLIENT component ('use client')
└── social-proof-strip.tsx     # Bottom stat strip — server component
```

### Key implementation notes
- Headline is NOT dynamically generated — it's hardcoded JSX with intentional line breaks
- Drops rail data: hardcode 3 placeholder objects in `lib/content/placeholder-drops.ts` at MVP; wire to DB query in Phase 5
- Countdown: client component using `useEffect` interval, reads `scheduledFor` prop (ISO string), renders static fallback on SSR
- Brand mark in nav: pure CSS, not an SVG or image — a 26px rounded square with white "B"
- Grid backdrop (faint lines) and warm radial glow: CSS only, masked to fade at edges, wrapped in `prefers-reduced-motion`

---

<!-- 
## Screen 2: Landing — Full page
Status: ⬜ Not started
[Will be added when design is locked]
-->

<!-- 
## Screen 3: Auth — Login
Status: ⬜ Not started
-->

<!-- 
## Screen 4–10: [remaining screens]
Status: ⬜ Not started
-->

---

## Appendix: FAQ handling plan

Doc 02 contains 8 FAQ items with full Q&A copy. When we design Screen 2 (full landing page), the FAQ section will:
- Use an accordion component (shadcn `Accordion`)
- Pull Q&A text verbatim from doc 02
- Match the editorial aesthetic (left-aligned, monospace question numbers, generous spacing)
- Specific layout will be defined when Screen 2 is locked

---

## Appendix: Section-by-section plan for Screen 2

When Screen 2 is designed, it will include these sections in this order (matching doc 02 wireframe structure, but with editorial layout treatment):

1. Hero (Screen 1 — already designed)
2. What you get (4 value cards — doc 02 §2 copy)
3. How it works (3 steps — doc 02 §3 copy)
4. Who it's for (checklist — doc 02 §4 copy)
5. Social proof (placeholder comments + stats — doc 02 §5)
6. Why $1.50 (doc 02 §6 copy)
7. Founding member offer (doc 02 §7 copy)
8. FAQ (doc 02 §8 copy — accordion)
9. Final CTA (doc 02 §9 copy)
10. Footer

Section order matches doc 02. Layout treatment will diverge (editorial, not centered SaaS). Copy stays verbatim except where noted per-section.

---

*This document grows as screens are locked. Every screen gets its own section with layout spec, copy overrides, component breakdown, and implementation notes. Cursor reads this file to know what to build — not the wireframe.*
