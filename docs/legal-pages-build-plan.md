# Basscally Club — Legal pages build plan

**Status:** **Implemented** (2026-05-17); public-route audit **PASS** (2026-05-17)  
**Created:** 2026-05-17  
**Purpose:** Define routes, components, content structure, styling, QA, and solicitor workflow for public legal pages.

---

## Implementation record (2026-05-17)

| Item | Status |
| --- | --- |
| **Legal pages** | **Shipped** — `/terms`, `/privacy`, `/refund-policy` |
| **Content source in app** | `src/content/legal.ts` (from `docs/legal-public-content-draft.md`) |
| **Components** | `src/components/legal/legal-page-shell.tsx`, `legal-section.tsx`, `legal-block.tsx`, `format-legal-text.tsx` |
| **Footer links** | `marketing-footer.tsx`, `auth/login/layout.tsx` → real routes |
| **Support email** | `basscally.enquiry@gmail.com` (Contact + legal contact blocks) |
| **Address display** | Registered in England & Wales, Company No. 16656420. Registered office address available on request. |
| **Payment wording** | Lemon Squeezy only — **Stripe and PayPal are not active** and do not appear on legal pages |
| **Responsive audit** | `scripts/responsive-audit.mjs` — legal routes **PASS** (320–1440+) |
| **Content audit** | `scripts/legal-audit.mjs` — **PASS** |
| **Public copy status** | **Draft** pending final solicitor review (see `docs/legal-public-content-draft.md`) |
| **Footer placeholder P1** | **Resolved** |
| **Public dev-language audit** | **PASS** — `scripts/public-route-audit.mjs` (no MVP/webhook/placeholder UI on public routes; processor names on legal pages only) |
| **Footer / legal wording** | Unchanged in this pass — still `basscally.enquiry@gmail.com`, Lemon Squeezy only, no Stripe/PayPal |
| **Next build phase** | **Phase B** — backend + Lemon Squeezy integration + billing portal (`docs/launch-mvp-scope.md`) |

---

## Confirmed product decisions

| Item | Value |
| --- | --- |
| **Support email (public)** | `basscally.enquiry@gmail.com` |
| **Address display (public)** | Registered in England & Wales, Company No. 16656420. Registered office address available on request. |
| **Public routes** | `/terms`, `/privacy`, `/refund-policy` |
| **Documents** | Terms of Service, Privacy Policy, Refund Policy |
| **Solicitor markers** | Must **not** appear on public pages (enforced in shipped copy) |
| **Solicitor checklist** | Internal docs only (see §10; `docs/legal-public-content-draft.md`) |
| **Inactive providers** | **Stripe and PayPal must not** appear on public legal pages |

---

## Content source of truth

**Implemented copy:** `src/content/legal.ts`  
**Authoring draft:** `docs/legal-public-content-draft.md`  
**Original source:** `basscally-legal-document-drafts (1).md` (sanitized)

Public pages render structured content from `src/content/legal.ts` only. **Do not** link to or render internal solicitor-checklist sections from the app.

---

## 1. Legal routes to create

All routes are **public**, **static content**, and live under the existing `(marketing)` route group so they inherit `MarketingShell` (nav + main). No auth, no API routes, no client-only data fetching.

| Route | Page title (document) | Next.js file (proposed) | `routes` key |
| --- | --- | --- | --- |
| `/terms` | Terms of Service | `src/app/(marketing)/terms/page.tsx` ✅ | `routes.legal.terms` |
| `/privacy` | Privacy Policy | `src/app/(marketing)/privacy/page.tsx` ✅ | `routes.legal.privacy` |
| `/refund-policy` | Refund Policy | `src/app/(marketing)/refund-policy/page.tsx` ✅ | `routes.legal.refundPolicy` |

**Per-route requirements:**

- `export const metadata` — unique `title` and `description` per document (App Router).
- Canonical path matches table (no trailing-slash redirects unless site-wide policy adds them).
- `generateStaticParams` not required (fixed routes).
- Pages are **Server Components**; legal body rendered from imported constants only.
- Optional: shared `openGraph` title; no OG images required for MVP.

**Post-build:** Done — `/terms`, `/privacy`, `/refund-policy` included in `scripts/responsive-audit.mjs` and `scripts/legal-audit.mjs`.

---

## 2. Components to create

Keep components small; prefer composition over one mega template.

