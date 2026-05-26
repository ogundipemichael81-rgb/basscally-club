# Supabase Client Connection Report

**Date:** 2026-05-25  
**Scope:** Helper setup only (pre–BH-03). No Lemon Squeezy, no BH-04 auth UI, no todos demo.

---

## 1. Files created

| File | Role |
| --- | --- |
| `src/lib/supabase/client.ts` | Browser client (`createBrowserClient`) |
| `src/lib/supabase/server.ts` | Server Components / Route Handlers (`createServerClient` + cookies) |
| `src/lib/supabase/middleware.ts` | Session refresh via `updateSession()` |
| `src/lib/supabase/admin.ts` | Service-role client (`server-only`) |
| `.env.local` | Local publishable URL/key (gitignored) |
| `docs/supabase-client-connection-report.md` | This report |

## 2. Files updated

| File | Change |
| --- | --- |
| `src/lib/env.ts` | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `DIRECT_URL`, Supabase helpers |
| `src/middleware.ts` | Calls `updateSession`; added `/auth/:path*` to matcher |
| `.env.example` | Supabase vars per checklist |
| `package.json` / lockfile | `server-only` added (Supabase packages already present) |

## 3. Files removed

| File | Reason |
| --- | --- |
| `src/utils/supabase/*` | Duplicate draft paths; canonical location is `src/lib/supabase/` |

## 4. Env variables required

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server cookie clients | Set in `.env.local` for dev |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Client + server cookie clients | Publishable/anon key only |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only (`admin.ts`) | **Not** in `.env.local` yet — add for BH-03 webhooks |
| `DATABASE_URL` | Drizzle / `npm run db:apply` | Pooler URI |
| `DIRECT_URL` | Migrations / Drizzle direct | Optional until schema apply |

`.env.local` currently has URL + publishable key only (no service role).

## 5. Client vs server vs admin usage

| Helper | Import from | Key used |
| --- | --- | --- |
| `createClient()` in `client.ts` | Client components only | `NEXT_PUBLIC_*` publishable |
| `createClient()` in `server.ts` | Server Components, Server Actions, Route Handlers | `NEXT_PUBLIC_*` + cookies |
| `updateSession()` in `middleware.ts` | Root `src/middleware.ts` | `NEXT_PUBLIC_*` + request cookies |
| `createAdminClient()` in `admin.ts` | API routes / server jobs only | `SUPABASE_SERVICE_ROLE_KEY` |

## 6. Service role is server-only

- `admin.ts` starts with `import "server-only"`.
- Uses `@supabase/supabase-js` + `SUPABASE_SERVICE_ROLE_KEY` from `getServerEnv()`.
- No `NEXT_PUBLIC_*` service key; no admin import in client code.

## 7. No sample todos page

- No `todos` table usage, no demo `page.tsx`, no Supabase quickstart UI added.

## 8. Mock auth / legal routes

- Simulator still uses `basscally_mock_user_id` cookie; middleware does not clear it.
- Legal routes unchanged: `/terms`, `/privacy`, `/refund-policy`.

## 9. Check results

| Check | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS (after `prefer-const` fix; script-only warnings remain) |
| `npm run build` | PASS (loads `.env.local`) |
| `npm run bh:status` | BH-03 pending, artifact missing (expected) |

## 10. Blockers before BH-03

1. **`SUPABASE_SERVICE_ROLE_KEY`** — add to `.env.local` / Vercel for webhook handler and admin writes (not committed).
2. **`DATABASE_URL` / `DIRECT_URL`** — apply `supabase/migrations` if not already on project `jekavejbfujhxmtryyob`.
3. **Lemon Squeezy env** — unchanged; BH-03 scope.

No code blocker for starting BH-03 once service role + DB are configured.
