import "server-only";

import { clientEnv, getServerEnv } from "@/lib/env";
import type { PlanCode } from "@/lib/plans";
import { routes } from "@/lib/routes";

function variantIdForPlan(planCode: PlanCode): string {
  const env = getServerEnv();
  switch (planCode) {
    case "founding_monthly":
      return env.LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID;
    case "standard_monthly":
      return env.LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID;
    case "annual_18":
      return env.LEMONSQUEEZY_ANNUAL_18_VARIANT_ID;
    case "club_plus":
      return env.LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID;
    default:
      return "";
  }
}

export function getCheckoutUrl(planCode: PlanCode): string {
  const variantId = variantIdForPlan(planCode);
  if (!variantId) {
    return `${clientEnv.NEXT_PUBLIC_APP_URL}${routes.pricing}`;
  }

  const successUrl = encodeURIComponent(
    `${clientEnv.NEXT_PUBLIC_APP_URL}${routes.checkout.success}?email={checkout_email}`,
  );
  const cancelUrl = encodeURIComponent(
    `${clientEnv.NEXT_PUBLIC_APP_URL}${routes.checkout.cancelled}`,
  );

  return `https://app.lemonsqueezy.com/checkout/buy/${variantId}?checkout[success_url]=${successUrl}&checkout[cancel_url]=${cancelUrl}`;
}

export function getFoundingCheckoutUrl(): string {
  return getCheckoutUrl("founding_monthly");
}

export const PLAN_VARIANT_ENV_KEYS: Record<PlanCode, string> = {
  founding_monthly: "LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID",
  standard_monthly: "LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID",
  annual_18: "LEMONSQUEEZY_ANNUAL_18_VARIANT_ID",
  club_plus: "LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID",
};

export function getCheckoutUrlsByPlan(): Record<PlanCode, string> {
  return {
    founding_monthly: getCheckoutUrl("founding_monthly"),
    standard_monthly: getCheckoutUrl("standard_monthly"),
    annual_18: getCheckoutUrl("annual_18"),
    club_plus: getCheckoutUrl("club_plus"),
  };
}
