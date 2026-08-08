import type { PlanCode } from "@/lib/plans";

export type AccountSubscriptionSummary = {
  email: string;
  isFoundingMember: boolean;
  isTrialActive: boolean;
  trialEndsAt: string | null;
  trialEndLabel: string;
  trialRemainingLabel: string;
  foundingPriceCents: number | null;
  foundingCurrency: string | null;
  planCode: PlanCode | null;
  planLabel: string;
  priceLabel: string;
  status: string;
  statusLabel: string;
  hasAccess: boolean;
  isPastDue: boolean;
  cancelAtPeriodEnd: boolean;
  periodEndLabel: string;
  renewalLabel: string;
  customerPortalUrl: string | null;
  updatePaymentUrl: string | null;
};

export function resolveBillingPortalUrl(summary: Pick<AccountSubscriptionSummary, "customerPortalUrl" | "updatePaymentUrl">): string | null {
  return summary.updatePaymentUrl ?? summary.customerPortalUrl;
}

export function accountStatusBadgeVariant(summary: Pick<AccountSubscriptionSummary, "status" | "hasAccess" | "isPastDue">): "active" | "warning" | "danger" | "default" {
  if (summary.isPastDue || summary.status === "past_due") return "warning";
  if (summary.hasAccess) return "active";
  if (summary.status === "expired") return "danger";
  return "default";
}