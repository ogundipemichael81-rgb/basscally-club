# Basscally Hub — Action Cycle Audit

**Date:** 2026-05-25  
**Scope:** Every interactive control on built public/member/admin surfaces, mapped to target route or API.  
**Source:** Repo scan + `docs/GPT-PROJECT-MEMORY-HANDOVER.md` API table + autopilot simulator expectations.  
**Note:** Uploaded `docs/basscally-full-button-function-audit.md` is **not in repo** — this document is the interim source of truth until that file is restored.

---

## Audit legend

| Status | Meaning |
| --- | --- |
| **LIVE** | Navigates or submits correctly for Phase A UI |
| **STUB** | UI works; backend/API not implemented |
| **MISSING** | Route or control not built |
| **BLOCKED** | Needs Phase B (auth, LS, Supabase) |

---

## Global / marketing shell

| Control | Location | Target | Status |
| --- | --- | --- | --- |
| Logo → home | `MarketingNav` | `GET /` | LIVE |
| Sign in | `MarketingNav` (ghost) | `GET /auth/login` | LIVE |
| Join — $1.50/mo | `MarketingNav` (primary) | `GET /pricing` | LIVE |
| Mobile sticky Join | `MobileCtaBar` | `GET /pricing` | LIVE |
| Footer Contact | `MarketingFooter` | `mailto:basscally.enquiry@gmail.com` | LIVE |
| Footer Terms | `MarketingFooter` | `GET /terms` | LIVE |
| Footer Privacy | `MarketingFooter` | `GET /privacy` | LIVE |
| Footer Refund | `MarketingFooter` | `GET /refund-policy` | LIVE |

---

## Landing `/`

| Control | Target | Status |
| --- | --- | --- |
| Join Basscally Hub — $1.50/month (hero, ≥lg) | `GET /pricing` | LIVE |
| Join CTAs (founding section, join section) | `GET /pricing` | LIVE |
| FAQ accordion toggles | In-page (client state) | LIVE |
| Style / waitlist / resources links | **Not present** | MISSING (BH-05, BH-06) |

---

## Pricing `/pricing`

| Control | Target | Status |
| --- | --- | --- |
| Founding — Join as founder | `GET /checkout/success` | **STUB** (should → LS checkout URL) |
| Annual — Choose annual | `GET /checkout/success` | **STUB** |
| Monthly — Choose monthly | `GET /checkout/success` | **STUB** |
| Plan selection | No server-side plan code | BLOCKED (BH-03) |

**P0 product gap:** Founding should be centre/highlighted; `annual_18` is currently `highlighted: true` in `lib/plans.ts`.

---

## Auth

| Control | Location | Target | Status |
| --- | --- | --- | --- |
| Send magic link | `LoginForm` submit | `POST` Supabase Auth | **STUB** (setTimeout mock) |
| Resend magic link | Login success state | Resend auth email | **STUB** |
| Join from login footer | `login-form` link | `GET /pricing` | LIVE |
| Privacy / Terms footer | auth login layout | `/privacy`, `/terms` | LIVE |
| Back to home | `AuthBackLink` | `GET /` | LIVE |
| Continue to dashboard | `CallbackContent` | `GET /dashboard` | LIVE (no session check) |

---

## Checkout

| Control | Route | Target | Status |
| --- | --- | --- | --- |
| Go to sign in / dashboard | success | `GET /auth/login` | LIVE / STUB session |
| Resend magic link | success | Auth resend API | BLOCKED |
| Return to pricing | cancelled | `GET /pricing` | LIVE |
| FAQ link | cancelled | `GET /#faq` | LIVE |
| Nav: Need help? | checkout routes | `mailto:` | LIVE |
| Nav: Home | checkout routes | `GET /` | LIVE |

---

## Legal

| Control | Routes | Target | Status |
| --- | --- | --- | --- |
| Back / home links | terms, privacy, refund | `GET /` | LIVE |
| Contact mailto | legal shell | `mailto:basscally.enquiry@gmail.com` | LIVE |
| Cross-links | legal pages | `/terms`, `/privacy`, `/refund-policy` | LIVE |

**Do not map to `/legal/*`** — autopilot BH-16 metadata is wrong.

---

## Account cancel `/account/cancel`

| Control | Target | Status |
| --- | --- | --- |
| Open billing portal | LS customer portal | **DISABLED** (honest pre–Phase B) |
| View plans | `GET /pricing` | LIVE |
| Back to home | `GET /` | LIVE |
| Terms / Refund anchors | legal routes | LIVE |
| Contact support | mailto | LIVE |

---

## Member area (placeholders)

| Control | Route | Target | Status |
| --- | --- | --- | --- |
| Sidebar nav items | dashboard, account, billing | Placeholder pages | STUB |
| Dashboard CTAs | placeholder | — | STUB |
| Content play / download | `/c/[id]` | Player + `GET /api/content/[id]/download` | BLOCKED |
| Manage billing | account/billing | LS portal | BLOCKED |
| Cancel membership | account | `/account/cancel` info | LIVE (info only) |

