# Basscally Club — Screens 13 to 15 Audit + Cursor Handoff

## Scope

These three screens continue the missing-flow queue after Checkout Success and Checkout Cancelled:

1. Screen 13, Auth Callback Transition, `/auth/callback`
2. Screen 14, Admin Content List, `/admin/content`
3. Screen 15, Admin Subscribers List, `/admin/subscribers`

These map directly to the P0 gaps from the Screen 10 flow audit.

## Motion direction

The HTML uses CSS motion. In production, convert these to Framer Motion variants:

- Page entry: fade + rise, 0.78s, easeOut
- Table rows: staggered fade + rise, 70ms delay per row
- Auth callback: rotating vinyl, animated orbit dots, waveform bars
- Admin content queue: animated progress ring, pulse status dots, scanline shimmer
- Subscriber signal: growing country bars, pulsing country pins, breathing rings

Respect `prefers-reduced-motion` in production.

---

# Screen 13, Auth Callback Transition

## Purpose

Show a clean transition while the magic link callback route exchanges the Supabase token and opens the member dashboard.

## States included

- Default signing-in state
- Success instruction state, documented in state strip
- Expired link error state, documented in state strip

## UI audit

Color: PASS. Orange stays limited to the brand mark, CTA, vinyl label, and motion accents.

Typography: PASS. Display headline carries the screen. Body copy stays readable on mobile.

Spacing: PASS. Uses 8px rhythm, strong center composition, and clear step cards.

Components: PASS. Buttons, cards, and status elements match the system.

UX: PASS. User knows what is happening and has recovery actions.

Copy: PASS. Short, direct, no marketing language.

Accessibility: PASS. Focus states, reduced motion, and readable contrast are present.

Gut check: PASS. It feels like a Basscally transition, not a generic loading spinner.

## Cursor handoff prompt

Build Screen 13 at `app/auth/callback/route.ts` plus a small visual fallback page or component at `app/auth/callback/loading.tsx` if needed. Use `04_basscally_design_system.md` as the design contract. The page should show a centered auth transition with the title `Signing you into the Club.`, supporting copy, a three-step status list, and recovery actions to `/auth/login` and `/`. Use shadcn/ui Button and Card primitives. For motion, use Framer Motion with page fade-rise, a rotating vinyl-style visual, animated waveform bars, and a success redirect state. Respect `prefers-reduced-motion`. Handle states: loading, success redirect, expired link, invalid token, and generic auth error. Do not introduce new libraries beyond Framer Motion if it is already approved for UI motion.

---

# Screen 14, Admin Content List

## Purpose

Give admins a full content-management table beyond the compact recent-content preview on Screen 10.

## States included

- Default table
- Loading state
- Empty search state
- Error state
- Scheduled queue panel

## UI audit

Color: PASS. Admin surface remains dark. Orange supports primary actions and queue accents only.

Typography: PASS. Screen headline and metric numbers use display font. Labels use mono text.

Spacing: PASS. Cards, toolbar, and table cells follow system spacing.

Components: PASS. Uses admin shell, buttons, badges, cards, input, table, and status chips.

UX: PASS. Filters, search, edit, publish, resend, and new drop are visible.

Copy: PASS. Operational and clear.

Accessibility: PASS. Search label is present, table scrolls horizontally, touch targets meet 44px.

Gut check: PASS. It feels like a content control room, not a spreadsheet dump.

## Cursor handoff prompt

Build Screen 14 at `app/(admin)/admin/content/page.tsx`. Use `04_basscally_design_system.md` and match the admin shell from Screens 9 and 10. Create reusable components: `components/admin/content-status-card.tsx`, `components/admin/content-filter-bar.tsx`, `components/admin/content-table.tsx`, and `components/admin/publishing-queue-card.tsx`. Use shadcn/ui Card, Button, Badge, Input, Select, DropdownMenu, and Table. Props should include `contentItems`, `counts`, `filters`, `searchQuery`, and `nextScheduledDrop`. Include actions for Edit, Publish, Resend, and Delete. Include loading skeleton, empty search, and error state. Keep `New drop` as the primary action linking to `/admin/content/new`. Add a right-side publishing queue on desktop and stack it below on mobile.

---

# Screen 15, Admin Subscribers List

## Purpose

Give admins a subscriber-management surface for active members, founding members, countries, past-due members, and export.

## States included

- Default table
- Loading state
- Empty state
- Error state
- Past-due attention card
- Country signal panel

## UI audit

Color: PASS. Orange appears in brand, signal bars, and active motion accents. Status colors remain semantic.

Typography: PASS. Strong display headline, clear metric figures, mono labels.

Spacing: PASS. Layout and cards follow the same admin rhythm.

Components: PASS. Uses admin shell, filters, table, status badges, and export action.

UX: PASS. Admins see status, country, plan, join date, last email, and actions quickly.

Copy: PASS. Labels are simple and operational.

Accessibility: PASS. Search is labelled, table scrolls, focus states exist, reduced motion is respected.

Gut check: PASS. The country signal panel gives the page a memorable visual anchor.

## Cursor handoff prompt

Build Screen 15 at `app/(admin)/admin/subscribers/page.tsx`. Use `04_basscally_design_system.md` and the admin shell from Screens 9 to 14. Create `components/admin/subscriber-table.tsx`, `components/admin/subscriber-filter-bar.tsx`, `components/admin/subscriber-metric-card.tsx`, and `components/admin/country-signal-card.tsx`. Use shadcn/ui Card, Button, Badge, Input, Select, DropdownMenu, and Table. Props should include `subscribers`, `counts`, `countries`, `filters`, and `searchQuery`. Table columns: email, country, status, plan, joined, last email, actions. Include Active, Founding, Past due, and Expired filters. Include Export CSV as the secondary top action. Add loading, empty, empty search, and error states.

---

# Next screens to design

1. Screen 16, Email Delivery Log
2. Screen 17, Past-Due Member Banner Variant
3. Screen 18, Cancel Confirmation State

