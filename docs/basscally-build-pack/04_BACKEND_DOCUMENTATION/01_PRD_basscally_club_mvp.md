# Basscally Club — Product Requirements Document (MVP)

**Version:** 1.0
**Date:** 15 May 2026
**Owners:** Michael (COO/co-founder), Chris (co-founder, public-facing)
**Status:** Draft for build

---

## 1. Product Summary

**Basscally Club** is a $1.50/month recurring subscription that turns Basscally's social audience (90k+ TikTok, 10k+ Instagram) into a global bass practice membership.

**Core promise to the member:**

> *"For $1.50/month, get a new bass practice drop every 3 days — bass-less covers, grooves, fills, and challenges — delivered to your inbox, ready to download and play."*

**Positioning:** Not a file store. A practice club. Members pay for habit, progress, identity, and community recognition — content is the engine, not the offer.

---

## 2. Goals & Non-Goals

### Goals (MVP)

1. Convert TikTok/Instagram traffic into recurring subscribers in **3 clicks or fewer**.
2. Deliver new audio content **every 3 days** with automated email notification.
3. Gate all content behind an **active subscription check**.
4. Operate with **zero manual email sending** from day one.
5. Hit **100 paying subscribers** within 60 days of launch.

### Non-Goals (MVP — explicitly deferred)

- Video content
- Live masterclasses inside the Club tier
- Marketplace, mentor booking, paid feedback
- AI feedback on member playing
- Mobile native app
- Leaderboards, XP, badges
- Community forum inside the product (use Discord externally for v1.1)

---

## 3. Audience & User Personas

### Primary persona: The Self-Taught Practicer
- Discovered Basscally on TikTok or Instagram
- 18–35 years old
- Plays bass casually, wants structure
- Located globally — Africa, UK, US, Asia, South America
- Will not pay $20/month for a masterclass platform, but $1.50 is frictionless
- Practices in short bursts; needs material delivered, not searched

### Secondary persona: The Returning Bassist
- Used to play, picked it back up
- Wants reps without commitment to lessons
- Values community recognition more than instruction

---

## 4. User Stories

### Subscriber

- As a visitor, I can land on the homepage and understand the offer in under 10 seconds.
- As a visitor, I can subscribe in 3 clicks: bio link → "Join for $1.50/month" → pay.
- As a new subscriber, I get instant access without waiting for a confirmation email.
- As a logged-in member, I see the latest drop on my dashboard immediately.
- As a member, I can filter content by type: bass-less track, groove, fill, challenge.
- As a member, I can download any audio file I have access to.
- As a member, I receive an email every time a new drop is published.
- As a member, I can cancel my subscription at any time without contacting support.
- As a former member, I lose access at the end of my paid period (no immediate cutoff mid-cycle).

### Admin

- As an admin, I can log in to a separate admin area.
- As an admin, I can upload an audio file with metadata in a single form.
- As an admin, I can schedule a drop for a future date.
- As an admin, I can choose to send the notification email immediately or on publish.
- As an admin, I can see total active subscribers, MRR, new this month, and failed payments at a glance.
- As an admin, I can see whether the notification email was sent successfully for each drop.

---

## 5. Feature List (MVP Scope)

### Member-facing
| Feature | Description | Priority |
|---|---|---|
| Landing page | Hero, value cards, social proof, pricing, CTA | P0 |
| Checkout | Lemon Squeezy hosted checkout, $1.50/mo | P0 |
| Account creation | Auto-created post-payment, magic link login | P0 |
| Member dashboard | Latest drop + content library by type | P0 |
| Content detail page | Audio player + download button | P0 |
| Subscription management | View status, update card, cancel | P0 |
| Email notifications | Triggered on every new drop publish | P0 |
| Founding member badge | Visible in dashboard for first 500 subscribers | P1 |

### Admin-facing
| Feature | Description | Priority |
|---|---|---|
| Admin login | Separate from member auth | P0 |
| Content upload form | File + all metadata in one form | P0 |
| Schedule/publish toggle | Draft / Scheduled / Published states | P0 |
| Subscriber list | Searchable, filterable by status | P0 |
| Metrics dashboard | Active subs, MRR, new this month, failed payments | P0 |
| Email delivery log | Per-drop send status | P0 |
| Manual email resend | If automation fails | P1 |
| Bulk subscriber export | CSV download | P1 |

---

## 6. Content Model & Cadence

