# Basscally Club — Design System

**Version:** 1.0
**Date:** 15 May 2026
**Owner:** Michael (COO/co-founder)
**Status:** Locked v1 — paste this into every design and build tool

---

## How to use this document

Paste this entire file into:
- Claude (every new design conversation)
- Cursor / Codex (before generating any UI code)
- Figma AI / Figma Make (when prompting for frames)
- Any other LLM you use for design work

**Rule:** if a generated output disagrees with this document, the document wins. Reject the output and tell the tool to follow the system.

---

## 1. Design Direction (the one-line vision)

**Basscally Club is a dark, premium, music-first practice membership for bassists worldwide. The aesthetic is "Spotify-grade clarity meets vinyl-record warmth" — modern, confident, never sterile, never gamer-loud.**

Reference points (the good kind):
- **Spotify** — dark canvas, generous spacing, content-first hierarchy
- **Linear** — typographic discipline, restrained motion, sharp microcopy
- **Patreon (creator pages)** — community warmth, social proof rhythm
- **Apple Music** — typography weight contrast, photographic richness

References to avoid:
- Generic SaaS purple gradients on white
- Stock-image guitar overlays
- Gamer dashboards with neon glow
- Crypto/AI startup brushed-metal aesthetics
- Anything that looks like a Gumroad default template

---

## 2. Color Tokens

All colors are defined as CSS variables. Use the variable name, never the raw hex, when writing code or prompts.

### Brand colors

```css
:root {
  /* Brand */
  --color-brand:           #FF4500;   /* "Amp Orange" — primary CTA, accents only */
  --color-brand-hover:     #FF5C1F;   /* Hover state */
  --color-brand-muted:     #2A1408;   /* Subtle brand wash for backgrounds */

  /* Surfaces (dark by default) */
  --color-bg:              #0A0A0B;   /* Page background, near-black */
  --color-surface:         #141416;   /* Cards, panels */
  --color-surface-raised:  #1C1C1F;   /* Hovered/elevated cards */
  --color-surface-sunken:  #060607;   /* Modals overlay base, audio player bar */

  /* Borders & dividers */
  --color-border:          #26262A;   /* Default border */
  --color-border-strong:   #3A3A40;   /* Active inputs, focused borders */

  /* Text */
  --color-text:            #F5F5F7;   /* Primary text, near-white */
  --color-text-muted:      #A1A1A8;   /* Secondary, captions */
  --color-text-dim:        #6B6B72;   /* Tertiary, metadata, timestamps */

  /* Semantic */
  --color-success:         #34D399;   /* Subscription active, payment success */
  --color-warning:         #FBBF24;   /* Past due, content scheduled */
  --color-danger:          #F87171;   /* Cancelled, failed payment */
  --color-info:            #60A5FA;   /* Notifications, info banners */
}
```

### Usage rules

| Token | Use for | Never use for |
|---|---|---|
| `--color-brand` | Primary CTAs only ("Join", "Become Founding Member"), brand logo accent | Body text, backgrounds, secondary buttons |
| `--color-bg` | Page background everywhere | Cards |
| `--color-surface` | Default card, panel, dropdown bg | Page background |
| `--color-text` | Headings, button labels, important body | Captions, metadata |
| `--color-text-muted` | Descriptions, supporting copy | Headings, CTAs |
| `--color-success/warning/danger` | Status badges only | Decorative use |

### The 60-30-10 rule (write this on the wall)

- **60%** of every screen is `--color-bg` (background)
- **30%** is `--color-surface` and text in `--color-text` / `--color-text-muted`
- **10%** is `--color-brand` — and not a pixel more

If a screen has more than 10% orange, it's wrong. Reduce.

---

## 3. Typography

### Font choice

```css
:root {
  /* Display — headlines, hero, large titles */
  --font-display: "Cabinet Grotesk", "PP Neue Machina", "Inter Display", system-ui, sans-serif;

  /* Body — paragraphs, UI, buttons, inputs */
  --font-body: "Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

  /* Mono — code blocks, timestamps, technical data */
  --font-mono: "JetBrains Mono", "Geist Mono", "SF Mono", monospace;
}
```