---

## Admin (placeholders)

| Control | Route | Target API | Status |
| --- | --- | --- | --- |
| Upload form submit | `/admin/content/new` | `POST /api/admin/content` | MISSING |
| Content edit/save | `/admin/content/[id]` | `PATCH /api/admin/content/[id]` | MISSING |
| Delete confirm | delete page | `DELETE /api/admin/content/[id]` | MISSING |
| Subscribers list | `/admin/subscribers` | `GET /api/admin/subscribers` | MISSING |
| Metrics | `/admin` | `GET /api/admin/metrics` | MISSING |
| Email resend | resend page | `POST /api/admin/email/resend/[id]` | MISSING |
| Export CSV | subscribers (future) | `GET /api/admin/export/subscribers` | MISSING |

---

## Required API routes (from handover — Phase B)

| Route | Method | Purpose | Repo status |
| --- | --- | --- | --- |
| `/api/webhooks/lemonsqueezy` | POST | Subscription lifecycle | STUB |
| `/api/content/[id]/download` | GET | Gated signed URL | STUB |
| `/api/admin/content` | POST | Create drop | MISSING |
| `/api/admin/content/[id]` | GET/PATCH/DELETE | Manage drop | MISSING |
| `/api/admin/subscribers` | GET | Subscriber list | MISSING |
| `/api/admin/metrics` | GET | Live metrics | MISSING |
| `/api/admin/email/resend/[id]` | POST | Resend notification | MISSING |
| `/api/admin/export/subscribers` | GET | CSV export | MISSING |
| `/api/waitlist` | POST | Waitlist signup | MISSING |
| `/api/mock-auth/session` | POST | Staging simulator auth | MISSING |

**Download rule (P0 for BH-03/BH-10):** Server must verify subscription before signed Storage URL; lapsed → 403 → paywall.

---

## New routes — required controls (not built)

### `/waitlist` (BH-05)

| Control | Target API | Status |
| --- | --- | --- |
| Email submit | `POST /api/waitlist` | MISSING |
| Success / error states | In-page | MISSING |

### `/style/[slug]` (BH-06)

| Control | Target | Status |
| --- | --- | --- |
| Preview track play (30s gate) | Audio preview + auth gate | MISSING |
| Unlock all tracks | LS checkout (founding variant) | MISSING |
| Mobile sticky CTA | Checkout | MISSING |
| Seed: `/style/makossa-tribe-fuego` | Content from DB | MISSING |

### `/resources` (Resource Centre)

| Control | Target | Status |
| --- | --- | --- |
| Resource list / links | Static or CMS | MISSING |
| Replaces “Walkthrough” nav label | Nav + route | MISSING |

---

## Error / utility pages

| Control | Route | Target | Status |
| --- | --- | --- | --- |
| Go to dashboard | `not-found`, `error` | `GET /dashboard` | LIVE (no auth guard) |
| Go to home | `not-found`, `error` | `GET /` | LIVE |

---

## Autopilot simulator expectations vs repo

| Simulator check | Expects | Repo |
| --- | --- | --- |
| 3-click flow | `/` → `/style/...` → checkout | **FAIL** — no style route |
| Waitlist | `/waitlist` | **MISSING** |
| Mock auth cookie | `basscally_mock_user_id` | **No API** to set session |
| Download button on `/c/[id]` | Present | **MISSING** (placeholder page) |
| Billing portal button | account | **MISSING** on placeholders |

---

## QA scripts — action coverage

| Script | Covers |
| --- | --- |
| `public-route-audit.mjs` | Public copy, CTA, motion, responsive |
| `cta-nav-qa.mjs` | Nav duplication |
| `home-scroll-qa.mjs` | `/` scroll P0 |
| `scroll-performance-audit.mjs` | Public scroll/motion regression |
| `basscally-ui-simulator.py` | Full click paths (needs mock auth + new routes) |
| `basscally-responsive-audit.py` | 5 routes × 6 breakpoints (subset) |

**After any motion/depth change:** run `home-scroll-qa.mjs` + `scroll-performance-audit.mjs`.

---

## P0 blockers (action cycle)

1. Missing **`basscally-full-button-function-audit.md`** — restore or accept this doc until restored.
2. Pricing CTAs point to **`/checkout/success`** instead of Lemon Squeezy (BH-03).
3. Login form does not call Supabase (BH-04).
4. Download API stub — no subscription gate (BH-03/BH-10).
5. New conversion routes **`/style/*`, `/waitlist`, `/resources`** not built.
6. Simulator mock auth **`/api/mock-auth/session`** missing for BH-18 prep.

---

## Next safe command

```powershell
npm run bh:status
```

Then execute **BH-00** via `npm run bh:next` — do not start backend.
