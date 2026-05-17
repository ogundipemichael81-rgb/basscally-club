# Basscally Club — Launch MVP Scope

**Status:** Active build strategy (supersedes “all 33 screens before launch”)  
**Source of truth:** `docs/basscally-build-pack/` (PRD v1.1, `09_routes_wiring_screen_map_and_components.md`, `08_architecture_backend_auth_payments_email_logic.md`, `06_locked_screen_designs_UPDATED_01_33.md`)  
**Last updated:** 2026-05-17 (legal pages implemented)

---

## Strategy change

We are **not** treating all 33 locked screens as launch blockers.

| Old assumption | New assumption |
|----------------|----------------|
| Ship every screen 01–33 before first paid user | Ship **Launch MVP** only for first paid users |
| Full admin suite, email automation, and polish first | Admin upload + core member loop first; metrics, email queue, and polish later |
| Build pack phase order is the only sequence | This document **re-prioritizes** what ships when |

The build pack remains authoritative for **design, routes, data model, and behavior**. This document is authoritative for **what ships when**.

---

## 1. Launch MVP — must build before first paid users

### Member & marketing screens

| Screen | Name | Route | HTML reference |
|--------|------|-------|----------------|
| 01 | Landing Hero | `/` (section) | `01_SCREEN_HTML_ORIGINALS/01_landing_hero.html` |
| 02 | Full Landing Page | `/` | `01_SCREEN_HTML_ORIGINALS/02_full_landing_page.html` |
| 03 | Auth Login | `/auth/login` | `03_auth_login.html` |
| 13 | Auth Callback Transition | `/auth/callback` | `13_auth_callback_transition.html` |
| 32 | Pricing Plan Selector | `/pricing` | `32_pricing_plan_selector.html` |
| 11 | Checkout Success | `/checkout/success` | `11_checkout_success.html` |
| 12 | Checkout Cancelled | `/checkout/cancelled` | `12_checkout_cancelled.html` |
| 04 | Dashboard Empty | `/dashboard` | `04_member_dashboard_empty.html` |
| 05 | Dashboard Populated | `/dashboard` | `05_member_dashboard_populated.html` |
| 06 | Content Detail | `/c/[id]` | `06_content_detail_page.html` |
| 07 | Account / Membership | `/account` | `07_account_membership.html` |
| 08 | Paywall / Re-subscribe | `/pricing` (state) | `08_paywall_resubscribe.html` |

**Route rule:** Use **`/pricing` only** for Screen 8 and Screen 32. Do **not** add `/paywall`.

### Admin screens (launch)

| Screen | Name | Route | HTML reference |
|--------|------|-------|----------------|
| 09 | Admin Upload Form | `/admin/content/new` | `09_admin_upload_form.html` |
| 20 | Upload Success / Publish Queued | `/admin/content/new` (success state) | `20_upload_success_publish_queued.html` |

**Note:** Screen 20 is a **success state** on the upload route, not email queue automation. Copy may say “published” without Resend fan-out at launch.

### Backend & integrations (launch)

| Capability | Required at launch |
|------------|-------------------|
| Supabase Auth | Magic link, server session |
| Supabase Postgres | `users`, `subscriptions`, `content` (minimum columns per architecture doc) |
| Supabase Storage | Private `audio` bucket; `audio_storage_key` on content |
| Lemon Squeezy checkout | Hosted checkout from `/pricing` CTAs |
| Lemon Squeezy webhook | HMAC verification, idempotent upsert, subscription sync |
| `subscriptions` table | Plan code, status, period dates, provider IDs |
| `content` table | Metadata + storage key + publish status |
| Server-side subscription guards | Member routes and download API; no client-only unlock |
| Signed audio download URLs | `GET /api/content/[id]/download` with access check |
| Admin email allowlist | Server-side admin check on upload routes |

### Explicitly **not** in launch MVP

