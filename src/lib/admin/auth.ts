import "server-only";

import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { resolveMemberFromRequest } from "@/lib/subscriptions/resolve-member";

export type AdminSession = {
  userId: string;
  email: string;
};

function isAllowlistedAdmin(email: string): boolean {
  const list = getServerEnv()
    .ADMIN_EMAIL_ALLOWLIST.split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (list.length === 0 && process.env.NODE_ENV === "development") {
    return email.endsWith("@basscally.club");
  }

  return list.includes(email.toLowerCase());
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const member = await resolveMemberFromRequest();
  if (!member || !isAllowlistedAdmin(member.email)) {
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