| Component | Path (proposed) | Responsibility |
| --- | --- | --- |
| `LegalPageShell` | `src/components/legal/legal-page-shell.tsx` | Page wrapper: atmosphere-friendly shell class, max-width prose column, vertical rhythm, back link optional |
| `LegalDocument` | `src/components/legal/legal-document.tsx` | Renders title, “Last updated” line, optional intro, and mapped sections from constants |
| `LegalSection` | `src/components/legal/legal-section.tsx` | Single section: `h2` + body (paragraphs, lists) |
| `LegalProse` | `src/components/legal/legal-prose.tsx` | Typography utility wrapper (`prose`-style using design tokens — not `@tailwindcss/typography` unless already in project) |
| `LegalContactBlock` | `src/components/legal/legal-contact-block.tsx` | Reusable support email + company address line at document end |
| `LegalFooterLinks` | `src/components/legal/legal-footer-links.tsx` | Compact inline links for auth login footer (Privacy · Terms · Refund) |

**Not in scope for v1:**

- Client-side table of contents / scroll-spy
- PDF export
- Print-specific CSS beyond readable defaults
- i18n
- CMS or markdown files at runtime (constants only for MVP)

---

## 3. Footer links to update

### `MarketingFooter` — `src/components/marketing/marketing-footer.tsx`

| Current | Target |
| --- | --- |
| `mailto:hello@basscally.club?subject=Terms%20of%20Service` | `<Link href={routes.legal.terms}>` — label **Terms of Service** |
| `mailto:...Privacy%20Policy` | `<Link href={routes.legal.privacy}>` — **Privacy Policy** |
| `mailto:...Refund%20Policy` | `<Link href={routes.legal.refundPolicy}>` — **Refund Policy** |

Keep **Contact** / `hello@basscally.club` as general contact unless product decides to unify on `basscally.enquiry@gmail.com` everywhere (legal body uses enquiry email per decision; footer contact line can stay or align in a separate copy pass — **do not change marketing copy outside legal scope without approval**).

### Auth login footer — `src/app/(auth)/auth/login/layout.tsx`

| Current | Target |
| --- | --- |
| `<span>Privacy</span>` | `<Link href={routes.legal.privacy}>Privacy</Link>` |
| `<span>Terms</span>` | `<Link href={routes.legal.terms}>Terms</Link>` |

Optional v1: add **Refund** link for parity with marketing footer (`routes.legal.refundPolicy`), using `LegalFooterLinks` with `min-h-11` touch targets.

### Other surfaces (audit during implementation)

- Grep for `Privacy`, `Terms`, `Refund`, `mailto:hello@basscally.club?subject=` across `src/` and update any selling-path references to real routes.
- Pricing / checkout footers: only if they duplicate legal links (today: marketing footer on landing; checkout may use nav only).

### `src/lib/routes.ts`

Add:

```ts
legal: {
  terms: "/terms",
  privacy: "/privacy",
  refundPolicy: "/refund-policy",
},
```

---

## 4. Legal content constants to create

**Directory (implemented):** `src/content/legal.ts` (single module; plan originally proposed `src/lib/legal/*`)

| File | Purpose |
| --- | --- |
| `meta.ts` | Shared: `LEGAL_SUPPORT_EMAIL`, `LEGAL_COMPANY_ADDRESS_LINE`, site name, jurisdiction shorthand |
| `types.ts` | `LegalDocumentMeta`, `LegalSection` (`id`, `title`, `paragraphs[]`, optional `listItems[]`) |
| `sanitize.ts` | `stripSolicitorMarkers(text)` — removes patterns from draft (see below) |
| `terms.ts` | `termsOfServiceDocument` — meta + sections array |
| `privacy.ts` | `privacyPolicyDocument` |
| `refund.ts` | `refundPolicyDocument` |
| `index.ts` | Re-exports for pages |

**Confirmed values in `meta.ts`:**

```ts
export const LEGAL_SUPPORT_EMAIL = "basscally.enquiry@gmail.com";
export const LEGAL_COMPANY_ADDRESS_LINE =
  "Registered in England & Wales, Company No. 16656420. Registered office address available on request.";
```

**Ingestion workflow from draft markdown:**

1. Copy section bodies from `basscally-legal-document-drafts (1).md` into the three `*.ts` files as string arrays (one paragraph per array entry).
2. Pass every string through `stripSolicitorMarkers` at build time (or once when pasting — prefer a unit test that fails if forbidden substrings remain).
3. Set `lastUpdated` ISO date per document in meta (single source per file).

**Forbidden on public output (strip or reject in CI):**

- Bracketed review tags, e.g. `[SOLICITOR REVIEW]`, `[TODO]`, `[DRAFT]`, `[CONFIRM WITH CLIENT]`
- HTML comments from draft
- Inline “Note to solicitor” / “TBD” / “INSERT …” placeholders
- Track-changes markers (`~~`, `>>>`), highlight markers, or comment callouts
- Any internal checklist bullets meant for lawyers only

**Allowed in public copy:**

- Standard headings and numbered sections as rendered from constants
- `mailto:` link for `LEGAL_SUPPORT_EMAIL` in contact block
- Factual references to Lemon Squeezy, Supabase, cookies, UK GDPR — as written in approved draft text only

