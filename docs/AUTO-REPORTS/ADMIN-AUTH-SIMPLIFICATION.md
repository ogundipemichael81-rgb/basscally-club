# Basscally Hub — Admin Authentication Simplification

## Previous complexity removed

The local service-role password-repair and direct-auth CLI tools were retired. Ordinary admin access no longer depends on local service-role credentials or developer tooling.

## Final architecture

`/admin/login` uses the same Supabase password authentication foundation as normal members. After authentication, the server checks the authenticated user’s normalized email against the exact admin allowlist. The official singular account is authorized; the plural account is not.

## Recovery

Admin and members now share `/auth/forgot-password`, Supabase `resetPasswordForEmail`, `/auth/callback?type=recovery`, and `/auth/reset-password`. Recovery responses do not reveal whether an email exists. Password reset uses the authenticated recovery session and then returns the user to normal login.

## Security

- No hardcoded password.
- No service-role key in browser code.
- No admin password endpoint.
- No fuzzy email matching.
- Normal logout remains local-scope.
- Existing Auth user and ownership IDs are preserved.

## Verification status

The recovery implementation and admin UI changes are committed for deployment. Fresh Chrome/Edge/phone login, real recovery-email delivery, and local lint/typecheck still require runtime verification. Supabase default email delivery may be sufficient for controlled testing; custom SMTP/Resend remains a later delivery-hardening step if delivery is unreliable.