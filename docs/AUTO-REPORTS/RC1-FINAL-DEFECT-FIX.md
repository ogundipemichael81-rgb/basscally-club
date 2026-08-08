# RC1 Final Defect Fix Report

- Commit: `9791ca9` (`fix: complete founding trial signup experience`)
- Deployment: `dpl_Eg6Zxw4gSMcupgFuXrLjZvytSXLX`
- Deployment state: READY

## Acceptance summary

1. Redirect root cause: the signup form used Next router replacement immediately after password sign-in. The session was valid, but the client-side transition could remain on `/join` across the auth boundary.
2. Redirect code change: require `signInWithPassword` to return a session, then use `window.location.replace('/dashboard?welcome=1')`.
3. Mobile overflow root cause: the password input used `w-full` beside a fixed Show button. It now uses `min-w-0 flex-1`; the button uses `shrink-0`.
4. Mobile files changed: `src/components/join/join-form.tsx`.
5. Local tests: founding-trial acceptance PASS; founding-trial states PASS; admin-members PASS.
6. Lint: PASS, 0 errors, 13 pre-existing warnings.
7. Typecheck: PASS.
8. Build: PASS.
9. Commit: `9791ca9`.
10. Deployment ID: `dpl_Eg6Zxw4gSMcupgFuXrLjZvytSXLX`.
11. Deployment READY: PASS; production alias is `https://basscallyhub.vercel.app`.
12. Signup API 200: previously proven in production; not repeated in this pass because the controlled browser harness could not satisfy safe cleanup requirements.
13. Automatic dashboard redirect: not re-run after deployment; production gate remains open.
14. Dashboard access: previously proven for authenticated QA session.
15. Second independent login: previously proven.
16. Trial unchanged: no trial schema, pricing, or provision logic changed.
17. Legacy `?plan`: no legacy plan code changed; previously passed.
18. Unexpected checkout: no checkout code changed; no new checkout request expected.
19. Live Admin QA classification: not re-run in this pass.
20. Live Admin metric movement: not re-run in this pass.
21. 390px horizontal overflow: source fix applied; live verification remains open.
22. 360px horizontal overflow: source fix applied; live verification remains open.
23. Anonymous preview Play/Pause/Seek: not re-run in this pass.
24. Runtime 5xx: PASS; Vercel reports no runtime errors in the selected two-hour window.
25. QA cleanup: no new QA identity was created in this pass.
26. Orphan profile: no new identity created; no new orphan introduced.
27. Genuine users affected: only the JoinForm and its focused regression script/package command changed; unrelated work remained uncommitted.
28. FINAL STATUS: NOT READY for final RC1 acceptance.
29. Exact blocker: a fresh one-account production browser test must verify automatic `/join` to `/dashboard` and 390/360 overflow, with the temporary identity deleted afterward. The browser harness could not safely create an identity without an in-process cleanup path, so no production account was created.