---

## 5. Styling rules (existing Basscally visual system)

Legal pages are **content-first** marketing surfaces. Follow locked design system + addenda; no new brand colors.

| Rule | Implementation |
| --- | --- |
| **Background** | `--color-bg` + optional light atmosphere via existing `body::before/::after` (no extra orange) |
| **Layout** | `basscally-container` max width; inner reading column ~`42rem`–`48rem` (`max-w-3xl` or token-aligned) |
| **Cards** | Do **not** wrap full document in heavy `.basscally-panel-card`; use flat prose on bg. Optional single subtle card for contact block only |
| **Typography** | Display font for `h1` only; body `--text-body` / `--text-body-sm`; section titles `h2` semibold; mono for “Last updated” eyebrow optional |
| **Links** | `--color-brand` on hover; underline offset; focus ring per globals |
| **Lists** | `list-disc` / `list-decimal` with `--space-4` gap; nested lists indented |
| **Spacing** | Section gap `--space-8`; paragraph gap `--space-4` |
| **Motion** | **No** decorative motion on legal pages; entrance optional one-shot `fade-rise` on shell only if consistent with marketing — prefer static for readability |
| **60-30-10** | Text-heavy page; brand only on links and back control |
| **Nav** | Standard `MarketingNav`; legal routes use default nav CTAs (pricing / login) |
| **Footer** | Full `MarketingFooter` below document on marketing legal pages |

**Shell class (proposed):** `.basscally-legal-page` in `globals.css` — `overflow-x: hidden`, `padding` top/bottom `--space-8` / `--space-10`, no competing pseudo-elements beyond global body atmosphere.

---

## 6. Accessibility rules

| Requirement | How |
| --- | --- |
| **Page title** | Unique `metadata.title` per route |
| **Landmarks** | One `main`; `h1` once per page; logical `h2` order for sections |
| **Skip** | Rely on nav; optional skip link not required for MVP |
| **Focus** | All footer and in-doc links meet visible focus ring from globals |
| **Touch targets** | Footer links `min-h-11`; auth login legal links same |
| **Contrast** | Body text `--color-text` on `--color-bg`; muted meta `--color-text-muted` only for secondary lines |
| **Links** | Descriptive text (“Privacy Policy”, not “click here”) |
| **Email** | `href="mailto:basscally.enquiry@gmail.com"` with visible address text |
| **Motion** | Respect `prefers-reduced-motion` (no loops on legal pages) |
| **Language** | `lang="en"` from root layout (unchanged) |

Manual pass after build: tab through nav → document links → footer on 375px width.

---

## 7. Mobile and responsive QA checks

Legal routes are **new public surfaces** and must pass the same gates as other production UI (see quality gate docs).

### Breakpoints (required)

320, 375, 390, 768, 1024, 1280 — plus stress **280** and **1440+**.

### P0 checks

| Check | Pass criteria |
| --- | --- |
| Horizontal scroll | None at any required width |
| Prose width | No text clipped; long URLs/emails wrap (`overflow-wrap: break-word` on legal column) |
| Nav collision | Sticky nav does not cover `h1` when scrolling to top |
| Touch | All legal links in footer and auth login ≥ 44×44px |
| Font size | Body ≥ 16px on mobile |
| Depth | Readable on `--color-bg`; contact block optional subtle depth card only |

### Automated (after routes exist)

1. Extend `scripts/responsive-audit.mjs` with `/terms`, `/privacy`, `/refund-policy`
2. Run `node scripts/responsive-audit.mjs` — all rows PASS
3. Run `node scripts/motion-qa.mjs` — PASS (no new decorative motion expected)
4. `npm run typecheck`, `npm run lint`, `npm run build`

### Manual

- Read one full document on 375px (scroll length, list indentation)
- Verify mailto opens correctly on mobile
- Confirm no solicitor marker strings visible in DOM (view source / search)

---

## 8. What not to touch

| Area | Reason |
| --- | --- |
| `docs/basscally-build-pack/03_DESIGN_MD/04_basscally_design_system.md` | Locked; no token hex changes |
| Selling-path layout/copy | Orbit, pricing plans, checkout narrative — unless fixing a legal link only |
| `src/middleware.ts`, API routes, webhooks | Legal pages are static; no backend |
| Auth business logic | Login remains UI-only until Phase B |
| Member/admin route groups | Out of scope |
| `hello@basscally.club` marketing contact | Unless explicitly unified in a separate decision |
| Raw draft file | Never served or imported in client bundle |
| Solicitor checklist (§10) | Never rendered in React tree |
| Phase B work | Supabase / Lemon Squeezy wiring stays separate |

---

## 9. Phase A legal footer placeholder P1 — resolved (2026-05-17)

**Status:** **Resolved**

