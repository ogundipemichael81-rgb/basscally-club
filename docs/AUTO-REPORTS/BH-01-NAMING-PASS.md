# BH-01 — Global Naming Pass

**Step:** BH-01  
**Date:** 2026-05-25  
**Status:** naming pass complete

---

## Locked renames applied

| Was | Now |
| --- | --- |
| Basscally Club | **Basscally Hub** |
| Every 3 days / ~10 drops per month | **weekly** / ~four drops per month |
| Drops from Chris only (implicit) | **Chris and world-class bassists** |
| Join the Club | **Join Basscally Hub** |
| Club member / Club access / Club Plus | Hub member / Hub access / Hub Plus |

Domain **basscally.club** unchanged. npm package name `basscally-club` unchanged (repo slug).

---

## Live application copy (`src/`)

- `src/lib/constants.ts` — `APP_NAME` → Basscally Hub
- `src/content/legal.ts` — all public legal meta + body service name
- Marketing: `landing-hero.tsx`, `landing-sections.tsx`, `faq-accordion.tsx`, `pricing-plan-selector.tsx`
- Auth: `login/layout.tsx`, `login-form.tsx`, `callback-content.tsx`
- Checkout: `checkout-success-content.tsx`, `checkout-cancelled-content.tsx`, success/cancelled page metadata
- Member shell brand, account cancel copy, `lib/plans.ts` labels (Hub Plus, full Hub access)
- Pricing page metadata

**Cadence:** Hero, sections, FAQ, checkout cards use **weekly** language.  
**Contributors:** Hero, bass-less value card, FAQ Chris answer, checkout success “Weekly drops” mention **world-class bassists**.

---

## copy docs updated

| Document | Changes |
| --- | --- |
| `docs/launch-mvp-scope.md` | Title → Basscally Hub |
| `docs/legal-pages-build-plan.md` | Title → Basscally Hub |
| `docs/legal-public-content-draft.md` | Service name Basscally Hub throughout |
| `docs/basscally-current-state-reconciliation.md` | Naming + cadence rows marked BH-01 complete |
| `docs/basscally-full-button-function-audit.md` | Naming section marked complete |
| `docs/basscally-action-cycle-audit.md` | Hero CTA label |
| `docs/basscally-build-pack/03_DESIGN_MD/04_basscally_design_system.md` | BH-01 addendum + microcopy table |
| `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/01_PRD_basscally_club_mvp_UPDATED_v1_1.md` | BH-01 addendum + product name |
| `package.json` | `description` field for Basscally Hub weekly membership |

`bh:*` scripts were already present; no script changes required.

---

## Intentionally unchanged (reference archives)

- `docs/basscally-build-pack/**/*.html` and `basscally-all-screen-codes-01-33-combined.md` — historical **Basscally Club** / **every 3 days** strings kept as design references; implement from live `src/` + design system addendum, not from stale HTML exports.

---

## Verification checklist

- [x] No `Basscally Club` / `every 3 days` / `Join the Club` in `src/` user-facing strings
- [x] Legal source uses **Basscally Hub**
- [x] Required markers present in this file: **Basscally Hub**, **weekly**, **world-class bassists**, **naming pass complete**, **copy docs updated**

---

## Next step

Run `npm run bh:complete` to advance autopilot to **BH-02** (Supabase — Phase B; do not start without explicit approval).
