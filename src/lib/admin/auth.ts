import "server-only";

import { NextResponse } from "next/server";
import { resolveMemberFromRequest } from "@/lib/subscriptions/resolve-member";
import { isAdminEmail } from "@/lib/admin/allowlist";

export type AdminSession = {
  userId: string;
  email: string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const member = await resolveMemberFromRequest();
  if (!member || !isAdminEmail(member.email)) {
    return null;
  }

  return {
    userId: member.userId,
    email: member.email,
  };
}

export async function requireAdminApi() {
  const session = await getAdminSession();
  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Admin access required." }, { status: 401 }),
    };
  }

  return { ok: true as const, session };
}
