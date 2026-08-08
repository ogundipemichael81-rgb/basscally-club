# Founding Trial Launch Readiness

Status: LOCAL VERIFIED — PRODUCTION DEPLOYMENT PENDING

## Locked campaign
- Founding UTC start: 2026-08-08T00:00:00Z
- Founding UTC end: 2026-08-15T00:00:00Z
- Trial duration: exactly 168 hours
- Founding price: 150 USD cents/month
- Normal monthly price: 299 USD cents/month
- Annual price: 1800 USD cents/year

## Verified local commits
- `9c5c253` — founding trial member experience
- `0718664` — admin members/founding trial control room
- Pass 3 acceptance fixtures added locally.

## Automated/local verification
- Founding cutoff boundary: PASS
- Trial active/expiring/expired/paid override: PASS
- Payment readiness fixture: PASS
- Preview access fixture: PASS
- Signup cleanup fixture: PASS
- Same-user concurrency fixtures (10/25/50): PASS
- Distinct-user concurrency fixtures (10/25/50): PASS
- Admin metrics/filter/pagination fixtures: PASS
- Pass 1 trial tests: PASS
- Pass 2 admin tests: PASS
- Lint: PASS, 0 errors, 13 pre-existing warnings
- Typecheck: PASS
- Build: PASS

## Production gates still pending
- Push the complete local chain to GitHub main.
- Wait for the new Vercel deployment to reach READY.
- Verify production alias points to the final commit.
- Perform one controlled fresh production signup and inspect Supabase data.
- Verify independent second-session login, legacy `/join?plan` routing, admin visibility, mobile UX, runtime logs, and final data integrity.

Payment-provider approval is not required for the founding trial launch.
