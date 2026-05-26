# Basscally Hub — Full Button & Function Audit

**Version:** 2.0 (post-recommendations from Michael + Chris)
**Date:** May 2026
**Purpose:** Every interactive element across every screen, verified against the new strategic recommendations. Zero assumptions. If a button doesn't have a confirmed target, it's flagged.
**Status codes:** ✅ Built in reference HTML | ⚠️ Designed but needs update | 🔴 Missing — must build before MVP | 🟡 New requirement from recommendations

---

## Canonical routes (repo truth — Phase A built)

| Topic | Canonical in app (`src/lib/routes.ts`) | Legacy in this audit |
| --- | --- | --- |
| Terms | `/terms` | `/legal/terms` |
| Privacy | `/privacy` | `/legal/privacy` |
| Refund | `/refund-policy` | `/legal/refund` |

Do **not** replace live routes with `/legal/*`. Optional redirects may be added later. Footer and `MarketingFooter` already use `/terms`, `/privacy`, `/refund-policy`.

---

## NAMING CHANGE — BH-01 COMPLETE (2026-05-25)

| Was | Now | Impact |
|---|---|---|
| Basscally Club | **Basscally Hub** | Domain stays basscally.club; live UI + legal source updated |
| Walkthrough | **Resource Centre** | Nav label + page title (route `/resources` still pending) |
| Every 3 days | **Weekly** | Landing, FAQ, checkout, plans metadata |
| Drops from Chris | **Drops from Chris + world-class bassists** | Hero, value cards, FAQ, checkout success |

**copy docs updated** — see `docs/AUTO-REPORTS/BH-01-NAMING-PASS.md`. Build-pack HTML archives retain historical “Club” strings as reference only.

---

## MARKETING / PUBLIC SCREENS

### Screen 1+2 — Landing Page (`/`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Nav: "Basscally Hub" wordmark | Links to `/` | ✅ | Rename from Club |
| Nav: "Sign in" | Links to `/auth/login` | ✅ | — |
| Nav: "Join — $1.50/mo" | Links to LS checkout (founding member variant) | ✅ | Confirm LS URL wired |
| Hero CTA: "Join the Hub — $1.50/month" | Links to LS checkout | ✅ | Rename copy |
| Hero drops rail: drop items | Non-interactive (display only) | ✅ | — |
| Stat strip | Non-interactive (display only) | ✅ | — |
| Value cards (4) | Non-interactive (display only) | ✅ | — |
| How it works steps | Non-interactive | ✅ | — |
| Who it's for checklist | Non-interactive | ✅ | — |
| Testimonials | Non-interactive | ✅ | Swap placeholders with real comments |
| Why $1.50 section | Non-interactive | ✅ | — |
| Founding member CTA: "Become a Founding Member" | Links to LS checkout | ✅ | Add real spot counter from DB |
| Founding member counter: "500 spots remaining" | 🔴 Must pull live from DB | 🔴 | Countdown timer = real number |
| FAQ accordion: each question | Expand/collapse answer | ✅ | Update copy: weekly, bassists, Resource Centre |
| Final CTA: "Join Basscally Hub" | Links to LS checkout | ✅ | Rename |
| Footer: Terms of Service | Links to `/terms` | ✅ | Built Phase A |
| Footer: Privacy Policy | Links to `/privacy` | ✅ | Built Phase A |
| Footer: Refund Policy | Links to `/refund-policy` | ✅ | Built Phase A |
| Footer: TikTok icon | Links to TikTok profile | ✅ | Insert real URL |
| Footer: Instagram icon | Links to IG profile | ✅ | Insert real URL |
| Footer: YouTube icon | Links to YouTube (if applicable) | ✅ | Confirm or remove |
| Footer: contact email | Opens email client | ✅ | Use basscally.enquiry@gmail.com |
| Mobile sticky CTA: "Join — $1.50/mo" | Links to LS checkout | ✅ | Appears after hero CTA scrolls away |

**🟡 NEW — Three-click flow:** The current landing page IS click 1. Click 2 must go to an Artist/Style page, not straight to pricing. This means the primary CTA destination changes from direct checkout to the Hub/style page for cold traffic. Direct checkout stays for warm/returning traffic.

---

### Screen NEW: Waitlist Page (`/waitlist`) 🟡

**Does not exist yet. Chris requested this.**