**Why these fonts:**
- **Cabinet Grotesk** (or Neue Machina if Cabinet unavailable) gives the headline character without screaming. Free via Fontshare.
- **Geist** (by Vercel) is modern, neutral, and renders well at all sizes. Free.
- Both are free, open-license, and load fast.

**Fallback rule:** if a developer or designer can't access these fonts, use `Inter` for both display and body. Never use Arial or system defaults as the actual choice — only as the last fallback.

### Type scale

| Token | Size (rem) | Size (px) | Weight | Use |
|---|---|---|---|---|
| `--text-display` | 4.5 | 72 | 700 | Hero headline only |
| `--text-h1` | 3 | 48 | 700 | Page title |
| `--text-h2` | 2.25 | 36 | 600 | Section heading |
| `--text-h3` | 1.5 | 24 | 600 | Subsection, card title |
| `--text-h4` | 1.25 | 20 | 600 | Small heading, label |
| `--text-body-lg` | 1.125 | 18 | 400 | Hero subheading, intro paragraph |
| `--text-body` | 1 | 16 | 400 | Default body |
| `--text-body-sm` | 0.875 | 14 | 400 | Secondary, descriptions |
| `--text-caption` | 0.75 | 12 | 500 | Metadata, badges, timestamps |

### Line height

- Display & H1: 1.05 (tight)
- H2 / H3 / H4: 1.2
- Body: 1.6 (generous, easier to read)
- Caption: 1.4

### Letter spacing

- Display & H1: -0.02em (slightly tight, premium feel)
- H2 / H3: -0.01em
- Body: 0 (default)
- Caption: 0.02em (small caps feeling)

### Mobile type scale

On viewports below 768px, scale all display/heading sizes down by 25%:

- Display: 72px → 54px
- H1: 48px → 36px
- H2: 36px → 28px
- H3: 24px → 20px

Body sizes stay the same. Never make body text smaller than 16px on mobile — it forces zoom.

---

## 4. Spacing Scale

8px base. Use only these values. Never invent in-between spacing.

```css
:root {
  --space-1:  4px;   /* Icon-to-text gap, tight inline */
  --space-2:  8px;   /* Default tight gap */
  --space-3:  12px;  /* Button padding vertical */
  --space-4:  16px;  /* Default content gap */
  --space-5:  24px;  /* Card padding, between paragraphs */
  --space-6:  32px;  /* Section internal spacing */
  --space-8:  48px;  /* Between sections (mobile) */
  --space-10: 64px;  /* Between sections (desktop) */
  --space-12: 96px;  /* Hero vertical padding */
  --space-16: 128px; /* Major page padding (rare) */
}
```

### Spacing rules

- **Card padding:** `--space-5` (24px) default, `--space-6` (32px) for hero cards
- **Between sections on desktop:** `--space-10` (64px)
- **Between sections on mobile:** `--space-8` (48px)
- **Container max-width:** 1200px, centered, with `--space-5` (24px) side padding on mobile

---

## 5. Border Radius

```css
:root {
  --radius-sm:   6px;   /* Small badges, tags, chips */
  --radius-md:   10px;  /* Inputs, small buttons */
  --radius-lg:   14px;  /* Cards, primary buttons */
  --radius-xl:   20px;  /* Modals, large hero elements */
  --radius-full: 9999px; /* Avatars, pill buttons */
}
```

**Rule:** be consistent across an interface. If buttons are `--radius-lg`, all buttons are `--radius-lg`. Don't mix radii of similar elements.

---

## 6. Shadows & Elevation

On a dark background, shadows are subtle. Use them sparingly to suggest elevation, not drama.

```css
:root {
  /* Used on dark surfaces — depth via slight lift, not heavy drop shadow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.6);

  /* Glow for the brand color — used ONLY on primary CTA hover */
  --shadow-brand-glow: 0 0 24px rgba(255, 69, 0, 0.3);
}
```

**Usage:**
- Cards at rest: no shadow (use `--color-border` instead)
- Cards on hover: `--shadow-md`
- Modals/dropdowns: `--shadow-lg`
- Primary CTA on hover: `--shadow-brand-glow`

---

