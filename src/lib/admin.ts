/**
 * Admin allowlist parsing only — no server-side auth checks in Phase 1.
 */

export function parseAdminEmailAllowlist(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return [];
  }

  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0 && email.includes("@"));
}

export function isAdminEmail(
  email: string | null | undefined,
  allowlist: string[],
): boolean {
  if (!email || allowlist.length === 0) {
    return false;
  }

  return allowlist.includes(email.trim().toLowerCase());
}
