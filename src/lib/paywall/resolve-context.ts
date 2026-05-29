import "server-only";

import { getAccountSubscriptionSummary } from "@/lib/account/subscription-summary";
import { resolveBillingPortalUrl } from "@/lib/account/types";
import { getContentDetail } from "@/lib/content/queries";
import { getFoundingMemberStats } from "@/lib/founding/stats";
import { getCheckoutUrl } from "@/lib/lemonsqueezy/checkout-url";
import type { PaywallContext, PaywallReason } from "@/lib/paywall/types";
import { getMemberSession } from "@/lib/subscriptions/member-session";
import { routes } from "@/lib/routes";

const VALID_REASONS: PaywallReason[] = ["anonymous", "lapsed", "past_due"];

export function parsePaywallReason(value: string | undefined): PaywallReason {
  if (value && VALID_REASONS.includes(value as PaywallReason)) {
    return value as PaywallReason;
  }
  return "anonymous";
}

export async function resolvePaywallContext(options: {
  contentId?: string | null;
  reason?: string | null;
}): Promise<PaywallContext> {
  const contentId = options.contentId?.trim() || null;
  const reasonParam = parsePaywallReason(options.reason ?? undefined);

  const [content, session, summary, foundingStats] = await Promise.all([
    contentId ? getContentDetail(contentId) : Promise.resolve(null),
    getMemberSession(),
    getAccountSubscriptionSummary(),
    getFoundingMemberStats(),
  ]);

  const isAuthenticated = Boolean(session);
  const isFoundingMember = summary?.isFoundingMember ?? false;
  const showFoundingRejoin =
    isFoundingMember && foundingStats.spotsRemaining > 0;

  let reason = reasonParam;
  if (isAuthenticated && summary) {
    if (summary.isPastDue && !summary.hasAccess) {
      reason = "past_due";
    } else if (!summary.hasAccess) {
      reason = "lapsed";
    }
  }

  const foundingAvailable = foundingStats.spotsRemaining > 0;

  let reactivateCheckoutUrl: string;
  if (showFoundingRejoin) {
    reactivateCheckoutUrl = getCheckoutUrl("founding_monthly");
  } else if (reason === "anonymous" && foundingAvailable) {
    reactivateCheckoutUrl = getCheckoutUrl("founding_monthly");
  } else {
    reactivateCheckoutUrl = getCheckoutUrl("standard_monthly");
  }

  const loginNext = contentId
    ? routes.member.content(contentId)
    : routes.member.dashboard;

  return {
    reason,
    content,
    isFoundingMember,
    showFoundingRejoin,
    foundingSpotsRemaining: foundingStats.spotsRemaining,
    reactivateCheckoutUrl,
    billingPortalUrl: summary ? resolveBillingPortalUrl(summary) : null,
    loginUrl: `${routes.auth.login}?next=${encodeURIComponent(loginNext)}`,
    isAuthenticated,
  };
}
