import "server-only";

import { createClient } from "@supabase/supabase-js";
import {
  getServerEnv,
  getSupabaseUrl,
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

/**
 * Service-role Supabase client — bypasses RLS. Server-only (webhooks, cron, signed URLs).
 * Never import this module from client components or shared client bundles.
 */
export function createAdminClient() {
  if (!isSupabaseClientConfigured()) {
    throw new Error(
      "Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL to be set.",
    );
  }

  if (!hasSupabaseServiceRole()) {
    throw new Error(
      "Supabase admin client requires SUPABASE_SERVICE_ROLE_KEY (server env only).",
    );
  }

  const { SUPABASE_SERVICE_ROLE_KEY } = getServerEnv();

  return createClient(getSupabaseUrl(), SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
