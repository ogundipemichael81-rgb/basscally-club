# Basscally Club — Master Build Sequence and Copy-Paste Prompts

## File upload order for Cursor or Codex
1. `04_basscally_design_system.md`
2. `06_locked_screen_designs_UPDATED_01_33.md`
3. `01_PRD_basscally_club_mvp_UPDATED_v1_1.md`
4. `08_architecture_backend_auth_payments_email_logic.md`
5. `09_routes_wiring_screen_map_and_components.md`
6. `10_system_checks_audit_prompts_and_acceptance_tests.md`
7. `03_cursor_codex_build_prompt_UPDATED_v2.md`
8. `02_landing_page_copy_and_wireframe.md`
9. All screen HTML references 01 to 33, or the complete screen ZIP.

## Phase 0 prompt: read and plan
```text
Read all uploaded Basscally docs and HTML references. Do not build yet. Produce a route-by-route implementation plan, list the exact files to create, and flag any conflict between the PRD, locked screens, and architecture docs. The design system wins on visuals. The PRD wins on product behavior. The architecture doc wins on backend and integrations.
```

## Phase 1 prompt: scaffold
```text
Create the Next.js 15 App Router project using TypeScript strict, Tailwind CSS v4, shadcn/ui, Drizzle, Supabase SSR Auth, Resend, Lemon Squeezy webhook utilities, and Vercel Cron route placeholders. Create `.env.example`, `lib/env.ts`, Drizzle schema, Supabase server/client helpers, middleware skeleton, and base layout. Do not build screens yet. Run lint, typecheck, and build. Stop with a report.
```

## Phase 2 prompt: design system implementation
```text
Implement Basscally design tokens from `04_basscally_design_system.md` in `app/globals.css` and Tailwind config. Create shared UI wrappers for Button, Card, Badge, Input, Textarea, Select, Table, ToastProvider, MemberShell, AdminShell, MotionProvider. Match the locked HTML visual system: dark cinematic surface, Amp Orange max 10%, Cabinet Grotesk and Geist, mobile-first, reduced-motion support. Build a `/design-check` internal page showing all tokens and components. Run audit commands. Stop.
```

## Phase 3 prompt: marketing, pricing, checkout utility
```text
Build `/`, `/pricing`, `/checkout/success`, and `/checkout/cancelled` using Screens 1, 2, 11, 12, and 32. Use the HTML references verbatim for layout and motion. CTA buttons must map to plan codes: founding_monthly, standard_monthly, annual_18. Do not wire real checkout yet, use placeholder hrefs from env. Add analytics event placeholders for pricing click and checkout start. Run lint, typecheck, build, and UI audit. Stop.
```

## Phase 4 prompt: auth and member routes
```text
Build `/auth/login`, `/auth/callback`, `/dashboard`, `/c/[id]`, `/account`, `/account/billing`, `/account/billing/portal`, and `/account/cancel` using Screens 3, 4, 5, 6, 7, 13, 17, 18, 21, 22, 30, and 33. Implement Supabase magic-link auth, protected member routes, subscription state checks, paywall redirects, past_due grace behavior, cancelled-in-period behavior, and signed download endpoint placeholder. Run tests and stop.
```

## Phase 5 prompt: Lemon Squeezy integration
```text
Implement Lemon Squeezy checkout variant mapping and webhook route. Handle subscription_created, subscription_updated, subscription_cancelled, subscription_resumed, subscription_expired, subscription_payment_success, subscription_payment_failed, and subscription_payment_recovered. Verify signatures. Store plan_code, provider IDs, status, period dates, ends_at, customer portal URLs, and idempotency keys. Update checkout CTA URLs and billing portal redirect. Run test-mode webhook checks. Stop.
```

## Phase 6 prompt: admin core
```text
Build `/admin`, `/admin/content`, `/admin/content/new`, `/admin/content/[id]`, `/admin/content/[id]/delete`, `/admin/subscribers`, `/admin/email-logs`, `/admin/email-logs/resend`, and `/admin/email-templates` using Screens 9, 10, 14, 15, 16, 19, 20, 26, 27, 28, and 31. Implement admin middleware and server-side role checks. Use live DB queries where available and mock seed data only in development. Soft delete content, never hard delete from UI. Run checks and stop.
```

## Phase 7 prompt: email automation and cron
```text
Implement Resend templates, email_queue, email_logs, send pipeline, cron route for scheduled publish, cron route for email queue, and Resend webhook route. On publish, queue emails for active subscribers. On failed sends, retry up to 3 times with backoff. Add manual resend for failed recipients only. Add content buffer alert logic for admins. Run email flow test. Stop.
```

## Phase 8 prompt: polish and production audit
```text
Implement global toasts, 404, 500, empty search results, rate-limit state, loading skeletons, error boundaries, SEO, Open Graph, sitemap, robots, mobile admin drawer, and final performance cleanup. Run every audit from `10_system_checks_audit_prompts_and_acceptance_tests.md`. Produce PASS/FAIL table route by route. Stop.
```
