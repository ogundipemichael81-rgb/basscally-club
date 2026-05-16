# Basscally Club — Cursor / Codex Build Prompt

**Purpose:** Paste this entire document into Cursor (Composer / Agent mode), Codex, or any AI coding assistant to scaffold the Basscally Club MVP.

**Companion docs to also feed alongside this:**
- `01_PRD_basscally_club_mvp.md` (the PRD)
- `02_landing_page_copy_and_wireframe.md` (landing page spec)

---

## ROLE & MODE

You are a senior full-stack engineer building a production MVP. Prioritize:
1. **Shipping** over abstraction
2. **Type safety** end-to-end
3. **Reading clarity** — code that a future dev (or LLM) can pick up in 15 minutes
4. **Server-first thinking** — minimize client JavaScript

Build incrementally. After each phase, stop and report what was built, what's next, and any decisions you made that I should confirm. Don't generate the whole repo in one shot.

---

## PROJECT BRIEF

I am building **Basscally Club**, a $1.50/month bass practice membership for a global audience driven from TikTok (90k+ followers) and Instagram (10k+ followers).

**Core flow:**
1. User clicks bio link → lands on `/`
2. Clicks `Join — $1.50/month` → Lemon Squeezy checkout
3. Pays → returns to `/checkout/success` → magic-link email arrives
4. Clicks magic link → lands on `/dashboard` → sees latest drop + library

**Admin flow:**
1. Admin logs in to `/admin`
2. Uploads audio + metadata via form
3. Clicks Publish → email auto-sent to all active subscribers within 5 minutes
4. Monitors metrics, subscribers, email send status

**Content:** Audio files only (no video at MVP). New drop every 3 days.

---

## TECH STACK (locked decisions)

| Layer | Tool | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | RSC, server actions, Vercel deploy |
| Language | **TypeScript (strict)** | non-negotiable |
| Styling | **Tailwind CSS v4** | speed |
| UI primitives | **shadcn/ui** | copy-in, no lock-in |
| Database | **Supabase Postgres** | DB + Auth + Storage in one |
| Auth | **Supabase Auth (magic link)** | passwordless; matches 3-click flow |
| ORM | **Drizzle** | type-safe, lightweight |
| Storage | **Supabase Storage** (private bucket) | co-located with DB |
| Payments | **Lemon Squeezy** | merchant-of-record, global tax handled |
| Email | **Resend** | transactional, simple API |
| Background jobs | **Vercel Cron + database queue table** OR **Inngest** | start with cron, upgrade if needed |
| Analytics | **Plausible** (self-hosted or cloud) | cookieless, GDPR-friendly |
| Hosting | **Vercel** | matches Next.js |
| Domain | `basscally.club` (assumed; confirm before deploy) |

**Do NOT introduce additional libraries without asking first.**

---

## REPO STRUCTURE TO CREATE

