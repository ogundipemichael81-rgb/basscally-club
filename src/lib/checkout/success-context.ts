import "server-only";

import { PLANS, type PlanCode } from "@/lib/plans";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { resolveMemberFromRequest } from "@/lib/subscriptions/resolve-member";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export type CheckoutSuccessContext = {
  email: string | null;
  planLabel: string;
  priceLabel: string;
  statusLabel: string;
  renewalLabel: string;
  isFounding: boolean;
  hasLiveSubscription: boolean;
  planCode: PlanCode | null;
  dataSource: "subscription" | "fallback";
};

function formatRenewal(iso: string | null | undefined): string {
  if (!iso) return "Shown in your account";
  try {
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
      new Date(iso),
    );
  } catch {
    return "Shown in your account";
  }
}

function fallbackContext(email: string | null): CheckoutSuccessContext {
  return {
    email,
    planLabel: "Basscally Hub",
    priceLabel: "$1.50/month",
    statusLabel: "Activating",
    renewalLabel: "Shown in your account",
    isFounding: true,
    hasLiveSubscription: false,
    planCode: "founding_monthly",
    dataSource: "fallback",
  };
}

function planDisplay(planCode: string | null) {
  const code = (planCode ?? "founding_monthly") as PlanCode;
  const plan = PLANS[code] ?? PLANS.founding_monthly;
  return { planLabel: plan.label, priceLabel: plan.priceLabel, planCode: code };
}

async function loadSubscriptionByEmail(
  email: string,
): Promise<CheckoutSuccessContext | null> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return null;
  }

  const admin = createAdminClient();
  const normalized = email.trim().toLowerCase();

  const { data: user } = await admin
    .from("users")
    .select("id, email, is_founding_member")
    .eq("email", normalized)
    .maybeSingle();

  if (!user) return null;

  const { data: subscriptions } = await admin
    .from("subscriptions")
    .select(
      "plan_code, status, current_period_end, ends_at, cancel_at_period_end, renews_at, updated_at",
    )
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const active =
    subscriptions?.find((row) => subscriptionGrantsAccess(row)) ??
    subscriptions?.[0] ??
    null;

  if (!active) {
    const display = planDisplay(user.is_founding_member ? "founding_monthly" : null);
    return {
      email: user.email,
      ...display,
      statusLabel: "Processing",
      renewalLabel: "Shown in your account",
      isFounding: user.is_founding_member,
      hasLiveSubscription: false,
      dataSource: "subscription",
    };
  }

  const display = planDisplay(active.plan_code);
  const renewalIso = active.renews_at ?? active.current_period_end ?? active.ends_at;

  return {
    email: user.email,
    ...display,
    statusLabel: subscriptionGrantsAccess(active) ? "Active" : active.status,
    renewalLabel: formatRenewal(renewalIso),
    isFounding: user.is_founding_member || active.plan_code === "founding_monthly",
    hasLiveSubscription: subscriptionGrantsAccess(active),
    dataSource: "subscription",
  };
}

export async function getCheckoutSuccessContext(options: {
  emailFromQuery?: string | null;
}): Promise<CheckoutSuccessContext> {
  let email = options.emailFromQuery?.trim().toLowerCase() ?? null;

  if (!email) {
    const member = await resolveMemberFromRequest();
    email = member?.email ?? null;
  }

  if (email) {
    const loaded = await loadSubscriptionByEmail(email);
    if (loaded) return loaded;
  }

  return fallbackContext(email);
}

export function parseCheckoutEmailFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): string | null {
  for (const key of ["email", "checkout_email", "customer_email"] as const) {
    const value = params[key];
    if (typeof value === "string" && value.includes("@")) return value;
  }
  return null;
}
