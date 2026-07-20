# BH-16 — Legal Pages Complete

Date: 2026-05-29  
Step: BH-16

## Implemented markers

- terms of service
- privacy policy
- refund policy
- Basscally Ltd
- 16656420
- basscally.enquiry@gmail.com

## What was verified

### Canonical routes (no `/legal/*` as primary)

| Route | Page | Status |
|-------|------|--------|
| `/terms` | Terms of Service | ✅ Live |
| `/privacy` | Privacy Policy | ✅ Live |
| `/refund-policy` | Refund Policy | ✅ Live |

Legacy audit paths redirect to canonical routes via `next.config.ts`:

- `/legal/terms` → `/terms`
- `/legal/privacy` → `/privacy`
- `/legal/refund` → `/refund-policy`

### Company and contact

- **Basscally Ltd**, company number **16656420**, registered England and Wales
- Support contact: **basscally.enquiry@gmail.com**
- Constants in `src/content/legal.ts`: `LEGAL_COMPANY_NAME`, `LEGAL_COMPANY_NUMBER`, `LEGAL_SUPPORT_EMAIL`

### Footer and login wiring

| Location | Links |
|----------|-------|
| `MarketingFooter` | `/terms`, `/privacy`, `/refund-policy`, `mailto:basscally.enquiry@gmail.com` |
| `/auth/login` layout footer | `/privacy`, `/terms` |
| `LegalPageShell` cross-nav | `/terms`, `/privacy`, `/refund-policy`, home |

All links use `routes.legal.*` (`/terms`, `/privacy`, `/refund-policy`).

### Content source

- Public copy: `src/content/legal.ts` (from `docs/legal-public-content-draft.md`)
- Components: `src/components/legal/legal-page-shell.tsx`, `legal-section.tsx`, `legal-block.tsx`, `format-legal-text.tsx`
- Pages: `src/app/(marketing)/terms/page.tsx`, `privacy/page.tsx`, `refund-policy/page.tsx`

### Audit results

`node scripts/legal-audit.mjs` — **27 checks, 0 FAIL** (2026-05-29):

- All three pages HTTP 200
- **terms of service**, **privacy policy**, **refund policy** content present
- **Basscally Ltd**, **16656420**, **basscally.enquiry@gmail.com** on every page
- No forbidden placeholders (Stripe, PayPal, solicitor draft markers)
- Lemon Squeezy merchant-of-record language; no “Basscally stores your card”
- Marketing footer links verified on `/`

## Files

- `src/content/legal.ts`
- `src/components/legal/legal-page-shell.tsx`
- `src/components/legal/legal-section.tsx`
- `src/components/legal/legal-block.tsx`
- `src/components/legal/format-legal-text.tsx`
- `src/components/marketing/marketing-footer.tsx`
- `src/app/(auth)/auth/login/layout.tsx`
- `src/app/(marketing)/terms/page.tsx`
- `src/app/(marketing)/privacy/page.tsx`
- `src/app/(marketing)/refund-policy/page.tsx`
- `src/lib/routes.ts`
- `next.config.ts` (legacy `/legal/*` redirects)
- `scripts/legal-audit.mjs`

## Notes

- Public legal copy remains a **draft pending final solicitor review** (`docs/legal-public-content-draft.md`).
- No cookie banner added — analytics remain cookieless by design.
- Email automation (BH-15) unchanged in this step.