## 7. Motion

Subtle, fast, never bouncy. We're a music product, not a kids' app.

```css
:root {
  --motion-fast:    150ms;  /* Hover state, button press */
  --motion-default: 250ms;  /* Card transitions, modal fades */
  --motion-slow:    400ms;  /* Page transitions, hero reveal */

  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);     /* Default — feels premium */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* Symmetric transitions */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Use sparingly — buttons only */
}
```

### Motion rules

- Hover transitions: 150ms, `--ease-out`
- Modal/dropdown open: 250ms, `--ease-out`
- Hero/page entrance: 400ms, staggered, `--ease-out`
- **Never animate text content sliding in line-by-line.** It's the #1 sign of an AI-generated landing page.
- **Reduce-motion respect:** wrap any non-essential animation in `@media (prefers-reduced-motion: no-preference)`.

---

## 8. Breakpoints

Mobile-first. Every screen design starts at 375px.

```css
/* Mobile (default, no media query) */     /* 0 – 767px */
@media (min-width: 768px)  { /* Tablet  */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Wide    */ }
```

**70% of Basscally traffic is mobile.** Every page must look intentionally designed at 375px wide — not "shrunk down."

---

## 9. Component Anatomy

### 9.1 Buttons

Three variants. No more.

#### Primary
```
- Background: --color-brand
- Text: #FFFFFF (always white on brand)
- Padding: --space-3 vertical, --space-5 horizontal
- Radius: --radius-lg
- Font: --font-body, weight 600, --text-body
- Hover: bg --color-brand-hover + --shadow-brand-glow
- Active: scale(0.98)
- Disabled: opacity 0.4, no pointer
```

Use for: "Join Basscally Club — $1.50/month", "Become a Founding Member", "Publish"

#### Secondary
```
- Background: transparent
- Border: 1px solid --color-border-strong
- Text: --color-text
- Other specs identical to Primary
- Hover: bg --color-surface-raised, border --color-text-muted
```

Use for: "Login", "Manage subscription", "Cancel"

#### Ghost
```
- Background: transparent
- Border: none
- Text: --color-text-muted
- Padding: --space-2 vertical, --space-3 horizontal
- Hover: bg --color-surface, text --color-text
```

Use for: nav links, tertiary actions, "Read more"

### 9.2 Cards

```
- Background: --color-surface
- Border: 1px solid --color-border
- Border radius: --radius-lg
- Padding: --space-5 (default) or --space-6 (hero cards)
- Hover (interactive cards only): border --color-border-strong, shadow --shadow-md, lift translateY(-2px), motion --motion-default
```

### 9.3 Inputs

```
- Background: --color-surface
- Border: 1px solid --color-border
- Border radius: --radius-md
- Padding: --space-3 vertical, --space-4 horizontal
- Font: --font-body, --text-body
- Text: --color-text
- Placeholder: --color-text-dim
- Focus: border --color-brand, outline 2px rgba(255,69,0,0.2)
- Error: border --color-danger
```

### 9.4 Badges

```
- Padding: --space-1 vertical, --space-2 horizontal
- Border radius: --radius-full
- Font: --text-caption, weight 600, uppercase, letter-spacing 0.05em
- Variants:
  - "Founding Member": bg --color-brand-muted, text --color-brand
  - "Beginner": bg rgba(96,165,250,0.15), text --color-info
  - "Intermediate": bg rgba(251,191,36,0.15), text --color-warning
  - "Advanced": bg rgba(248,113,113,0.15), text --color-danger
  - "Active": bg rgba(52,211,153,0.15), text --color-success
```

### 9.5 Audio Player

This is the most-used component in the product. It deserves attention.

```
- Sticky bottom bar on member dashboard and content pages (mobile)
- Inline within content cards (desktop)
- Height: 64px (mobile sticky), flexible inline
- Background: --color-surface-sunken with backdrop-blur(20px)
- Border-top: 1px solid --color-border
- Layout: [cover thumb 48px] [title + artist] [play/pause] [scrub bar] [time]
- Play button: --radius-full, 40px, bg --color-brand, icon white
- Scrub bar: 4px height, --color-border-strong base, --color-brand progress fill
```

