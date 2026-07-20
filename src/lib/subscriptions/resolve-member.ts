import "server-only";

import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export const MOCK_COOKIE = "basscally_mock_user_id";

/** Seed-aligned mock personas for the UI simulator (BH-18). */
export const MOCK_PERSONAS = {
  "mock-member-active": {
    userId: "c0000000-0000-4000-8000-000000000001",
    email: "mock-member-active@basscally.club",
  },
  "mock-member-lapsed": {
    userId: "c0000000-0000-4000-8000-000000000002",
    email: "mock-member-lapsed@basscally.club",
  },
  "mock-admin-michael": {
    userId: "c0000000-0000-4000-8000-000000000003",
    email: "mock-admin-michael@basscally.club",
  },
} as const;

export type MockPersonaId = keyof typeof MOCK_PERSONAS;

export type ResolvedMember = {
  userId: string;
  email: string;
  source: "supabase_auth" | "mock_cookie";
};

export function isMockPersonaId(value: string | undefined): value is MockPersonaId {
  return Boolean(value && value in MOCK_PERSONAS);
}

export async function readMockPersonaId(): Promise<MockPersonaId | null> {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const cookieStore = await cookies();
  const mockId = cookieStore.get(MOCK_COOKIE)?.value;
  return isMockPersonaId(mockId) ? mockId : null;
}

/**
 * Resolves app user from Supabase Auth session or dev mock cookie (simulator).
 */
export async function resolveMemberFromRequest(): Promise<ResolvedMember | null> {
  if (isSupabaseClientConfigured()) {
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
  }

  const mockId = await readMockPersonaId();
  if (!mockId) {
    return null;
  }

  const persona = MOCK_PERSONAS[mockId];

  if (hasSupabaseServiceRole() && isSupabaseClientConfigured()) {
    const member = await lookupUserByEmail(persona.email);
    if (member) {
      return { ...member, source: "mock_cookie" };
    }
  }

  return {
    userId: persona.userId,
    email: persona.email,
    source: "mock_cookie",
  };
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
