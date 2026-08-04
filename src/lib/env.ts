import { z } from "zod";

/**
 * Validated env with safe defaults so build/lint pass without production secrets.
 * Supabase publishable key is client-safe; service role is server-only (see admin client).
 */

const optionalString = z
  .string()
  .optional()
  .transform((v) => v ?? "");

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: optionalString,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optionalString,
  /** @deprecated Use NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY */
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalString,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: optionalString,
  NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL: optionalString,
});

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  DATABASE_URL: optionalString,
  DIRECT_URL: optionalString,
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
  ADMIN_EMAILS: optionalString,
  AUTH_FLOW_SECRET: optionalString,
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

function parseClientEnv(): ClientEnv {
  return clientEnvSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL:
      process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL,
  });
}

function parseServerEnvFromProcess(): ServerEnv {
  return serverEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
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
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    AUTH_FLOW_SECRET: process.env.AUTH_FLOW_SECRET,
  });
}

/** Safe for client bundles — only NEXT_PUBLIC_* keys. */
export const clientEnv = parseClientEnv();

/** Server-only — never import from client components. */
export function getServerEnv(): ServerEnv {
  return parseServerEnvFromProcess();
}

export function getSupabaseUrl(): string {
  return clientEnv.NEXT_PUBLIC_SUPABASE_URL;
}

/** Publishable (anon) key — safe for browser and cookie-based server clients. */
export function getSupabasePublishableKey(): string {
  return (
    clientEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function isSupabaseClientConfigured(): boolean {
  return getSupabaseUrl().length > 0 && getSupabasePublishableKey().length > 0;
}

export function hasSupabaseServiceRole(): boolean {
  return getServerEnv().SUPABASE_SERVICE_ROLE_KEY.length > 0;
}

export function hasDatabaseUrl(): boolean {
  return getServerEnv().DATABASE_URL.length > 0;
}

export function hasDirectDatabaseUrl(): boolean {
  return getServerEnv().DIRECT_URL.length > 0;
}

export function hasLemonSqueezyWebhookSecret(): boolean {
  return getServerEnv().LEMONSQUEEZY_WEBHOOK_SECRET.length > 0;
}