| Element | Function | Status |
|---|---|---|
| Email input | Capture email | 🔴 |
| "Join the waitlist" button | POST email to DB waitlist table | 🔴 |
| Success state | "You're on the list. We'll email you on launch day." | 🔴 |
| Social share nudge | "Tell a bassist" + TikTok/IG share links | 🔴 |

**Build: simple page, email capture → `waitlist` table in Supabase, no auth required.**

---

### Screen NEW: Artist/Style Page (`/style/[slug]`) 🟡

**Does not exist yet. This is the most important new screen from Michael's recommendations.**

This is click 2 in the new three-click flow. Someone clicks from TikTok → Hub → Artist/Style page.

| Element | Function | Status |
|---|---|---|
| Artist hero image (e.g. Tribe Fuego) | Non-interactive (visual anchor) | 🔴 |
| Style headline ("Play Makossa like Tribe Fuego") | Non-interactive | 🔴 |
| Practice track previews (3–5 tracks) | Play 30-second preview (gated — full track needs subscription) | 🔴 |
| Preview play button | Plays short preview clip, then hits paywall | 🔴 |
| "Unlock all tracks" CTA | Links to checkout (founding member variant) | 🔴 |
| Difficulty/type badges per track | Non-interactive (display) | 🔴 |
| "What you'll learn" section | Non-interactive | 🔴 |
| Checkout CTA (bottom, sticky on mobile) | Links to LS checkout | 🔴 |

**Build: server-rendered page from content tagged with artist/style. Requires `styles` and `artists` tables in DB, and content tagged to a style.**

---

### Screen 32 — Pricing Page (`/pricing`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Monthly plan CTA | Links to LS monthly variant checkout | ✅ | Confirm LS variant ID wired |
| Founding Member plan CTA (centre, highlighted) | Links to LS founding member variant checkout | ✅ | **This must be the most prominent** |
| Annual plan CTA | Links to LS annual variant checkout | ✅ | Confirm LS annual variant ID |
| Founding member spot counter | Pulls from DB live | 🔴 | Must be real, not static |
| Orbit animation | Decorative only | ✅ | Motion audit pass needed after fix |
| Wave bars | Decorative only | ✅ | — |
| Plan comparison features list | Non-interactive | ✅ | — |

---

## AUTH SCREENS

### Screen 3 — Login (`/auth/login`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Email input | Accepts email address | ✅ | font-size ≥ 16px (iOS zoom) |
| "Send magic link" button | POST to Supabase auth magic link | ✅ | Wire real Supabase call |
| Loading state (spinner) | Shows while waiting for Supabase response | ✅ | — |
| Error state (invalid email) | Inline error message | ✅ | — |
| Success state | "Check your email" panel + entered email shown | ✅ | — |
| "Resend" link (in success state) | Calls magic link again with same email | ✅ | Rate-limit this (Supabase default is 60s) |
| "Don't have an account? Join for $1.50" | Links to LS checkout | ✅ | Rename to Hub |
| "Back" link | Links to `/` | ✅ | — |

---

### Screen 13 — Auth Callback (`/auth/callback`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Animated vinyl/loading | Non-interactive, decorative | ✅ | Motion audit — scanline fix needed |
| Status: "Verifying your link" | Non-interactive | ✅ | — |
| Auto-redirect to `/dashboard` on success | Supabase session confirmed → redirect | 🔴 | Wire real redirect logic |
| Error state: link expired | Show error + "Request new link" button | ✅ | — |
| "Request new link" button | Redirects to `/auth/login` | ✅ | — |

---

## MEMBER SCREENS

### Screen 4 — Dashboard Empty (`/dashboard`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Sidebar: "Dashboard" link | Active state (current page) | ✅ | — |
| Sidebar: "All Drops" link | Links to `/dashboard?filter=all` | ✅ | — |
| Sidebar: content type filter links | Filter dashboard grid | ✅ | — |
| Sidebar: "Membership" link | Links to `/account` | ✅ | — |
| Sidebar: "Sign out" link | Calls Supabase signOut() → redirects to `/` | ✅ | Wire real signOut |
| Empty state: "Back to home" button | Links to `/` | ✅ | — |
| Mobile bottom nav: Home | Active, `/dashboard` | ✅ | — |
| Mobile bottom nav: Library | `/dashboard?filter=all` | ✅ | — |
| Mobile bottom nav: Files | `/dashboard?filter=downloaded` | ✅ | — |
| Mobile bottom nav: You | `/account` | ✅ | — |

---

