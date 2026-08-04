import type { PlanCode } from "@/lib/plans";
import { routes } from "@/lib/routes";
const key:Record<PlanCode,string>={founding_monthly:"founding-monthly",standard_monthly:"standard-monthly",annual_18:"annual",club_plus:"standard-monthly"};
export function getCheckoutUrl(plan:PlanCode){return `${routes.join}?plan=${key[plan]}`;}
export function getFoundingCheckoutUrl(){return getCheckoutUrl("founding_monthly");}
export function getCheckoutUrlsByPlan():Record<PlanCode,string>{return {founding_monthly:getCheckoutUrl("founding_monthly"),standard_monthly:getCheckoutUrl("standard_monthly"),annual_18:getCheckoutUrl("annual_18"),club_plus:getCheckoutUrl("club_plus")};}
export const PLAN_VARIANT_ENV_KEYS:Record<PlanCode,string>={founding_monthly:"LEMONSQUEEZY_FOUNDING_MONTHLY_VARIANT_ID",standard_monthly:"LEMONSQUEEZY_STANDARD_MONTHLY_VARIANT_ID",annual_18:"LEMONSQUEEZY_ANNUAL_18_VARIANT_ID",club_plus:"LEMONSQUEEZY_CLUB_PLUS_VARIANT_ID"};