```
basscally-club/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Landing page
│   │   ├── pricing/page.tsx            # Pricing page (optional, link to checkout)
│   │   └── layout.tsx                  # Marketing layout
│   ├── (member)/
│   │   ├── dashboard/page.tsx          # Member dashboard
│   │   ├── c/[id]/page.tsx             # Content detail (audio + download)
│   │   ├── account/page.tsx            # Subscription management
│   │   └── layout.tsx                  # Member layout (auth-gated)
│   ├── (admin)/
│   │   ├── admin/page.tsx              # Admin metrics home
│   │   ├── admin/content/page.tsx      # Content list
│   │   ├── admin/content/new/page.tsx  # Upload form
│   │   ├── admin/content/[id]/page.tsx # Edit content
│   │   ├── admin/subscribers/page.tsx  # Subscriber list
│   │   └── layout.tsx                  # Admin layout (admin-gated)
│   ├── checkout/
│   │   ├── success/page.tsx            # Post-payment landing
│   │   └── cancelled/page.tsx
│   ├── api/
│   │   ├── webhooks/
│   │   │   └── lemonsqueezy/route.ts   # LS webhook handler
│   │   ├── content/[id]/download/route.ts  # Signed URL issuer
│   │   └── cron/
│   │       └── publish-scheduled/route.ts  # Publish scheduled drops
│   ├── auth/
│   │   ├── callback/route.ts           # Supabase magic link callback
│   │   └── login/page.tsx
│   ├── layout.tsx                      # Root layout
│   └── globals.css
├── components/
│   ├── ui/                             # shadcn primitives
│   ├── marketing/
│   │   ├── hero.tsx
│   │   ├── value-cards.tsx
│   │   ├── how-it-works.tsx
│   │   ├── social-proof.tsx
│   │   ├── faq.tsx
│   │   └── cta-section.tsx
│   ├── member/
│   │   ├── content-card.tsx
│   │   ├── audio-player.tsx
│   │   └── subscription-status.tsx
│   └── admin/
│       ├── content-form.tsx
│       ├── metrics-card.tsx
│       └── subscriber-table.tsx
├── lib/
│   ├── db/
│   │   ├── index.ts                    # Drizzle client
│   │   ├── schema.ts                   # Schema definitions
│   │   └── queries.ts                  # Common queries
│   ├── auth.ts                         # Supabase auth helpers
│   ├── subscription.ts                 # Active-sub checker
│   ├── payments/
│   │   ├── lemonsqueezy.ts             # LS API wrapper
│   │   └── webhook-verify.ts           # Signature verification
│   ├── email/
│   │   ├── resend.ts                   # Resend client
│   │   ├── templates/
│   │   │   ├── magic-link.tsx
│   │   │   ├── new-drop.tsx
│   │   │   ├── payment-failed.tsx
│   │   │   └── welcome.tsx
│   │   └── send.ts                     # Sending logic
│   ├── storage.ts                      # Signed URL generation
│   └── utils.ts
├── drizzle/
│   └── migrations/
├── public/
├── .env.example
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ENVIRONMENT VARIABLES (.env.example)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=

# Lemon Squeezy
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_PRODUCT_VARIANT_ID=
LEMONSQUEEZY_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@basscally.club

# App
NEXT_PUBLIC_APP_URL=https://basscally.club
CRON_SECRET=

# Admin bootstrap (comma-separated emails)
ADMIN_EMAILS=michael@example.com,chris@example.com
```

---

## DATABASE SCHEMA (Drizzle)

Generate `lib/db/schema.ts` with these tables. Use `uuid` primary keys, `created_at` defaults, and proper enums.

```typescript
// Tables:
// - users (id, email unique, name, country, is_founding_member, created_at, last_login_at)
// - subscriptions (id, user_id fk, provider enum, provider_subscription_id unique,
//                  status enum: active|cancelled|past_due|expired|paused,
//                  current_period_start, current_period_end, cancel_at_period_end,
//                  created_at, updated_at)
// - content (id, title, type enum: bassless_track|groove|fill|challenge,
//            description, difficulty enum: beginner|intermediate|advanced,
//            audio_storage_key, cover_image_url nullable,
//            status enum: draft|scheduled|published,
//            scheduled_for nullable, published_at nullable,
//            email_subject, email_body, created_by_admin_id fk, created_at)
// - downloads (id, user_id fk, content_id fk, downloaded_at)
// - email_logs (id, user_id fk, content_id fk,
//               status enum: queued|sent|failed|bounced,
//               provider_message_id nullable, error_reason nullable,
//               sent_at nullable, created_at)
// - admins (id, email unique, name, role enum: super_admin|content_admin|viewer,
//           created_at, last_login_at)
// - email_queue (id, user_id fk, content_id fk, status enum: pending|processing|sent|failed,
//                attempts int default 0, scheduled_for, created_at)

// Add indexes on:
// - subscriptions.user_id, subscriptions.status
// - content.status, content.published_at, content.scheduled_for
// - downloads.user_id
// - email_logs.content_id, email_logs.status
// - email_queue.status, email_queue.scheduled_for
```

After scaffolding, generate Drizzle migrations and a seed script that creates 3 example content rows and 2 admin users from `ADMIN_EMAILS`.

