# Basscally Club — System Checks, Audit Prompts, Acceptance Tests

## Required commands after every build phase
```bash
npm run lint
npm run typecheck
npm run build
```

If any command fails, fix before continuing.

## UI audit prompt
```text
Audit the built route against `04_basscally_design_system.md` and its locked HTML reference. Check color, typography, spacing, motion, mobile view at 375px, accessibility, focus states, touch targets, and copy. Mark PASS, FAIL, or NEEDS REVIEW. Do not claim completion if the built route visually drifts from the HTML reference.
```

## Security audit prompt
```text
Audit auth, route protection, admin access, webhook verification, storage access, signed URL expiry, rate limiting, and service-role key exposure. Verify no service role key reaches the client. Verify every admin route performs server-side authorization. Verify webhooks reject unsigned or duplicate events.
```

## Payment audit prompt
```text
Test Lemon Squeezy test-mode checkout for founding monthly, standard monthly, and annual plan. Confirm webhook creates user, subscription, plan_code, status, period dates, and portal URLs. Confirm cancellation keeps access until end date. Confirm expired removes access. Confirm past_due keeps access until period end and shows the past-due banner.
```

## Email audit prompt
```text
Publish a test drop with two active test subscribers. Confirm email_queue rows are created, cron sends via Resend, email_logs update, failed rows retry, and manual resend queues only failed recipients. Confirm Resend webhook updates sent, bounced, clicked, opened, failed, and complained where available.
```

## Member acceptance tests
- Visitor sees landing page.
- Visitor opens pricing.
- Visitor selects $18/year annual plan.
- Visitor pays in test mode.
- Checkout success appears.
- Magic link login works.
- Dashboard loads latest drop.
- Active member plays audio.
- Active member downloads signed URL.
- Expired member sees paywall.
- Past-due member sees billing banner but still accesses content until period end.
- Cancelled member sees access end date.

## Admin acceptance tests
- Non-admin gets unauthorized screen.
- Admin uploads audio.
- Admin saves draft.
- Admin schedules drop.
- Admin publishes now.
- Upload success screen appears.
- Email queue starts.
- Admin sees delivery logs.
- Admin retries failed send.
- Admin edits a drop.
- Admin soft deletes a drop.
- Admin exports subscribers.

## Mobile QA
Test every route at:
- 375px width
- 390px width
- 768px width
- 1024px width

Every CTA must fit thumb reach. Tables must scroll horizontally. Audio player must remain usable.

## Performance target
- Lighthouse mobile 90+
- First load under 2 seconds on practical mobile network
- Avoid heavy animation bundles
- Use Framer Motion only where useful
- Respect `prefers-reduced-motion`