### Screen 5 — Dashboard Populated (`/dashboard`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Latest drop: "Play" button | Opens content detail `/c/[id]` or plays inline | ✅ | Decide: inline or navigate |
| Latest drop: "Download" button | Calls `/api/content/[id]/download` | ✅ | Wire gated download API |
| Filter tabs (All/Bass-less/Grooves/Fills/Challenges) | Filters content grid | ✅ | Wire DB query filter |
| Content card (each) | Clicking card → `/c/[id]` | ✅ | — |
| Content card hover: play overlay button | Navigates to `/c/[id]` | ✅ | — |
| Right rail: next drop countdown | Live countdown to `scheduled_for` | ✅ | Wire real `scheduled_for` from DB |
| Right rail: upcoming drop items | Non-interactive (display) | ✅ | Pull from DB |
| Mobile bottom nav | Same as Screen 4 | ✅ | — |

**⚠️ Download decision:** Per recommendation #8, downloads stay but streaming is primary. The download button should NOT be the first CTA. Play is primary, download is secondary. Confirm this ordering in the design.

---

### Screen 6 — Content Detail (`/c/[id]`)

| Element | Function | Status | Flag |
|---|---|---|---|
| "Back to library" link | Browser back / `/dashboard` | ✅ | — |
| Audio player: Play/Pause button | HTML5 audio play/pause | ✅ | Wire real audio `src` from Supabase Storage signed URL |
| Audio player: scrub bar | Seek audio to position | ✅ | Wire `currentTime` update |
| Audio player: time display | Shows `currentTime / duration` | ✅ | Wire real values |
| "Download audio" button | Calls `/api/content/[id]/download` | ✅ | Wire gated API — check subscription status server-side |
| Download blocked state | Shows if rate-limited or subscription lapsed | ✅ | Wire Screen 30 (rate limit state) |
| "Share" button | Web Share API or copy link | ✅ | Confirm: share the `/c/[id]` URL? Or a public preview? |
| Metadata (type, difficulty, duration, date, downloads, issue) | Non-interactive (display) | ✅ | Pull from DB |

**🔴 CRITICAL — Download API must verify subscription server-side.** The button existing in the UI is not enough. The API route must check `subscriptions` table before returning the signed URL. A lapsed member must get a 403 → paywall redirect, not the file.

---

### Screen 7 — Account / Membership (`/account`)

| Element | Function | Status | Flag |
|---|---|---|---|
| "Manage billing" button | Redirects to LS customer portal | ✅ | Wire real LS portal URL |
| "Cancel subscription" link/button | Opens cancel confirmation modal (Screen 20) | ✅ | — |
| Cancel confirmation modal: "Yes, cancel" | Calls LS API or directs to LS portal cancel flow | ✅ | Wire real cancellation |
| Cancel confirmation modal: "Keep my membership" | Closes modal | ✅ | — |
| Membership status badge | Reads from `subscriptions` table live | ✅ | Wire real status |
| Founding member badge | Reads `is_founding_member` from DB | ✅ | — |
| Period end date | Reads `period_end` from DB | ✅ | — |
| "Sign out" | Supabase signOut() | ✅ | — |

---

### Screen 8 — Paywall / Re-subscribe (`/paywall` or `/pricing`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Locked drop preview (blurred) | Non-interactive (decorative lock state) | ✅ | — |
| "Reactivate membership" primary CTA | Links to LS checkout (monthly variant) | ✅ | — |
| Founding member re-join note | Only show if `is_founding_member=true` AND founding spots remain | 🔴 | Logic needed |
| Plan options | Same as pricing page variants | ✅ | — |

---

### Screen 33 — Account Billing Management (`/account/billing`)

| Element | Function | Status | Flag |
|---|---|---|---|
| "Open billing portal" button | Redirects to LS customer portal URL | ✅ | Wire LS portal URL |
| Invoice download links | Pull from LS API or portal | 🔴 | LS portal handles this; link out |
| Plan switch options | Routes to LS portal for plan change | ✅ | — |

---

## CHECKOUT SCREENS

### Screen 11 — Checkout Success (`/checkout/success`)

| Element | Function | Status | Flag |
|---|---|---|---|
| "Go to dashboard" CTA | Links to `/dashboard` | ✅ | — |
| "Resend magic link" button | Calls magic link send again | ✅ | — |
| Membership pass (status, plan, renewal) | Reads from webhook-populated DB | ✅ | Wire real data |
| WhatsApp community link | 🟡 NEW — links to WhatsApp group invite | 🔴 | Add per recommendation #5 |
| Welcome email confirmation | "Check your email" note | ✅ | Triggered by webhook |