| Criterion | Result |
| --- | --- |
| `/terms`, `/privacy`, `/refund-policy` live | ✅ |
| `MarketingFooter` → internal `Link` targets | ✅ |
| Auth login footer → `/privacy`, `/terms` | ✅ |
| Contact → `mailto:basscally.enquiry@gmail.com` | ✅ |
| Responsive + legal content audits PASS | ✅ |
| Gate docs updated | ✅ |

**Still open (not footer P1):**

- Solicitor sign-off on public wording (internal — §10)  
- Phase B payment integration (Lemon Squeezy checkout + webhooks + **customer billing portal** for real cancellation)  
- Manual keyboard/focus walkthrough (recommended)  
- Re-run `public-route-audit.mjs` after any legal footer or public copy change

**Related (outside legal scope, same audit pass):**

- `/account/cancel` — pre–Phase B **cancellation information** page (not a fake cancellation success screen)  
- Homepage subtle motion on `/` — see `docs/motion-audit-rules.md` §6

---

## 10. Items still requiring solicitor review (internal only)

> **Internal — not for public pages.** Track in repo docs or external counsel workflow; never expose markers in UI.

Use this checklist before treating legal copy as “launch final”:

| # | Topic | Review question |
| --- | --- | --- |
| 1 | **Subscription terms** | Do Terms accurately describe recurring billing, renewal, cancellation, and access until period end via Lemon Squeezy? |
| 2 | **Refund policy** | Does Refund Policy match actual LS refund settings and UK consumer rights for digital content? |
| 3 | **Privacy / UK GDPR** | Lawful bases, retention, processors (Supabase, Lemon Squeezy, Resend, hosting), international transfers, and user rights |
| 4 | **Cookies / analytics** | If Plausible/Umami or other trackers ship later, Privacy must list them — confirm “not in use” vs “in use” |
| 5 | **Children** | Age restriction and no knowing collection from under-13/16 as stated |
| 6 | **Intellectual property** | Member license for downloads vs ownership of user-generated content (if any) |
| 7 | **Company details** | Company No. 16656420 and “address on request” sufficient for ICO/trader disclosure needs |
| 8 | **Support channel** | `basscally.enquiry@gmail.com` acceptable for privacy requests and billing disputes |
| 9 | **Governing law** | England & Wales jurisdiction and dispute wording |
| 10 | **Payment provider** | Lemon Squeezy named correctly; merchant of record vs platform responsibilities |
| 11 | **Email marketing** | Consent and unsubscribe if marketing emails added beyond transactional |
| 12 | **Draft markers** | Confirm all `[…]` review tags removed from constants (automated test recommended) |

**Sign-off record (fill when counsel approves):**

| Document | Solicitor reviewed | Date | Approved for production |
| --- | --- | --- | --- |
| Terms of Service | ☐ | | ☐ |
| Privacy Policy | ☐ | | ☐ |
| Refund Policy | ☐ | | ☐ |

---

## Implementation order (completed 2026-05-17)

1. ~~Content draft~~ — `docs/legal-public-content-draft.md`  
2. ~~Content module~~ — `src/content/legal.ts`  
3. ~~Components~~ — `LegalPageShell`, `LegalSection`, `LegalBlockRenderer`  
4. ~~Routes~~ — `/terms`, `/privacy`, `/refund-policy`  
5. ~~Footers~~ — `marketing-footer.tsx`, `auth/login/layout.tsx`  
6. ~~CSS~~ — `.basscally-legal-page` in `globals.css`  
7. ~~QA~~ — `responsive-audit.mjs`, `legal-audit.mjs`; typecheck/lint/build PASS  
8. ~~Docs~~ — gate docs + this plan updated  

**Next:** Phase B per `docs/launch-mvp-scope.md` (Supabase, Lemon Squeezy webhooks, auth, billing portal) — **only after public-route P0 remains green**. Re-run `node scripts/legal-audit.mjs` and `node scripts/public-route-audit.mjs` after any legal or public UI change.

---

## References

- `basscally-legal-document-drafts (1).md` — content draft (add to repo before coding)  
- `docs/launch-mvp-scope.md` — Phase A P1 and launch requirements  
- `docs/visual-depth-quality-gate.md`  
- `docs/mobile-responsive-quality-gate.md`  
- `docs/motion-audit-rules.md`  
- `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/13_final_missing_items_and_prebuild_checklist.md`  
- `src/components/marketing/marketing-footer.tsx`  
- `src/app/(auth)/auth/login/layout.tsx`  
- `src/lib/routes.ts`  
- `src/content/legal.ts`  
- `scripts/legal-audit.mjs`  
- `scripts/public-route-audit.mjs`  
- `docs/legal-public-content-draft.md`  
- `src/components/account/account-cancel-content.tsx` — cancellation info (portal in Phase B)
