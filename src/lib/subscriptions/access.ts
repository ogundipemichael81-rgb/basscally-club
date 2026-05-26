/**
 * Subscription access rules — server-side only (download API, content gates).
 * @see 08_architecture_backend_auth_payments_email_logic.md
 */

export type SubscriptionAccessRow = {
  status: string;
  current_period_end: string | null;
  ends_at: string | null;
  cancel_at_period_end: boolean;
};

const ACTIVE_STATUSES = new Set(["active", "on_trial"]);

export function subscriptionGrantsAccess(
  sub: SubscriptionAccessRow | null | undefined,
): boolean {
  if (!sub) {
    return false;
  }

  const now = Date.now();

  if (ACTIVE_STATUSES.has(sub.status)) {
    return true;
  }

  if (sub.status === "past_due") {
    const periodEnd = sub.current_period_end
      ? Date.parse(sub.current_period_end)
      : NaN;
    return !Number.isNaN(periodEnd) && periodEnd > now;
  }

  if (sub.status === "cancelled") {
    const end = sub.ends_at
      ? Date.parse(sub.ends_at)
      : sub.current_period_end
        ? Date.parse(sub.current_period_end)
        : NaN;
    return !Number.isNaN(end) && end > now;
  }

  return false;
}
