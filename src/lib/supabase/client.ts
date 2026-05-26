import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
  isSupabaseClientConfigured,
} from "@/lib/env";

export function createClient() {
  if (!isSupabaseClientConfigured()) {
    throw new Error(
      "Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return createBrowserClient(getSupabaseUrl(), getSupabasePublishableKey());
}