### 9.6 Content Card (the most-repeated element)

```
┌────────────────────────────────────┐
│  [Cover image 16:9, --radius-md ]  │
│                                    │
│  [GROOVE]  [BEGINNER]              │  ← Type badge + difficulty
│                                    │
│  Funk Slap Pattern in E            │  ← Title, --text-h4
│  Tight one-bar groove for          │  ← Description, --text-body-sm, muted
│  practicing right-hand technique.  │
│                                    │
│  ─────────────────────────────     │  ← Divider, --color-border
│                                    │
│  🎧 2 min   ·   Dropped 3 days ago │  ← Metadata, --text-caption, dim
└────────────────────────────────────┘
```

- Card: --color-surface, --radius-lg, --space-5 padding
- Cover: 16:9 aspect, --radius-md, slight gradient overlay at bottom for legibility
- Hover: lift + reveal a play button overlay on the cover

---

## 10. Voice & Tone (microcopy)

This is part of the design system. Words are visual.

### Principles

1. **Speak to the bassist, not the customer.** "Drop in, play the part" not "Access your content."
2. **Short. Active. Confident.** Cut every word that doesn't earn its place.
3. **Bass-world language is welcome.** Pocket, groove, fill, lock in, fat, dirty, tight.
4. **No marketing fluff.** Never "unlock your potential," "level up your game," "transform your playing." Reject all three.
5. **Global, not American.** Avoid US-only references ($20 lunch, sports analogies, etc.).

### Microcopy reference

| Bad | Good |
|---|---|
| "Welcome to your dashboard" | "Latest drop just landed" |
| "Sign up for our service" | "Join the Club — $1.50/month" |
| "Manage your subscription" | "Membership" |
| "An error occurred" | "Something broke. Try again?" |
| "You don't have access to this content" | "This drop is for Club members. Join for $1.50/month." |
| "Loading..." | "Tuning up..." (sparingly) |
| "No content yet" | "First drop lands soon." |
| "Logout" | "Sign out" |

### Button label rules

- **Always include the action.** "Join Basscally Club — $1.50/month" beats "Subscribe."
- **First-person where it fits.** "Take me to the Club" works on a final CTA.
- **Never use ALL CAPS** in button labels. Sentence case only.

---

## 11. Iconography

Use **Lucide Icons** (`lucide-react`). Free, large library, consistent stroke.

Rules:
- Default size: 20px
- Default color: `--color-text-muted`
- Active/hover: `--color-text`
- Stroke width: 1.5 (Lucide default)
- Never mix icon libraries

---

## 12. Imagery

### Photography
- Use real Basscally TikTok stills only.
- Never use stock photos of bassists or generic music imagery.
- If no real image exists, use no image — let typography carry the screen.

### Cover art for content drops
- 16:9 aspect ratio
- Either: photo of the bass + tasteful color treatment, OR a typographic cover with the drop title in `--font-display`
- Apply a subtle gradient overlay at the bottom (rgba(10,10,11,0.6) to transparent) for text legibility
- Cover the entire image area, never letterbox

### Illustrations
- None at MVP. Don't introduce a third visual language.

---

## 13. Accessibility (non-negotiable)

- **Contrast:** every text/background pair must be at least 4.5:1 (WCAG AA). The tokens in this doc all pass; don't introduce others without checking.
- **Focus states:** every interactive element has a visible focus ring (2px `--color-brand` at 30% opacity outline).
- **Touch targets:** minimum 44x44px on mobile.
- **Alt text:** every image. Cover art alt = drop title.
- **Reduced motion:** respect `prefers-reduced-motion`.
- **Form labels:** every input has a visible label or aria-label.

---

## 14. The Audit Checklist

After ANY screen is built (in Figma, in code, in an artifact), run this audit. Paste it as a prompt to whichever LLM is reviewing.

