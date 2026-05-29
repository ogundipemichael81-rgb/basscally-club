import "server-only";

import { PLANS, type PlanCode } from "@/lib/plans";
import type { AccountSubscriptionSummary } from "@/lib/account/types";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { resolveMemberFromRequest } from "@/lib/subscriptions/resolve-member";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export type { AccountSubscriptionSummary } from "@/lib/account/types";
export {
  accountStatusBadgeVariant,
  resolveBillingPortalUrl,
} from "@/lib/account/types";

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
      new Date(iso),
    );
  } catch {
    return "—";
  }
}

function statusLabel(status: string, hasAccess: boolean): string {
  if (hasAccess && (status === "active" || status === "on_trial")) {
    return "Active";
  }
  if (status === "past_due") return "Past due";
  if (status === "cancelled") return "Cancelled";
  if (status === "expired") return "Expired";
  if (status === "paused") return "Paused";
  return status.replace(/_/g, " ");
}

function demoSummary(email: string): AccountSubscriptionSummary {
  const plan = PLANS.founding_monthly;
  const renewal = new Date(Date.now() + 20 * 86400000).toISOString();

  return {
    email,
    isFoundingMember: true,
    planCode: plan.code,
    planLabel: plan.label,
    priceLabel: plan.priceLabel,
    status: "active",
    statusLabel: "Active",
    hasAccess: true,
    isPastDue: false,
    cancelAtPeriodEnd: false,
    periodEndLabel: formatDate(renewal),
    renewalLabel: formatDate(renewal),
    customerPortalUrl: null,
    updatePaymentUrl: null,
  };
}

export async function getAccountSubscriptionSummary(): Promise<AccountSubscriptionSummary | null> {
  const member = await resolveMemberFromRequest();
  if (!member) {
    return null;
  }

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return demoSummary(member.email);
  }

  const admin = createAdminClient();

  const { data: user } = await admin
    .from("users")
    .select("email, is_founding_member")
    .eq("id", member.userId)
    .maybeSingle();

  if (!user) {
    return demoSummary(member.email);
  }

  const { data: subscriptions } = await admin
    .from("subscriptions")
    .select(
      "plan_code, status, current_period_end, ends_at, renews_at, cancel_at_period_end, customer_portal_url, update_payment_method_url, updated_at",
    )
    .eq("user_id", member.userId)
    .order("updated_at", { ascending: false });

  const subscription =
    subscriptions?.find((row) => subscriptionGrantsAccess(row)) ??
    subscriptions?.[0] ??
    null;

  if (!subscription) {
    const plan = user.is_founding_member ? PLANS.founding_monthly : PLANS.standard_monthly;
    return {
      email: user.email,
      isFoundingMember: user.is_founding_member,
      planCode: plan.code,
      planLabel: plan.label,
      priceLabel: plan.priceLabel,
      status: "inactive",
      statusLabel: "No active plan",
      hasAccess: false,
      isPastDue: false,
      cancelAtPeriodEnd: false,
      periodEndLabel: "—",
      renewalLabel: "—",
      customerPortalUrl: null,
      updatePaymentUrl: null,
    };
  }

  const planCode = (subscription.plan_code ?? "founding_monthly") as PlanCode;
  const plan = PLANS[planCode] ?? PLANS.founding_monthly;
  const hasAccess = subscriptionGrantsAccess(subscription);
  const periodIso =
    subscription.ends_at ?? subscription.current_period_end ?? subscription.renews_at;

  return {
    email: user.email,
    isFoundingMember: user.is_founding_member || planCode === "founding_monthly",
    planCode,
    planLabel: plan.label,
    priceLabel: plan.priceLabel,
    status: subscription.status,
    statusLabel: statusLabel(subscription.status, hasAccess),
    hasAccess,
    isPastDue: subscription.status === "past_due",
    cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end),
    periodEndLabel: formatDate(periodIso),
    renewalLabel: formatDate(subscription.renews_at ?? periodIso),
    customerPortalUrl: subscription.customer_portal_url,
    updatePaymentUrl: subscription.update_payment_method_url,
  };
}