---

### Screen 12 — Checkout Cancelled (`/checkout/cancelled`)

| Element | Function | Status | Flag |
|---|---|---|---|
| "Try again" primary CTA | Links back to LS checkout | ✅ | — |
| "See what you get" secondary CTA | Links to `/` or style page | ✅ | — |
| Founding member price reassurance | Non-interactive | ✅ | — |

---

## ADMIN SCREENS

### Screen 9 — Admin Upload Form (`/admin/content/new`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Audio file upload zone | Uploads to Supabase Storage `audio` bucket (private) | ✅ | Wire Supabase Storage upload |
| Title input | Text, max 80 chars | ✅ | — |
| Content type select | Bass-less / Groove / Fill / Challenge | ✅ | — |
| Difficulty select | Beginner / Intermediate / Advanced | ✅ | — |
| Release date/time picker | Sets `scheduled_for` | ✅ | — |
| Description textarea | Max 500 chars | ✅ | — |
| Cover image upload (optional) | Uploads to Supabase Storage `covers` bucket | ✅ | Wire or make truly optional |
| Artist/style tag field | 🟡 NEW — tag content to artist/style for style pages | 🔴 | Add per recommendation #4 |
| Status toggle: Draft / Scheduled / Publish now | Sets `status` on content row | ✅ | — |
| Email subject input | Sets email notification subject | ✅ | — |
| Email body textarea | Sets email notification body | ✅ | — |
| "Preview email" button | Opens email preview (Screen 27) | ✅ | Screen 27 must exist |
| "Save drop" button | POSTs to `/api/admin/content` | ✅ | Wire API |
| "Cancel" button | Navigates to `/admin/content` | ✅ | — |

---

### Screen 10 — Admin Metrics Dashboard (`/admin`)

| Element | Function | Status | Flag |
|---|---|---|---|
| "Export CSV" button | Downloads subscribers as CSV | ✅ | Wire DB query → CSV response |
| Metric cards (4) | Non-interactive (display, live data from DB) | ✅ | Wire real queries |
| Sparkline bars | Non-interactive (decorative) | ✅ | — |
| Next drop countdown | Reads `scheduled_for` from next content row | ✅ | Wire real DB query |
| "New drop" button | Links to `/admin/content/new` | ✅ | — |
| Content table search | Filters content by title | ✅ | Wire client-side filter or DB query |
| Table: "Edit" button (per row) | Links to `/admin/content/[id]` | ✅ | Screen must exist (Screen 21+22) |
| Table: "Resend" button (per row) | Opens resend confirmation (Screen 26) | ✅ | Screen must exist |
| Table: "Publish" button (scheduled rows) | Updates status → published, triggers email job | ✅ | Wire API |
| Table: "Delete" button (draft rows) | Opens soft delete confirmation (Screen 29) | ✅ | Screen must exist |

---

### Screens 21–22 — Admin Content Edit (`/admin/content/[id]`)

| Element | Function | Status | Flag |
|---|---|---|---|
| All fields same as upload form | Pre-populated from DB | 🔴 | Must be built separately from new form |
| "Save changes" button | PATCH to `/api/admin/content/[id]` | 🔴 | — |
| "Soft delete" button | Opens Screen 29 confirmation | 🔴 | — |

---

### Screen 23 — Admin Subscribers List (`/admin/subscribers`)

| Element | Function | Status | Flag |
|---|---|---|---|
| Search input | Filter by email | 🔴 | — |
| Status filter | Active / Cancelled / Past-due | 🔴 | — |
| Subscriber rows | Non-interactive (display) | 🔴 | — |
| Pagination | Next/prev | 🔴 | — |

---

## UTILITY SCREENS

### Screen 14 — 404 Page

| Element | Function | Status |
|---|---|---|
| "Go home" CTA | Links to `/` | 🔴 |

---

### Screen 15 — 500 Page

| Element | Function | Status |
|---|---|---|
| "Try again" CTA | Reloads or links to `/` | 🔴 |

---

### Screen 16 — Admin Unauthorized

| Element | Function | Status |
|---|---|---|
| "Go home" CTA | Links to `/` | 🔴 |

---

### Screen 20 — Cancel Confirmation Modal

| Element | Function | Status |
|---|---|---|
| "Yes, cancel" | Triggers LS cancel or portal redirect | 🔴 |
| "Keep my membership" | Closes modal | 🔴 |

