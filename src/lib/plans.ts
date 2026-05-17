/**
 * Plan codes and display metadata — no checkout wiring in Phase 1.
 * @see 08_architecture_backend_auth_payments_email_logic.md
 */

export const PLAN_CODES = [
  "founding_monthly",
  "standard_monthly",
  "annual_18",
  "club_plus",
] as const;

export type PlanCode = (typeof PLAN_CODES)[number];

export type PlanDefinition = {
  code: PlanCode;
  label: string;
  priceLabel: string;
  description: string;
  /** Hidden until product offers Club Plus */
  hidden?: boolean;
};

export const PLANS: Record<PlanCode, PlanDefinition> = {
  founding_monthly: {
    code: "founding_monthly",
    label: "Founding Member",
    priceLabel: "$1.50/month",
    description: "Locked for life while membership stays active.",
  },
  standard_monthly: {
    code: "standard_monthly",
    label: "Monthly",
    priceLabel: "$2.99/month",
    description: "Public monthly after the founding window closes.",
  },
  annual_18: {
    code: "annual_18",
    label: "Annual",
    priceLabel: "$18/year",
    description: "Annual lock-in to reduce payment-fee drag.",
  },
  club_plus: {
    code: "club_plus",
    label: "Club Plus",
    priceLabel: "$9/month",
    description: "Future tier — feedback, challenges, premium drops.",
    hidden: true,
  },
};

export const VISIBLE_PLANS = PLAN_CODES.filter(
  (code) => !PLANS[code].hidden,
).map((code) => PLANS[code]);