---

## BUILD PHASES — EXECUTE ONE AT A TIME

### Phase 1 — Scaffolding
1. Initialize Next.js 15 project with TypeScript, Tailwind v4, ESLint
2. Install dependencies: `drizzle-orm`, `drizzle-kit`, `@supabase/supabase-js`, `@supabase/ssr`, `resend`, `react-email`, `zod`, `lucide-react`
3. Set up shadcn/ui (init + add button, card, input, textarea, select, dialog, badge, table, dropdown-menu)
4. Create `.env.example` and `lib/env.ts` (Zod-validated env loader)
5. Set up Drizzle config + schema + initial migration
6. Set up Supabase server/client helpers in `lib/auth.ts`

**STOP. Report what was done. Confirm before continuing.**

### Phase 2 — Landing page
Build the landing page at `app/(marketing)/page.tsx` per the spec in `02_landing_page_copy_and_wireframe.md`.

- All sections from the wireframe
- Sticky nav with `Join — $1.50/month` button
- Mobile-first responsive
- The `Join` button links to a Lemon Squeezy checkout URL (use placeholder `LEMONSQUEEZY_CHECKOUT_URL` env var for now)
- Use shadcn primitives
- Pull copy verbatim from the spec
- Add Plausible script tag in root layout

**STOP. Show the page running locally. Confirm copy + visuals.**

### Phase 3 — Auth + member dashboard skeleton
1. Implement Supabase magic-link auth
   - `/auth/login` page (single email field)
   - `/auth/callback` route handler
   - Middleware to protect `/(member)` and `/(admin)` routes
2. Build `/dashboard` page (auth-gated):
   - Hero: "Welcome back" + latest drop card
   - Tabs/filters: All / Bass-less / Grooves / Fills / Challenges
   - Grid of content cards
3. Build `/c/[id]` page:
   - Audio player (HTML5 `<audio>` for MVP)
   - Download button (calls `/api/content/[id]/download`)
   - Metadata: title, difficulty, description
4. Build `/account` page:
   - Subscription status
   - "Manage subscription" link (Lemon Squeezy customer portal)
   - Cancel link

**STOP. Demo the member-side flow with a manually-inserted user + subscription row.**

### Phase 4 — Lemon Squeezy integration
1. Create LS product variant ($1.50/month) — provide me the click-by-click steps for the LS dashboard
2. Build webhook handler at `/api/webhooks/lemonsqueezy/route.ts`:
   - Signature verification (HMAC SHA256 with webhook secret)
   - Handle: `subscription_created`, `subscription_updated`, `subscription_cancelled`, `subscription_expired`, `subscription_payment_failed`, `subscription_payment_success`
   - On `subscription_created`: upsert user, create subscription row, mark `is_founding_member=true` if subscriber count < 500, trigger magic-link email
   - **Idempotent:** use `provider_subscription_id` as unique constraint, ignore duplicate events
3. Update landing page Join CTA to use real LS checkout URL with prefilled email if logged in
4. Build `/checkout/success` and `/checkout/cancelled` pages

**STOP. Test with LS test mode. Confirm webhook fires and subscription row is created.**

### Phase 5 — Admin dashboard
1. Build `/admin` layout with admin-only middleware (check email against `ADMIN_EMAILS`)
2. `/admin` home: metrics cards (active subs, MRR, new this month, failed payments) — query DB live
3. `/admin/content` table view
4. `/admin/content/new` upload form per PRD §11:
   - Audio file upload → Supabase Storage (private bucket `audio`)
   - All metadata fields
   - Status toggle: Draft / Scheduled / Publish now
   - On "Publish now": insert content row with `status=published`, enqueue email send job
   - On "Scheduled": insert with `scheduled_for`, picked up by cron
5. `/admin/subscribers` table: search, filter, paginate

**STOP. Demo admin uploading and publishing a piece of content.**

