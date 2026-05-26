import type { PlanCode } from "@/lib/plans";
import { getServerEnv } from "@/lib/env";

/** Map Lemon Squeezy variant ID to internal plan_code. */
export function planCodeFromVariantId(variantId: number | string): PlanCode {
  const id = String(variantId);
  const env = getServerEnv();

  if (id === env.LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID) {
    return "founding_monthly";
  }
  if (id === env.LEMONSQUEEZY_ANNUAL_18_VARIANT_ID) {
    return "annual_18";
  }
  if (id === env.LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID) {
    return "club_plus";
  }
  if (id === env.LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID) {
    return "standard_monthly";
  }

  return "standard_monthly";
}