- Resend queue automation and new-drop email fan-out  
- `email_queue` / `email_logs` tables in active use  
- Manual resend (Screen 27)  
- Vercel cron routes (`/api/cron/*`)  
- Admin metrics dashboard (Screen 10)  
- Advanced billing management UI (Screen 33)  
- Lemon Squeezy customer portal redirect flow (Screen 22) — members may cancel via LS email/link until portal UI ships  
- Soft delete confirmation UI (Screen 28) — launch may use `archived` status in DB without dedicated delete screen  
- Download rate-limit **UI** (Screen 30) — optional API throttling in private beta  
- Full toast system showcase (Screen 23) — minimal toasts for upload/publish errors only  
- Plausible/Umami (optional post-launch)  
- `audit_events` (nice-to-have post-launch)

### Launch MVP acceptance (product)

- Visitor can land → pricing → pay in Lemon Squeezy test/live mode.  
- Webhook creates/updates user + subscription; checkout success does **not** fake unlock without verified subscription.  
- Member signs in, sees dashboard, opens a drop, plays/downloads via signed URL.  
- Expired/no-sub user sees paywall on `/pricing`.  
- Admin can upload audio + metadata and publish (or mark published).  
- No mock subscription access in production paths.

---

## 2. Private beta — before wider launch (not first paid cohort)

Needed for a **stable public beta**, not necessarily the very first founding checkout.

| Screen | Name | Route / placement | Why beta |
|--------|------|-------------------|----------|
| 17 | Past-due Banner | `/dashboard`, `/account` states | Billing grace UX when webhooks mark `past_due` |
| 21 | Download Blocked | `/c/[id]` state | Clear 403 when access denied |
| 26 | Admin Unauthorized | `/admin/*` guard state | Safe rejection for non-admin |
| 24 | 404 Not Found | `not-found.tsx` | Production-quality broken routes *(may ship early; polish in beta)* |
| 25 | 500 Server Error | `error.tsx` | Production error fallback *(may ship early; polish in beta)* |

**Backend (private beta, not launch):**

- Download rate limiting on API (60/hour per user) even if Screen 30 UI waits  
- Basic `audit_events` for admin publish actions  
- Harden webhook replay / monitoring

**Note:** Screens 24–25 are already implemented at a basic level from Phase 2; treat **visual polish** as beta, not launch blocker.

---

## 3. Post-launch admin and polish

| Screen | Name | Route |
|--------|------|-------|
| 10 | Admin Metrics | `/admin` |
| 14 | Admin Content List | `/admin/content` |
| 15 | Admin Subscribers | `/admin/subscribers` |
| 18 | Cancel Confirmation | `/account/cancel` |
| 19 | Admin Content Edit | `/admin/content/[id]` |
| 22 | Billing Portal Transition | `/account/billing/portal` |
| 23 | Toast System (full showcase) | Global component |
| 28 | Soft Delete Confirmation | `/admin/content/[id]/delete` |
| 29 | Empty Search Results | Member/admin list states |
| 30 | Download Rate Limit UI | `/c/[id]` state |
| 31 | Email Template Previews | `/admin/email-templates` |
| 33 | Account Billing Management | `/account/billing` |

**Polish backlog:**

- Admin sidebar links to metrics, lists, email tools  
- Export subscribers CSV  
- Scheduled publish without manual cron (until automation phase)  
- SEO, sitemap, Open Graph  
- Mobile admin drawer refinements  

---

## 4. Later automation

| Screen / capability | Route / system |
|---------------------|----------------|
| 16 | Email Delivery Logs | `/admin/email-logs` |
| 27 | Manual Resend Confirmation | `/admin/email-logs/resend` |
| Resend transactional sends | New-drop fan-out on publish |
| `email_queue` + `email_logs` tables | Active pipeline |
| `POST /api/webhooks/resend` | Delivery events |
| `GET /api/cron/publish-scheduled` | Scheduled content promotion |
| `GET /api/cron/send-email-queue` | Email worker |
| `GET /api/cron/send-reminders` | Renewal / buffer alerts |
| Welcome / payment-failed / cancellation emails | Per architecture doc triggers |
| Content buffer alert (admin, &lt;14 days scheduled) | Admin notification |

---

## Route map — launch MVP only