```
Audit this screen against the Basscally Design System.

1. COLOR
   - Is the 60-30-10 ratio respected? (60% bg, 30% surface+text, 10% brand max)
   - Is brand color (--color-brand) used ONLY on primary CTAs?
   - Does every text/bg pair meet 4.5:1 contrast?

2. TYPOGRAPHY
   - Does the headline use --font-display?
   - Is the scale respected (no random sizes)?
   - On mobile, does body text stay >= 16px?

3. SPACING
   - Are all spaces on the 8px scale?
   - Is section spacing 64px on desktop / 48px on mobile?
   - Is card padding 24px or 32px (no random values)?

4. COMPONENTS
   - Do buttons match the three variants (primary/secondary/ghost)?
   - Do cards use --radius-lg and the surface color?
   - Is the audio player consistent across screens?

5. UX
   - Can the user complete the primary action in <= 3 clicks from entry?
   - Are loading, empty, and error states designed (not just success)?
   - Is the primary CTA visible without scrolling on every screen?
   - Is the mobile experience designed, not shrunk?

6. COPY
   - Any marketing fluff? ("unlock", "level up", "transform")
   - Does it speak to the bassist, not the customer?
   - Is every label active and short?

7. ACCESSIBILITY
   - Visible focus states on all interactive elements?
   - Touch targets >= 44x44px on mobile?
   - Alt text on every image?

8. THE GUT CHECK
   - Does this look like Spotify or like Stitch?
   - Would Chris be proud to share this on TikTok?
   - Is there ONE thing on this screen that's memorable?

For each item, mark PASS / FAIL / NEEDS REVIEW. Then list the top 3 fixes ranked by impact.
```

---

## 15. Build & Design Sequence (the prompt order)

This is the order you design and build screens. Don't skip ahead.

| # | Screen | Why this order | When done |
|---|---|---|---|
| 1 | **Landing — Hero only** | The most-seen screen. Get the look right here, everything else follows. | Aesthetic locked |
| 2 | **Landing — full page** | Apply the locked aesthetic to all sections. | Marketing site ready |
| 3 | **Auth — Login (magic link)** | Tiny but high-trust screen. Tests the form/input patterns. | Form patterns locked |
| 4 | **Member Dashboard — empty state** | The state most overlooked. Design before content exists. | Empty state ready |
| 5 | **Member Dashboard — populated** | Normal day-one-after-signup state. | Default dashboard ready |
| 6 | **Content Detail Page (a drop)** | Where the audio player lives. Test cross-screen consistency. | Audio player locked |
| 7 | **Account / Membership** | Subscription status, cancel, founding member badge. | Account flow ready |
| 8 | **Paywall / Re-subscribe** | Expired-user screen. Highest-value re-conversion screen. | Recovery ready |
| 9 | **Admin — Upload form** | Single-screen form per PRD §11. Can be plain. | Admin can publish |
| 10 | **Admin — Metrics dashboard** | Last, because no users see it. | Admin can monitor |

---

## 16. Tool Workflow (which tool, when)

| Stage | Tool | What you do |
|---|---|---|
| Design system | Claude + this doc | Already done. Reuse forever. |
| Visual exploration | Figma (free) | Sketch screens visually. Drag, recolor. |
| AI Figma generation | Figma Make or Figma AI | Prompt with this doc + screen spec |
| Component code | Cursor + this doc + shadcn/ui | Generate React components |
| Audit | Claude with the audit checklist | Paste screenshots, run audit |
| Production | Vercel | Deploy |

**Don't use:** Canva (not for product UI), Stitch (already tried, not premium enough), Lovable (overlap with Cursor).

---

## 17. The "premium feel" checklist

Before declaring any screen done, it must have at least 4 of these 7:

1. ✅ **Generous whitespace** — let the page breathe
2. ✅ **Typographic contrast** — bold display headline + light body
3. ✅ **One clear focal point per screen** — the eye knows where to land
4. ✅ **Subtle motion on entry** — content fades/rises in, doesn't slide-and-spin
5. ✅ **Restrained color** — 60-30-10 holds, no accent creep
6. ✅ **A single small detail of craft** — a custom hover, a unique divider, a typographic flourish
7. ✅ **Mobile thumb-reach** — primary CTA reachable with one thumb

If a screen has 3 or fewer, it's not done. Iterate.

---

*End of Basscally Design System v1.0. This is the contract. Every screen obeys it. Every tool gets fed it.*
