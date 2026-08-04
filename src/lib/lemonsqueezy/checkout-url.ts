import "server-only";

import { isAdminEmail } from "@/lib/admin/allowlist";
import type { PlanCode } from "@/lib/plans";
import { routes } from "@/lib/routes";
import { getMemberSession } from "@/lib/subscriptions/member-session";

const PLAN_SLUG: Record<PlanCode, string> = {
  founding_monthly: "founding-monthly",
  standard_monthly: "standard-monthly",
  annual_18: "annual",
  club_plus: "standard-monthly",
};

export function planSlug(plan: PlanCode) {
  return PLAN_SLUG[plan];
}

/**
 * Server-owned plan routing. Never derive the destination from a browser flag.
 * This is the guard against returning signed-in people to /join.
 */
export async function getCheckoutUrl(plan: PlanCode): Promise<string> {
  const session = await getMemberSession();
  if (!session) return `${routes.join}?plan=${PLAN_SLUG[plan]}`;
  if (isAdminEmail(session.email)) return routes.admin.root;
  if (session.hasAccess) return routes.member.accountBilling;
  return `${routes.checkoutFlow}?plan=${PLAN_SLUG[plan]}`;
}

export async function getFoundingCheckoutUrl() {
  return getCheckoutUrl("founding_monthly");
}

export async function getCheckoutUrlsByPlan(): Promise<Record<PlanCode, string>> {
  const plans: PlanCode[] = [
    "founding_monthly",
    "standard_monthly",
    "annual_18",
    "club_plus",
  ];
  const entries = await Promise.all(
    plans.map(async (plan) => [plan, await getCheckoutUrl(plan)] as const),
  );
  return Object.fromEntries(entries) as Record<PlanCode, string>;
}

export const PLAN_VARIANT_ENV_KEYS: Record<PlanCode, string> = {
  founding_monthly: "LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID",
  standard_monthly: "LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID",
  annual_18: "LEMONSQUEEZY_ANNUAL_18_VARIANT_ID",
  club_plus: "LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID",
};
