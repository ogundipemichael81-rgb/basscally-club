import "server-only";

import { getServerEnv } from "@/lib/env";

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const env = getServerEnv();
  const values = `${env.ADMIN_EMAIL_ALLOWLIST},${env.ADMIN_EMAILS}`
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  if (values.length === 0 && process.env.NODE_ENV === "development") {
    return email.toLowerCase().endsWith("@basscally.club");
  }
  return values.includes(email.trim().toLowerCase());
}
