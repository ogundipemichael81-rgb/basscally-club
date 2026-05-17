/**
 * Pure subscription access rules from 08_architecture — no DB calls in Phase 1.
 */

export type SubscriptionStatus =
  | "active"
  | "cancelled"
  | "past_due"
  | "unpaid"
  | "expired"
  | "paused"
  | "on_trial";

export type SubscriptionAccessInput = {
  status: SubscriptionStatus | null;
  currentPeriodEnd: Date | null;
  endsAt: Date | null;
  now?: Date;
};

export function hasActiveAccess(input: SubscriptionAccessInput): boolean {
  const now = input.now ?? new Date();

  if (!input.status) {
    return false;
  }

  if (input.status === "active") {
    return true;
  }

  const periodEnd = input.endsAt ?? input.currentPeriodEnd;

  if (
    (input.status === "cancelled" || input.status === "past_due") &&
    periodEnd &&
    periodEnd > now
  ) {
    return true;
  }

  return false;
}
