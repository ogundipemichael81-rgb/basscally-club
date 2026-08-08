import "server-only";

import { PLANS, type PlanCode } from "@/lib/plans";
import type { AccountSubscriptionSummary } from "@/lib/account/types";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { resolveMemberFromRequest, readMockPersonaId } from "@/lib/subscriptions/resolve-member";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";

export type { AccountSubscriptionSummary } from "@/lib/account/types";
export { accountStatusBadgeVariant, resolveBillingPortalUrl } from "@/lib/account/types";

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "-";
  try { return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(iso)); }
  catch { return "-"; }
}

function formatRemaining(iso: string | null | undefined): string {
  const endsAt = iso ? Date.parse(iso) : NaN;
  const remaining = endsAt - Date.now();
  if (!Number.isFinite(remaining) || remaining <= 0) return "Ended";
  const hours = Math.ceil(remaining / 3600000);
  const days = Math.floor(hours / 24);
  return days > 0 ? `${days} day${days === 1 ? "" : "s"} remaining` : `${hours} hour${hours === 1 ? "" : "s"} remaining`;
}

function inactiveSummary(email: string, founding = false): AccountSubscriptionSummary {
  const plan = founding ? PLANS.founding_monthly : PLANS.standard_monthly;
  return { email, isFoundingMember: founding, isTrialActive: false, trialEndsAt: null, trialEndLabel: "-", trialRemainingLabel: "-", foundingPriceCents: null, foundingCurrency: null, planCode: plan.code, planLabel: plan.label, priceLabel: plan.priceLabel, status: "inactive", statusLabel: "No active plan", hasAccess: false, isPastDue: false, cancelAtPeriodEnd: false, periodEndLabel: "-", renewalLabel: "-", customerPortalUrl: null, updatePaymentUrl: null };
}

function demoSummary(email: string): AccountSubscriptionSummary {
  const trialEndsAt = new Date(Date.now() + 7 * 86400000).toISOString();
  return { email, isFoundingMember: true, isTrialActive: true, trialEndsAt, trialEndLabel: formatDate(trialEndsAt), trialRemainingLabel: formatRemaining(trialEndsAt), foundingPriceCents: 150, foundingCurrency: "USD", planCode: null, planLabel: "7-Day Founding Trial", priceLabel: "$1.50/month", status: "trial", statusLabel: "Free trial", hasAccess: true, isPastDue: false, cancelAtPeriodEnd: false, periodEndLabel: formatDate(trialEndsAt), renewalLabel: "-", customerPortalUrl: null, updatePaymentUrl: null };
}

export async function getAccountSubscriptionSummary(): Promise<AccountSubscriptionSummary | null> {
  const member = await resolveMemberFromRequest();
  if (!member) return null;
  const mockId = await readMockPersonaId();
  if (process.env.NODE_ENV === "development" && mockId === "mock-member-lapsed") return { ...inactiveSummary(member.email), status: "expired", statusLabel: "Expired" };
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) return demoSummary(member.email);

  const admin = createAdminClient();
  const { data: user } = await admin.from("users").select("email, is_founding_member, founding_eligible, founding_price_locked, founding_price_cents, founding_currency, trial_started_at, trial_ends_at").eq("id", member.userId).maybeSingle();
  if (!user) return inactiveSummary(member.email);

  const { data: subscriptions } = await admin.from("subscriptions").select("plan_code, status, current_period_end, ends_at, renews_at, cancel_at_period_end, customer_portal_url, update_payment_method_url, updated_at").eq("user_id", member.userId).order("updated_at", { ascending: false });
  const subscription = subscriptions?.find((row) => subscriptionGrantsAccess(row)) ?? subscriptions?.[0] ?? null;
  const trialActive = Boolean(user.trial_ends_at && Date.parse(user.trial_ends_at) > Date.now());
  const founding = Boolean(user.is_founding_member || user.founding_eligible);

  if (!subscription && trialActive) {
    return { email: user.email, isFoundingMember: founding, isTrialActive: true, trialEndsAt: user.trial_ends_at, trialEndLabel: formatDate(user.trial_ends_at), trialRemainingLabel: formatRemaining(user.trial_ends_at), foundingPriceCents: user.founding_price_cents, foundingCurrency: user.founding_currency, planCode: null, planLabel: "7-Day Founding Trial", priceLabel: "$1.50/month", status: "trial", statusLabel: "Free trial", hasAccess: true, isPastDue: false, cancelAtPeriodEnd: false, periodEndLabel: formatDate(user.trial_ends_at), renewalLabel: "-", customerPortalUrl: null, updatePaymentUrl: null };
  }
  if (!subscription) return inactiveSummary(user.email, founding);

  const planCode = (subscription.plan_code ?? "founding_monthly") as PlanCode;
  const plan = PLANS[planCode] ?? PLANS.founding_monthly;
  const hasAccess = subscriptionGrantsAccess(subscription);
  const periodIso = subscription.ends_at ?? subscription.current_period_end ?? subscription.renews_at;
  return { email: user.email, isFoundingMember: founding || planCode === "founding_monthly", isTrialActive: trialActive, trialEndsAt: user.trial_ends_at, trialEndLabel: formatDate(user.trial_ends_at), trialRemainingLabel: formatRemaining(user.trial_ends_at), foundingPriceCents: user.founding_price_cents, foundingCurrency: user.founding_currency, planCode, planLabel: plan.label, priceLabel: plan.priceLabel, status: subscription.status, statusLabel: hasAccess && (subscription.status === "active" || subscription.status === "on_trial") ? "Active" : subscription.status.replace(/_/g, " "), hasAccess, isPastDue: subscription.status === "past_due", cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end), periodEndLabel: formatDate(periodIso), renewalLabel: formatDate(subscription.renews_at ?? periodIso), customerPortalUrl: subscription.customer_portal_url, updatePaymentUrl: subscription.update_payment_method_url };
}