| Route | Screens | Launch priority |
|-------|---------|-----------------|
| `/` | 01, 02 | **Ship** (Phase 2 done) |
| `/pricing` | 32, 08 | **Ship** |
| `/auth/login` | 03 | **Ship** (Phase 2 done) |
| `/auth/callback` | 13 | **Ship** (Phase 2 done; wire auth later) |
| `/checkout/success` | 11 | **Ship** |
| `/checkout/cancelled` | 12 | **Ship** |
| `/dashboard` | 04, 05 | **Ship** |
| `/c/[id]` | 06 | **Ship** (happy path; 21 beta) |
| `/account` | 07 | **Ship** |
| `/admin/content/new` | 09, 20 | **Ship** |
| `GET /api/content/[id]/download` | — | **Ship** |
| `POST /api/webhooks/lemonsqueezy` | — | **Ship** |

### Routes that exist but are **backlog-only** for launch

Keep scaffold/placeholders; do not polish before launch unless noted.

| Route | Screen | Tier |
|-------|--------|------|
| `/admin` | 10 | Post-launch |
| `/admin/content` | 14 | Post-launch |
| `/admin/content/[id]` | 19 | Post-launch |
| `/admin/content/[id]/delete` | 28 | Post-launch |
| `/admin/subscribers` | 15 | Post-launch |
| `/admin/email-logs` | 16 | Later automation |
| `/admin/email-logs/resend` | 27 | Later automation |
| `/admin/email-templates` | 31 | Post-launch |
| `/account/billing` | 33 | Post-launch |
| `/account/billing/portal` | 22 | Post-launch |
| `/account/cancel` | 18 | Post-launch |
| `POST /api/webhooks/resend` | — | Later automation |
| `GET /api/cron/*` | — | Later automation |

---

## Build status snapshot (repo)

| Launch screen | Status (2026-05-17) |
|---------------|---------------------|
| 01, 02 | Done — UI + visual depth + responsive gates |
| 03, 13 | Done — UI + gates; auth not wired |
| 32, 11, 12 | Done — UI + gates; Lemon Squeezy / paywall logic not wired |
| 04–08 | Placeholder pages only |
| 09, 20 | Placeholder pages only |
| 24, 25 | Done (Phase 2); classified as beta polish tier |
| Legal (Terms, Privacy, Refund) | **Done** — `/terms`, `/privacy`, `/refund-policy` (2026-05-17) |

---

## Legal pages (implemented)

**Status:** **Implemented** in app (2026-05-17). Content is a **public-facing draft** pending final solicitor review (`docs/legal-public-content-draft.md` — internal checklist only).

| Route | Document |
| --- | --- |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |
| `/refund-policy` | Refund Policy |

**Confirmed public values:**

| Field | Value |
| --- | --- |
| Support email | `basscally.enquiry@gmail.com` |
| Address display | Registered in England & Wales, Company No. 16656420. Registered office address available on request. |
| Payment provider (legal copy) | Lemon Squeezy only — **Stripe and PayPal are not active providers** and must not appear on public legal pages |

**QA:** `node scripts/legal-audit.mjs` and `scripts/responsive-audit.mjs` (legal routes) — **PASS** (2026-05-17). See `docs/legal-pages-build-plan.md`.

**Footer placeholder P1:** **Resolved** — marketing footer and auth login footer link to real legal routes; Contact uses `mailto:basscally.enquiry@gmail.com`.

**Next build step:** **Phase B — Backend foundation** (Supabase, Lemon Squeezy webhooks, auth wiring) after legal route audit passes. Legal wording sign-off remains a parallel doc/counsel task, not a code blocker for Phase B.

---

## Phase A quality gates (selling path)

**Visual depth pass date:** 2026-05-17  
**Responsive deep audit date:** 2026-05-17  
**Motion stabilization date:** 2026-05-17

| Gate | Doc / tool | Result |
|------|------------|--------|
| Visual depth | `docs/visual-depth-quality-gate.md` | **PASS** (P0) |
| Responsive | `docs/mobile-responsive-quality-gate.md` + `scripts/responsive-audit.mjs` | **PASS** (72/72 incl. legal routes) |
| Motion | `docs/motion-audit-rules.md` + `scripts/motion-qa.mjs` | **PASS** (36/36) |
| Build | `typecheck`, `lint`, `build` | **PASS** |