---

### Screen 25 — Past-due Banner (component, not full page)

| Element | Function | Status |
|---|---|---|
| "Update payment" button | Opens LS customer portal | 🔴 |

---

### Screen 30 — Rate Limit / Download Blocked State

| Element | Function | Status |
|---|---|---|
| "Try again later" — no button | Informational only | 🔴 |

---

### Screens 34–36 — Legal Pages (`/terms`, `/privacy`, `/refund-policy`)

| Element | Function | Status |
|---|---|---|
| Page content | Static legal copy in app | ✅ Phase A |
| Back to home link | `/` | ✅ |
| Footer cross-links | `/terms`, `/privacy`, `/refund-policy` | ✅ |

---

## API ROUTES — complete inventory

Every API call the buttons above depend on. If any of these don't exist, the button it's connected to silently fails.

| Route | Method | What it does | Status |
|---|---|---|---|
| `/api/webhooks/lemonsqueezy` | POST | Receives LS events, updates `subscriptions` table | 🔴 Phase B |
| `/api/content/[id]/download` | GET | Verifies subscription, returns signed Storage URL | 🔴 Phase B |
| `/api/admin/content` | POST | Creates new content row + triggers email if published | 🔴 Phase B |
| `/api/admin/content/[id]` | GET/PATCH/DELETE | Read, update, soft-delete content | 🔴 Phase B |
| `/api/admin/subscribers` | GET | Returns paginated subscriber list with status | 🔴 Phase B |
| `/api/admin/metrics` | GET | Returns active subs, MRR, new this month, failures | 🔴 Phase B |
| `/api/admin/email/resend/[id]` | POST | Resends notification email for a content drop | 🔴 Phase B |
| `/api/admin/export/subscribers` | GET | Returns CSV of subscriber list | 🔴 Phase B |
| `/api/waitlist` | POST | Adds email to `waitlist` table | 🔴 New |
| `/auth/callback` | GET | Handles Supabase magic link callback | 🔴 Phase B |

---

## NEW SCREENS REQUIRED (not in original 33)

| # | Screen | Route | Why needed | Priority |
|---|---|---|---|---|
| 34 | Artist/Style Page | `/style/[slug]` | Three-click flow click 2 — the "desire" page | P0 — changes conversion architecture |
| 35 | Waitlist Page | `/waitlist` | Chris requested for pre-launch | P0 — needed before public |
| 36 | Resource Centre Index | `/resources` | Replaces "Walkthrough" nav item | P1 |

---

## DECISIONS STILL OPEN — resolve before build

| # | Decision | Who decides | Blocks |
|---|---|---|---|
| D1 | Confirm name is "Basscally Hub" everywhere | Michael + Chris | All screens, copy, build |
| D2 | Artist/Style page: which artists/styles at launch? (need real content) | Chris | Screen 34 build |
| D3 | Preview tracks on style page: 30 seconds? Full? | Michael | Screen 34 build |
| D4 | Share button on content detail: share `/c/[id]` (member-only) or a public preview URL? | Michael | Screen 6 |
| D5 | WhatsApp community link for checkout success — is the group ready? | Chris | Screen 11 |
| D6 | Founding member cap: still 500? Or different number at launch? | Michael | Pricing page counter + paywall logic |
| D7 | Annual plan: $18/year confirmed? Include at launch or post-MVP? | Michael | LS product setup, pricing page |
| D8 | Download rate limit: how many downloads per day per member? | Michael | Screen 30, download API |
| D9 | "Resource Centre" — what content lives there at launch? | Chris | Screen 36 build |

---

## SUMMARY — what's actually missing before MVP

| Category | Count | Priority |
|---|---|---|
| New screens not designed | 3 (34, 35, 36) | P0–P1 |
| API routes not built | 10 | P0 (Phase B) |
| Existing screens with unwired functions | ~14 elements | P0 (Phase B) |
| Copy updates (naming, cadence, artists) | All screens | Before Codex build |
| Open decisions blocking build | 9 | Before Phase B |
| Legal pages not yet built | 3 | Before public launch |

**The critical path:** Resolve open decisions D1–D6 → do naming pass on all copy docs → design Screen 34 (style page) and Screen 35 (waitlist) → then Phase B build starts with a complete, unambiguous spec.

---

*This audit is the gate. Every button listed as 🔴 must have a working function before the MVP acceptance criteria in PRD §13 can be called complete.*
