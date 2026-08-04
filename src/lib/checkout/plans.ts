import "server-only";
import { getServerEnv } from "@/lib/env";

export const JOIN_PLANS = {
  "founding-monthly": { code: "founding_monthly", label: "Founding Member", price: "$1.50/month", env: "LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID" },
  "standard-monthly": { code: "standard_monthly", label: "Monthly", price: "$2.99/month", env: "LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID" },
  annual: { code: "annual_18", label: "Annual", price: "$18/year", env: "LEMONSQUEEZY_ANNUAL_18_VARIANT_ID" },
} as const;
export type JoinPlanKey = keyof typeof JOIN_PLANS;
export function isJoinPlanKey(value: unknown): value is JoinPlanKey { return typeof value === "string" && value in JOIN_PLANS; }
export function resolveJoinPlan(value: unknown) { if (!isJoinPlanKey(value)) return null; const plan=JOIN_PLANS[value]; const env=getServerEnv(); const variant=env[plan.env]; return variant ? { key:value, ...plan, variantId:variant } : null; }

