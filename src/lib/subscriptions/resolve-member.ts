import "server-only";

import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

const MOCK_COOKIE = "basscally_mock_user_id";

const MOCK_EMAIL_BY_ID: Record<string, string> = {
  "mock-member-active": "mock-member-active@basscally.club",
  "mock-member-lapsed": "mock-member-lapsed@basscally.club",
  "mock-admin-michael": "mock-admin-michael@basscally.club",
};

export type ResolvedMember = {
  userId: string;
  email: string;
  source: "supabase_auth" | "mock_cookie";
};

/**
 * Resolves app user from Supabase Auth session or dev mock cookie (simulator).
 */
export async function resolveMemberFromRequest(): Promise<ResolvedMember | null> {
  if (!isSupabaseClientConfigured()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      const member = await lookupUserByEmail(user.email);
      if (member) {
        return { ...member, source: "supabase_auth" };
      }
    }
  } catch {
    // Auth not configured or session missing
  }

  if (process.env.NODE_ENV === "development" && hasSupabaseServiceRole()) {
    const cookieStore = await cookies();
    const mockId = cookieStore.get(MOCK_COOKIE)?.value;
    const email = mockId ? MOCK_EMAIL_BY_ID[mockId] : undefined;
    if (email) {
      const member = await lookupUserByEmail(email);
      if (member) {
        return { ...member, source: "mock_cookie" };
      }
    }
  }

  return null;
}

async function lookupUserByEmail(
  email: string,
): Promise<{ userId: string; email: string } | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("users")
    .select("id, email")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return { userId: data.id, email: data.email };
}
