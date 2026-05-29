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
  priceAmount: string;
  pricePeriod: string;
  description: string;
  badge: string;
  badgeTone: "brand" | "success" | "info" | "warn";
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
  /** Hidden until product offers Hub Plus */
  hidden?: boolean;
};

export const PLANS: Record<PlanCode, PlanDefinition> = {
  founding_monthly: {
    code: "founding_monthly",
    label: "Founding member",
    priceLabel: "$1.50/month",
    priceAmount: "$1.50",
    pricePeriod: "/ month",
    description: "Best for the first 500 to 1,000 early members.",
    badge: "Founder lock-in",
    badgeTone: "brand",
    features: [
      "All weekly grooves, fills, and challenges",
      "Member dashboard access",
      "Audio play and gated downloads",
      "Early member price stays locked",
    ],
    ctaLabel: "Join as founder",
    highlighted: true,
  },
  standard_monthly: {
    code: "standard_monthly",
    label: "Monthly Hub",
    priceLabel: "$2.99/month",
    priceAmount: "$2.99",
    pricePeriod: "/ month",
    description: "Standard monthly membership after the founding offer ends.",
    badge: "Public price",
    badgeTone: "info",
    features: [
      "All fresh Basscally drops",
      "Cancel anytime",
      "Magic-link login",
      "Billing portal access",
    ],
    ctaLabel: "Choose monthly",
  },
  annual_18: {
    code: "annual_18",
    label: "Annual lock-in",
    priceLabel: "$18/year",
    priceAmount: "$18",
    pricePeriod: "/ year",
    description: "Best value. Cleaner revenue for the team.",
    badge: "Recommended",
    badgeTone: "success",
    features: [
      "Same full Hub access",
      "Lower effective monthly cost",
      "Fewer payment failures",
      "Better for serious practice habit",
    ],
    ctaLabel: "Choose annual",
  },
  club_plus: {
    code: "club_plus",
    label: "Hub Plus",
    priceLabel: "$9/month",
    priceAmount: "$9",
    pricePeriod: "/ month",
    description: "Future tier — feedback, challenges, premium drops.",
    badge: "Later tier",
    badgeTone: "warn",
    features: [],
    ctaLabel: "Coming later",
    hidden: true,
  },
};

export const VISIBLE_PLANS = PLAN_CODES.filter(
  (code) => !PLANS[code].hidden,
).map((code) => PLANS[code]);

/** Display order on Screen 32 — monthly, founding (centre), annual */
export const PRICING_DISPLAY_ORDER: PlanCode[] = [
  "standard_monthly",
  "founding_monthly",
  "annual_18",
];
