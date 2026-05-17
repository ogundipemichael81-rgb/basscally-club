import { z } from "zod";

/**
 * Phase 1: validated env with safe defaults so build/lint pass without production secrets.
 * Real integrations read these in later phases.
 */

const optionalString = z
  .string()
  .optional()
  .transform((v) => v ?? "");

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: optionalString,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalString,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: optionalString,
});

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  DATABASE_URL: optionalString,
  LEMONSQUEEZY_API_KEY: optionalString,
  LEMONSQUEEZY_WEBHOOK_SECRET: optionalString,
  LEMONSQUEEZY_STORE_ID: optionalString,
  LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID: optionalString,
  LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID: optionalString,
  LEMONSQUEEZY_ANNUAL_18_VARIANT_ID: optionalString,
  LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID: optionalString,
  RESEND_API_KEY: optionalString,
  RESEND_FROM_EMAIL: optionalString,
  CRON_SECRET: optionalString,
  ADMIN_EMAIL_ALLOWLIST: optionalString,
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

function parseClientEnv(): ClientEnv {
  return clientEnvSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  });
}

function parseServerEnv(): ServerEnv {
  return serverEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
    LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID:
      process.env.LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID,
    LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID:
      process.env.LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID,
    LEMONSQUEEZY_ANNUAL_18_VARIANT_ID:
      process.env.LEMONSQUEEZY_ANNUAL_18_VARIANT_ID,
    LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID:
      process.env.LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    CRON_SECRET: process.env.CRON_SECRET,
    ADMIN_EMAIL_ALLOWLIST: process.env.ADMIN_EMAIL_ALLOWLIST,
  });
}

/** Safe for client bundles — only NEXT_PUBLIC_* keys. */
export const clientEnv = parseClientEnv();

/** Server-only — never import from client components. */
export function getServerEnv(): ServerEnv {
  return parseServerEnv();
}

export function hasDatabaseUrl(): boolean {
  return getServerEnv().DATABASE_URL.length > 0;
}
