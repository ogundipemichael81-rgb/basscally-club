# Password Recovery Lifecycle Repair

## Root cause
The password update could succeed, then the recovery session was signed out while `AUTH_FLOW_COOKIE=recovery_pending` remained. Middleware redirected `/auth/login` back to `/auth/reset-password`, where no recovery session remained. This produced the false expired-session message.

## Repair
`/auth/complete-recovery` now clears the recovery-flow cookie before locally signing out the temporary recovery session, then redirects to `/auth/login?passwordUpdated=1`. Middleware explicitly allows the completion route. Reset errors now retain safe status/code/message diagnostics and classify rate-limit, weak-password, and invalid-session cases separately.

## Important limitation
The current link-based flow uses Supabase PKCE. Recovery started in one browser and opened in another can fail when the code verifier is unavailable. This is a same-browser dependency. OTP/code recovery was not implemented in this patch because Supabase template/configuration feasibility was not verified; the immediate lifecycle bug is fixed first.

## Verification status
Vercel build is the deployment gate. A real new recovery email and clean-browser reset/login test is still required after the READY deployment. Do not reuse old recovery links.