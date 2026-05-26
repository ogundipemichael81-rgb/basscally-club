/** Lemon Squeezy webhook payload (API v1 subset). */

export type LemonSqueezyMeta = {
  test_mode?: boolean;
  event_name: string;
  webhook_id?: string;
  custom_data?: Record<string, unknown>;
};

export type LemonSqueezySubscriptionAttributes = {
  store_id: number;
  customer_id: number;
  order_id: number;
  product_id: number;
  variant_id: number;
  product_name?: string;
  variant_name?: string;
  user_name?: string;
  user_email: string;
  status: string;
  status_formatted?: string;
  pause?: unknown;
  cancelled?: boolean;
  trial_ends_at?: string | null;
  billing_anchor?: number;
  renews_at?: string | null;
  ends_at?: string | null;
  created_at: string;
  updated_at: string;
  urls?: {
    customer_portal?: string | null;
    update_payment_method?: string | null;
  };
  first_subscription_item?: { id: number };
};

export type LemonSqueezyWebhookPayload = {
  meta: LemonSqueezyMeta;
  data: {
    type: string;
    id: string;
    attributes: LemonSqueezySubscriptionAttributes;
  };
};

export const LEMON_SUBSCRIPTION_EVENTS = [
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
  "subscription_expired",
  "subscription_payment_failed",
  "subscription_payment_success",
  "subscription_resumed",
  "subscription_payment_recovered",
] as const;

export type LemonSubscriptionEventName =
  (typeof LEMON_SUBSCRIPTION_EVENTS)[number];
