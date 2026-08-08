# BH-22 Pass 2 — Admin Members / Founding Trial Control Room

Status: COMPLETE locally; not deployed.

Implemented:
- Canonical `public.users` member query with server-side email/name search, URL filters, sorting, total counts, and 50-row pagination.
- Founding-trial classification and deterministic state labels: NEW, TRIAL ACTIVE/EXPIRING/EXPIRED, FOUNDING $1.50, FOUNDING PAID/UNPAID, PAID, and CONVERTED DURING TRIAL.
- Admin metrics for total users, signed-up today, active/expiring/expired trials, founding users/unpaid/paid, paid members, and trial conversions.
- Member table and member detail route at `/admin/subscribers/[id]`.
- No changes to auth, payment, email, cron, or customer-facing trial experience.

Tests:
- `npm run test:admin-members` PASS (classification/filter fixtures and 123-row 50/50/23 pagination).
- `npm run test:founding-trial-states` PASS.
- `npm run lint` PASS with 13 pre-existing warnings, 0 errors.
- `npx tsc --noEmit --incremental false` PASS.
- `npm run build` PASS.

Production migration/index note:
- Existing founding-trial migration already defines trial/founding fields and indexes. No new production migration was required in Pass 2.

Known limitation:
- Supabase returns the canonical user page server-side, then subscription classification is applied to the fetched result. The page itself is capped at 50 rows; broader filtered totals depend on the returned canonical dataset. This is safe for the current MVP but should be replaced with a SQL view/RPC if the member count grows materially.
