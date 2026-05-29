import "server-only";

import { FOUNDING_MEMBER_CAP } from "@/lib/constants";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

export type FoundingMemberStats = {
  foundingCount: number;
  foundingCap: number;
  spotsRemaining: number;
  /** True when count came from Supabase `founding_member_stats` view. */
  live: boolean;
};

export async function getFoundingMemberStats(): Promise<FoundingMemberStats> {
  const foundingCap = FOUNDING_MEMBER_CAP;

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return {
      foundingCount: 0,
      foundingCap,
      spotsRemaining: foundingCap,
      live: false,
    };
  }

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("founding_member_stats")
      .select("founding_count, founding_cap, spots_remaining")
      .single();

    if (error || !data) {
      const { count } = await admin
        .from("users")
        .select("id", { count: "exact", head: true })
        .eq("is_founding_member", true);

      const foundingCount = count ?? 0;
      return {
        foundingCount,
        foundingCap,
        spotsRemaining: Math.max(0, foundingCap - foundingCount),
        live: true,
      };
    }

    return {
      foundingCount: Number(data.founding_count ?? 0),
      foundingCap: Number(data.founding_cap ?? foundingCap),
      spotsRemaining: Math.max(0, Number(data.spots_remaining ?? 0)),
      live: true,
    };
  } catch {
    return {
      foundingCount: 0,
      foundingCap,
      spotsRemaining: foundingCap,
      live: false,
    };
  }
}
