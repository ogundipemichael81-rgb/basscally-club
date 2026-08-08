# Founding Trial Launch Readiness

Status: NOT READY FOR PRODUCTION DEPLOYMENT — FOUNDATION APPLIED, LAUNCH GATES REMAIN

## Locked campaign
- Founding UTC start: 2026-08-08T00:00:00Z
- Founding UTC end: 2026-08-15T00:00:00Z
- Trial duration: exactly 168 hours
- Founding price: 150 USD cents/month
- Normal monthly price: 299 USD cents/month
- Annual price: 1800 USD cents/year

## Implemented in this pass
- Added server-authoritative trial and founding fields migration.
- Added idempotent database function provision_founding_trial(uuid).
- Signup no longer requires a plan or payment.
- Signup provisions the trial through the server-side RPC.
- Active trial now grants member access.
- Paid subscription remains higher priority than trial.
- Lemon checkout/webhook code remains preserved for optional pay-during-trial conversion.
- No paid subscription rows are created by trial provisioning.

## Validation
- Typecheck: PASS
- Lint: PASS with existing warnings, 0 errors
- Build: PASS

## Not yet complete
- Production Supabase migration applied and verified on project jekavejbfujhxmtryyob.
- Homepage launch copy/countdown has not yet been updated.
- Trial-aware dashboard banner implemented locally; production smoke test still pending.
- Admin trial metrics, filters, user detail, and pagination remain incomplete.
- Sequential idempotency verified with synthetic production-safe identity; 10/25/50/100 concurrency tests not run.
- Fresh production signup test has not yet been run.
- Second-browser persistence test has not yet been run.
- No Vercel deployment for these trial changes has been made.

## Required next safe steps
1. Apply the migration to the intended Supabase project.
2. Run a local/test signup and verify one profile, one trial, and no subscription.
3. Complete dashboard/admin launch surfaces.
4. Run controlled provisioning concurrency tests outside production.
5. Deploy only after those checks pass.

## Production verification snapshot

- Pre-migration: 15 Auth users, 13 public users, 0 subscriptions, 0 active subscriptions, 2 checkout intents, 0 founding users.
- Post-migration: same counts; 7 trial columns and provision_founding_trial() present.
- Idempotency: same-user repeat provisioning preserved the original timestamps and flags; no duplicate state.
- Production migration: APPLIED.
- Launch state: NOT READY until admin trial metrics/table, safe concurrency coverage, fresh signup, second-browser persistence, and a READY Vercel deployment are verified.
