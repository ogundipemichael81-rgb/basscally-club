import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { resolveMemberFromRequest, readMockPersonaId } from "@/lib/subscriptions/resolve-member";

export type MemberSession = {
  userId: string;
  email: string;
  hasAccess: boolean;
  isFoundingMember: boolean;
  planLabel: string | null;
  trialEndsAt: string | null;
  trialActive: boolean;
};

export async function getMemberSession(): Promise<MemberSession | null> {
  const member = await resolveMemberFromRequest();
  if (!member) return null;
  const mockId = await readMockPersonaId();

  if (process.env.NODE_ENV === "development" && mockId === "mock-member-lapsed") {
    return { userId: member.userId, email: member.email, hasAccess: false, isFoundingMember: false, planLabel: null, trialEndsAt: null, trialActive: false };
  }

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return { userId: member.userId, email: member.email, hasAccess: true, isFoundingMember: mockId === "mock-member-active" || member.email.includes("founding") || member.email.includes("active"), planLabel: "Founding member", trialEndsAt: null, trialActive: true };
  }

  const admin = createAdminClient();
  const [userResult, subscriptionResult] = await Promise.all([
    admin.from("users").select("is_founding_member, founding_eligible, trial_ends_at").eq("id", member.userId).maybeSingle(),
    admin.from("subscriptions").select("status, current_period_end, ends_at, cancel_at_period_end, plan_code").eq("user_id", member.userId).order("updated_at", { ascending: false }),
  ]);
  const userRow = userResult.data;
  const subscriptions = subscriptionResult.data;
  const active = subscriptions?.find((row) => subscriptionGrantsAccess(row)) ?? null;
  const trialEndsAt = userRow?.trial_ends_at ?? null;
  const trialActive = Boolean(trialEndsAt && Date.parse(trialEndsAt) > Date.now());
  const planLabels: Record<string, string> = { founding_monthly: "Founding member", standard_monthly: "Monthly", annual_18: "Annual", club_plus: "Club Plus" };

  return {
    userId: member.userId,
    email: member.email,
    hasAccess: subscriptionGrantsAccess(active) || trialActive,
    isFoundingMember: Boolean(userRow?.is_founding_member || userRow?.founding_eligible),
    planLabel: active?.plan_code ? planLabels[active.plan_code] ?? active.plan_code : trialActive ? "Founding trial" : null,
    trialEndsAt,
    trialActive,
  };
}
