/** Map Lemon Squeezy subscription status to internal status string. */

const STATUS_MAP: Record<string, string> = {
  active: "active",
  on_trial: "on_trial",
  paused: "paused",
  past_due: "past_due",
  unpaid: "unpaid",
  cancelled: "cancelled",
  expired: "expired",
};

export function mapLemonSubscriptionStatus(lemonStatus: string): string {
  return STATUS_MAP[lemonStatus] ?? lemonStatus;
}