### Phase 6 — Email automation
1. Set up Resend with verified domain (provide me click-by-click)
2. Build email templates with `react-email`:
   - Magic link
   - New drop notification (per PRD §9 template)
   - Payment failed
   - Welcome (sent 1 hour after first login)
3. Build send pipeline:
   - On content publish → insert rows into `email_queue` for each active subscriber
   - Vercel Cron runs every 1 minute, picks up pending queue items, sends via Resend, logs to `email_logs`
   - Retry failed sends up to 3 times with exponential backoff
4. Build `/api/cron/publish-scheduled/route.ts`:
   - Runs every 5 minutes
   - Finds content where `status=scheduled` and `scheduled_for <= now()`
   - Updates to `published`, triggers email queue

**STOP. Test full flow: admin publishes → emails queued → cron sends → logs show success.**

### Phase 7 — Content access gate
1. Build `/api/content/[id]/download/route.ts`:
   - Authenticate user
   - Check active subscription
   - If no active sub → 403 with paywall redirect URL
   - If active → generate Supabase Storage signed URL (1-hour expiry)
   - Log to `downloads` table
   - Return JSON with signed URL
2. Update content card download button to call this endpoint
3. Add subscription banner on dashboard for `past_due` users

**STOP. Test all access states from PRD §10.**

### Phase 8 — Pre-launch polish
1. Loading states everywhere (skeletons, not spinners)
2. Error boundaries
3. 404 + 500 pages branded
4. Mobile QA on real devices (request your help testing on iOS/Android)
5. SEO meta tags + Open Graph image
6. Sitemap.xml + robots.txt
7. Lighthouse audit: aim for 90+ on mobile

---

## CODING STANDARDS

- **Server Components by default.** Mark `'use client'` only when needed (event handlers, hooks, audio player).
- **Server Actions for mutations.** No REST endpoints for form submissions; use server actions.
- **Zod-validate all inputs** at API/server-action boundaries.
- **No `any`.** If types get hard, ask before reaching for `any`.
- **Naming:** `kebab-case` for files, `PascalCase` for components, `camelCase` for everything else.
- **One responsibility per file.** If a file exceeds ~200 lines, propose a split.
- **Comments explain WHY, not WHAT.** The code shows what.
- **Commit messages:** conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`).
- **No premature optimization.** Get correctness first.

---

## SECURITY REQUIREMENTS

- All admin routes gated by middleware + server-side email check (do NOT rely on client check)
- Webhook signature verification mandatory (reject unsigned)
- Signed URLs expire in 1 hour, never longer
- Service role key never exposed to client
- Use Supabase RLS (Row Level Security) on `content`, `downloads`, `subscriptions` even though API is the primary gate (defense in depth)
- Rate-limit `/api/content/[id]/download` to 60 requests per user per hour
- CSP headers in `next.config.ts` — no inline scripts except Plausible

---

## TESTING REQUIREMENTS (MVP-light, don't over-engineer)

- Type-check passes (`tsc --noEmit`)
- Lint passes
- Manual test checklist per PRD §13 (MVP acceptance criteria) — execute before declaring done
- One Playwright happy-path test: visitor → checkout (LS test mode) → dashboard → download

---

## WHAT TO ASK ME BEFORE PROCEEDING

If you hit any of these, **stop and ask**:
1. Domain not confirmed
2. Lemon Squeezy account setup details (UK company vs personal)
3. Brand colours, logo files, or font preferences
4. Whether to seed real content or placeholders
5. Any decision that requires me trading off speed vs flexibility
6. Anything in this prompt that conflicts with the PRD — flag it before assuming

---

## DELIVERY EXPECTATIONS

After each phase:
1. **What I built** (1–2 sentences per file changed)
2. **What's next** (the next phase, restated)
3. **Decisions I made** (list anything you chose without asking)
4. **Blockers / questions for you**
5. **How to test** (commands + URLs to click)

Don't pretend to be done if there are gaps. Surface them.

---

## START HERE

Confirm you've read this entire prompt and the companion PRD + landing page spec. Then begin **Phase 1 — Scaffolding**. After Phase 1, stop and wait.
