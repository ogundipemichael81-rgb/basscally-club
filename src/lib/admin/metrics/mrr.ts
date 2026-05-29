import type { PlanCode } from "@/lib/plans";

/** Monthly recurring revenue equivalent in USD for each plan. */
const MONTHLY_USD: Record<PlanCode, number> = {
  founding_monthly: 1.5,
  standard_monthly: 2.99,
  annual_18: 1.5,
  club_plus: 9,
};

export function planMonthlyUsd(planCode: string | null | undefined): number {
  if (!planCode || !(planCode in MONTHLY_USD)) {
    return 0;
  }
  return MONTHLY_USD[planCode as PlanCode];
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
