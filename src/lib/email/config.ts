import "server-only";

import { getServerEnv } from "@/lib/env";

export function isResendConfigured(): boolean {
  const env = getServerEnv();
  return env.RESEND_API_KEY.length > 0 && env.RESEND_FROM_EMAIL.length > 0;
}

export function getResendFromEmail(): string {
  return getServerEnv().RESEND_FROM_EMAIL;
}

export function getResendApiKey(): string {
  return getServerEnv().RESEND_API_KEY;
}

export function getUnsubscribeSecret(): string {
  const { CRON_SECRET, RESEND_API_KEY } = getServerEnv();
  return CRON_SECRET || RESEND_API_KEY || "dev-unsubscribe-secret";
}