### Content types

1. **Bass-less Track** — full song cover with bass removed (weekly)
2. **Groove** — short 15–60 second bass pattern (every 3 days)
3. **Fill** — transitional bass phrase (every 3 days)
4. **Challenge** — practice task with a goal (every 3 days)

### Monthly content volume

- 4 bass-less tracks
- ~10 grooves
- ~10 fills
- ~10 challenges
- **Total: ~34 audio drops per month**

### ⚠️ Content sustainability requirement

Before launch, the team must have **30 days of content pre-produced and queued**:

- 4 bass-less tracks
- 10 grooves
- 10 fills
- 10 challenges
- 4 email templates (one per week's drops)
- 1 onboarding email
- 1 renewal-reminder email
- 1 cancellation-recovery email

**Rule:** Never ship a 3-day-cadence promise without a 30-day buffer. If buffer drops below 14 days mid-operation, pause new acquisition until rebuilt.

---

## 7. Data Model

```text
users
├── id (uuid, pk)
├── email (unique, not null)
├── name (nullable)
├── country (iso code, nullable)
├── created_at (timestamp)
├── last_login_at (timestamp)
└── is_founding_member (boolean, default false)

subscriptions
├── id (uuid, pk)
├── user_id (fk → users.id)
├── provider (enum: lemonsqueezy, paystack, stripe)
├── provider_subscription_id (string, unique)
├── status (enum: active, cancelled, past_due, expired, paused)
├── current_period_start (timestamp)
├── current_period_end (timestamp)
├── cancel_at_period_end (boolean)
├── created_at (timestamp)
└── updated_at (timestamp)

content
├── id (uuid, pk)
├── title (string, not null)
├── type (enum: bassless_track, groove, fill, challenge)
├── description (text)
├── difficulty (enum: beginner, intermediate, advanced)
├── audio_file_url (string, not null) -- signed URL or storage key
├── cover_image_url (string, nullable)
├── status (enum: draft, scheduled, published)
├── scheduled_for (timestamp, nullable)
├── published_at (timestamp, nullable)
├── email_subject (string)
├── email_body (text)
├── created_by_admin_id (fk → admins.id)
└── created_at (timestamp)

downloads
├── id (uuid, pk)
├── user_id (fk → users.id)
├── content_id (fk → content.id)
└── downloaded_at (timestamp)

email_logs
├── id (uuid, pk)
├── user_id (fk → users.id)
├── content_id (fk → content.id)
├── status (enum: queued, sent, failed, bounced)
├── provider_message_id (string, nullable)
├── error_reason (text, nullable)
├── sent_at (timestamp, nullable)
└── created_at (timestamp)

admins
├── id (uuid, pk)
├── email (unique, not null)
├── name (string)
├── role (enum: super_admin, content_admin, viewer)
├── created_at (timestamp)
└── last_login_at (timestamp)
```

---

## 8. Payment Flow

### Provider decision (MVP)

**Primary: Lemon Squeezy**
- Merchant-of-record (handles global tax/VAT — critical for $1.50 pricing)
- Built-in subscription management
- Works in Nigeria, UK, US, EU, Asia, LatAm
- ~5% + $0.50 per transaction — high % on $1.50 but acceptable for MVP

**Deferred: Paystack** (add post-launch for Nigerian card support if Lemon Squeezy fails for African users)
**Deferred: Stripe** (only if UK company setup makes it easier than LS — requires Chris to confirm)

### Subscription lifecycle

```text
1. User clicks "Join for $1.50/month"
   → Redirect to Lemon Squeezy hosted checkout (with prefilled product variant)

2. User completes payment on Lemon Squeezy
   → Lemon Squeezy redirects back to /checkout/success?order_id=...

3. Lemon Squeezy fires webhook: subscription_created
   → Our API:
     a. Verify webhook signature
     b. Find or create user by email
     c. Create subscription row with status=active
     d. Send magic login link to email
     e. Mark is_founding_member=true if subscriber count < 500

4. User clicks magic link → logged in → lands on /dashboard

5. Monthly renewal:
   → Lemon Squeezy fires subscription_payment_success
   → Our API updates current_period_end

6. Failed payment:
   → Webhook subscription_payment_failed
   → Status → past_due
   → User can still access until current_period_end
   → Email user with update-card link

7. Cancellation:
   → User clicks Cancel in dashboard → redirect to LS portal
   → Webhook subscription_cancelled
   → cancel_at_period_end=true
   → User retains access until current_period_end
   → On period_end: status → expired, access revoked
```

### Webhook events to handle

- `subscription_created`
- `subscription_updated`
- `subscription_cancelled`
- `subscription_resumed`
- `subscription_expired`
- `subscription_payment_success`
- `subscription_payment_failed`
- `subscription_payment_recovered`

---

## 9. Email Automation Flow

### Trigger: Admin clicks "Publish" on a content item

```text
1. Content row updated: status='published', published_at=now()
2. Background job queued: notify_subscribers(content_id)
3. Job runs:
   a. Query: SELECT users WHERE active subscription exists
   b. For each user:
      - Render email template with content metadata
      - Send via Resend API
      - Insert email_logs row (status=queued)
      - On callback: update status=sent/failed
   c. Update content.email_send_summary
4. Admin dashboard reflects send status in real-time (polling or websocket)
```

### Email types (MVP)

| Email | Trigger | Provider |
|---|---|---|
| Magic login link | New subscription | Resend (transactional) |
| New drop notification | Content published | Resend (transactional) |
| Payment failed | LS webhook | Resend (transactional) |
| Cancellation confirmation | LS webhook | Resend (transactional) |
| Welcome / onboarding | 1 hour after first login | Resend (transactional) |

### Email template structure (new drop)

```text
Subject: [New {{ content_type }}] {{ title }}

Hey {{ first_name }},

New practice drop just landed in the Club.

🎸 {{ title }}
{{ short_description }}
Difficulty: {{ difficulty }}

[Open Practice Drop] → https://basscally.club/c/{{ content_id }}

Practice on,
Chris & the Basscally Team
```

---

## 10. Content Access Rules

| User state | Can view landing | Can view dashboard | Can play audio | Can download |
|---|---|---|---|---|
| Anonymous visitor | ✅ | ❌ (redirect to /pricing) | ❌ | ❌ |
| Logged in, no active sub | ✅ | ⚠️ (sees paywall) | ❌ | ❌ |
| Logged in, active sub | ✅ | ✅ | ✅ | ✅ |
| Logged in, past_due | ✅ | ✅ (with banner: "update card") | ✅ (grace until period_end) | ✅ |
| Logged in, cancelled (still in period) | ✅ | ✅ | ✅ | ✅ |
| Logged in, expired | ✅ | ⚠️ (sees re-subscribe CTA) | ❌ | ❌ |

### File protection (MVP)

- Audio files stored in **Supabase Storage** (private bucket) or **Cloudflare R2**
- Download links are **signed URLs** with 1-hour expiry
- Generated on-demand when user clicks Download
- Server checks active subscription before issuing the signed URL
- Logged in `downloads` table

### Anti-leak posture (MVP)

- Accept that determined users will share files. Don't over-engineer DRM at $1.50/mo.
- Signed URLs + active-sub checks are sufficient deterrence.
- Watermark with member ID in audio metadata (post-launch enhancement).

---

## 11. Admin Dashboard Requirements

### Home / Metrics view

- **Active subscribers** (count, sparkline 30 days)
- **MRR** ($ value, sparkline)
- **New this month** (count, % change vs last month)
- **Failed payments** (count, list)
- **Total content drops** (count, by type)
- **Next scheduled drop** (title + countdown)

### Content management view

- Table of all content with filters: type, status, date
- Columns: Title, Type, Status, Publish date, Email send rate
- Actions per row: Edit, Publish now, Resend email, Delete (soft)
- **"+ New Content"** button → upload form

### Upload form fields (single screen)

```text
[Audio file]        — required, .mp3/.wav, max 50MB
[Title]             — required, max 80 chars
[Content type]      — required, dropdown
[Difficulty]        — required, dropdown
[Description]       — required, max 500 chars
[Cover image]       — optional
[Release date]      — datetime picker, default = now
[Status]            — Draft / Scheduled / Publish now
[Email subject]     — required if Publish
[Email body]        — required if Publish, markdown editor
[Save] [Preview email] [Publish now]
```

### Subscribers view

- Searchable table: email, country, status, subscribed since, MRR contribution
- Filters: status, country, founding member, signup month
- Per-row: view detail, send manual email, refund (link to LS dashboard)
- Export CSV

---

## 12. Analytics & Tracking

### Must-track from day one

| Metric | Source | Why |
|---|---|---|
| Landing page visits | Plausible or Umami | Conversion funnel top |
| Pricing page → checkout click | Plausible event | Mid-funnel |
| Checkout → subscription completion | LS webhook | Conversion rate |
| Active subscribers | Database | MRR tracking |
| Churn rate (monthly) | Database | Retention health |
| Content downloads | downloads table | Engagement signal |
| Email open rate | Resend API | Notification effectiveness |
| Email click rate | Resend API | Drop relevance |
| Top countries | users.country | Localization signals |

### Privacy choice

Use **Plausible** or **Umami** (cookieless, GDPR-friendly). Avoid Google Analytics to keep the experience clean for a global audience.

---

## 13. MVP Acceptance Criteria

The MVP is shippable when **all of the following are true**:

1. A new user can subscribe from `/` → checkout → dashboard in ≤ 3 clicks.
2. After payment, the subscription is active and a magic-login email arrives within 60 seconds.
3. Admin can upload a piece of content and click Publish.
4. On publish, an email is sent to 100% of active subscribers within 5 minutes.
5. Email contains a working link that, when clicked by an active subscriber, plays/downloads the audio.
6. The same link, when clicked by a non-subscriber or expired user, shows the paywall.
7. A user can cancel from their dashboard, retains access until period_end, then loses access on period_end.
8. Admin dashboard shows correct counts for active subs and MRR.
9. Webhook signature verification is enforced (rejects unsigned requests).
10. The site loads in under 2 seconds on a 3G connection from Nigeria/UK/US tested.

---

## 14. Phased Build Plan

### Phase 0 — Pre-build (Week 0, do this first)
- Lemon Squeezy account, product configured, $1.50 variant created
- Supabase project created
- Resend account, sender domain verified
- Vercel project linked
- Domain pointed (e.g., basscally.club)
- 30-day content buffer produced and stored

### Phase 1 — Core MVP (Weeks 1–3)
- Landing page
- Lemon Squeezy checkout integration
- Webhook handlers
- User auth (Supabase magic link)
- Member dashboard with content library
- Admin upload form
- Email automation on publish
- Subscription gate on downloads

### Phase 2 — Polish (Week 4)
- Admin metrics dashboard
- Email delivery logs
- Founding member badge
- Onboarding email sequence
- Plausible analytics
- Mobile responsive QA
- Cross-browser QA

### Phase 3 — Soft launch (Week 5)
- Open to existing email list / inner circle (target: 25 subscribers)
- Monitor webhook reliability, email deliverability
- Fix what breaks

### Phase 4 — Public launch (Week 6)
- TikTok bio link update
- Instagram bio + stories campaign
- Pinned post on both
- Founding member offer messaging
- Target: 100 subscribers in 30 days

### Phase 5 — Post-launch (Weeks 7–12)
- Add Paystack if Africa conversions are weak
- Discord community gating
- Member spotlight feature
- Monthly challenge
- Begin Phase 2 product ($9 Club Plus) discovery

---

## 15. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Content burnout from every-3-day cadence | High | Critical | 30-day buffer rule; downshift to weekly if buffer < 14 days |
| Lemon Squeezy fees eat margin at $1.50 | Certain | Medium | Accept on MVP; revisit at 500+ subs with annual plan or Paystack |
| Africa card-payment failures on LS | Medium | High | Add Paystack in Phase 5 if African conversion < 30% of attempts |
| Webhook failures cause access bugs | Medium | High | Idempotent handlers, retry queue, alerting on failed events |
| Email-to-spam ratio kills retention | Medium | High | Verified sender domain, warm up gradually, monitor Resend reputation |
| Audio file leakage | High | Low | Acceptable at $1.50 tier; signed URLs sufficient |
| Founders cannot sustain output | Medium | Critical | Hire content help by month 3 if subscriber count > 250 |

---

## 16. Open Questions for Michael & Chris

1. Who is the admin uploader by default — Michael, Chris, or both?
2. Domain confirmed? (`basscally.club` recommended)
3. Lemon Squeezy account opened under UK company or personal?
4. Brand colours / logo finalized for the landing page?
5. Will the founding-member offer have a hard cap (first 500) or stay open?
6. Discord server existing or new? (Phase 5 trigger)
7. Refund policy — automatic or case-by-case?

---

*End of PRD v1.0. This document supersedes informal architecture notes in the handover document where they conflict.*
