import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { resolveMemberFromRequest } from "@/lib/subscriptions/resolve-member";

export type MemberSession = {
  userId: string;
  email: string;
  hasAccess: boolean;
  isFoundingMember: boolean;
  planLabel: string | null;
};

export async function getMemberSession(): Promise<MemberSession | null> {
  const member = await resolveMemberFromRequest();
  if (!member) {
    return null;
  }

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return {
      userId: member.userId,
      email: member.email,
      hasAccess: true,
      isFoundingMember: member.email.includes("founding") || member.email.includes("active"),
      planLabel: "Founding member",
    };
  }

  const admin = createAdminClient();

  const { data: userRow } = await admin
    .from("users")
    .select("is_founding_member")
    .eq("id", member.userId)
    .maybeSingle();

  const { data: subscriptions } = await admin
    .from("subscriptions")
    .select("status, current_period_end, ends_at, cancel_at_period_end, plan_code")
    .eq("user_id", member.userId)
    .order("updated_at", { ascending: false });

  const active =
    subscriptions?.find((row) => subscriptionGrantsAccess(row)) ?? null;

  const planLabels: Record<string, string> = {
    founding_monthly: "Founding member",
    standard_monthly: "Monthly",
    annual_18: "Annual",
    club_plus: "Club Plus",
  };

  return {
    userId: member.userId,
    email: member.email,
    hasAccess: subscriptionGrantsAccess(active),
    isFoundingMember: Boolean(userRow?.is_founding_member),
    planLabel: active?.plan_code ? planLabels[active.plan_code] ?? active.plan_code : null,
  };
}