**Routes covered:** `/`, `/pricing`, `/auth/login`, `/auth/callback`, `/checkout/success`, `/checkout/cancelled`, `/terms`, `/privacy`, `/refund-policy`.

**Breakpoints covered:** 320, 375, 390, 768, 1024, 1280, 280 (stress), 1440+ (stress); motion automation also at 1440.

### Resolved P1 (2026-05-17)

- **Legal footer placeholders** — `/terms`, `/privacy`, `/refund-policy` live; marketing + login footers updated; support email `basscally.enquiry@gmail.com`.

### Remaining P1 (does not block Phase B)

- Manual keyboard/focus walkthrough on selling-path and legal routes.
- Optional device check: landing sticky CTA at 375×667.
- **Solicitor review** of public legal copy (`docs/legal-public-content-draft.md` internal section).
- Re-run `responsive-audit.mjs`, `legal-audit.mjs`, and `motion-qa.mjs` after any selling-path or legal UI change.

### Mandatory checks for every new screen

Before merge, every new route or major surface must pass:

1. Visual depth check (`docs/visual-depth-quality-gate.md`)  
2. Responsive collision check (`docs/mobile-responsive-quality-gate.md` + `scripts/responsive-audit.mjs`)  
3. Motion containment check (`docs/motion-audit-rules.md` + `scripts/motion-qa.mjs`)  
4. Touch target check (responsive gate §5)

**No backend phase rule:** Do **not** start **Phase B** (or later backend/integration work) if any selling-path route has a **P0** fail on visual depth, responsive layout, motion, or touch.

---

## Revised build sequence (after this document)

### Phase A — Launch marketing & checkout

**Quality gates:** **Cleared** (2026-05-17) — see table above.

**Functional work still in Phase A** (product scope; not gate blockers):

1. Screen **32** `/pricing` — wire Lemon Squeezy checkout URLs (env variants); paywall state for Screen **08**.  
2. Screens **11, 12** — ensure success/cancelled copy and access rules match real subscription state (no fake unlock).  
3. Screen **08** paywall state on `/pricing` for expired/anonymous.

### Phase B — Backend foundation (**next — after legal route audit PASS**)

Legal pages and footer links are implemented and audited (2026-05-17). Proceed with payment integration:

4. Supabase project, schema (`users`, `subscriptions`, `content`), Storage bucket.  
5. Lemon Squeezy webhook + subscription access helpers (hosted checkout only — not Stripe/PayPal).  
6. Wire auth login/callback (replace UI-only login).

### Phase C — Member core

7. Screens **04, 05** dashboard.  
8. Screen **06** content detail + player + signed download API.  
9. Screen **07** account membership.

### Phase D — Admin publish path

10. Screens **09, 20** upload form + publish success (no email queue).  
11. Admin allowlist guard on upload routes.

### Phase E — Launch hardening

12. End-to-end test: pay → webhook → login → dashboard → download.  
13. Private beta items as needed (17, 21, 26, API rate limit).

### Post-launch / automation

- Follow sections 3 and 4 above; ignore BUILD_SEQUENCE_GUIDE “all 33 before complete” audit for launch sign-off.

---

## References

- `docs/legal-pages-build-plan.md` — legal routes implementation and QA  
- `docs/legal-public-content-draft.md` — public copy source + internal solicitor checklist  
- `docs/visual-depth-quality-gate.md` — depth addendum (does not replace locked design system)  
- `docs/mobile-responsive-quality-gate.md` — official responsive QA gate  
- `docs/motion-audit-rules.md` — motion containment and reduced-motion rules  
- `docs/basscally-build-pack/00_START_HERE/BUILD_SEQUENCE_GUIDE.md` — original phase prompts (still useful per-tier)  
- `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/09_routes_wiring_screen_map_and_components.md` — full route table  
- `docs/basscally-build-pack/04_BACKEND_DOCUMENTATION/08_architecture_backend_auth_payments_email_logic.md` — data model and access rules  

When this document conflicts with “ship all 33 screens,” **this document wins for prioritization**. Design system and architecture docs still win for visuals and backend behavior.
