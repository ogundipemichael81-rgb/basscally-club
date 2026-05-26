import "server-only";

import { clientEnv, getServerEnv } from "@/lib/env";
import { FOUNDING_MEMBER_CAP } from "@/lib/constants";
import { mapLemonSubscriptionStatus } from "@/lib/lemonsqueezy/map-status";
import { planCodeFromVariantId } from "@/lib/lemonsqueezy/plan-from-variant";
import type { LemonSqueezyWebhookPayload } from "@/lib/lemonsqueezy/types";
import { createAdminClient } from "@/lib/supabase/admin";

const WEBHOOK_AUDIT_ACTION = "lemonsqueezy_webhook";

function eventDedupeKey(payload: LemonSqueezyWebhookPayload): string {
  const { meta, data } = payload;
  const updated = data.attributes.updated_at ?? "";
  return `${meta.event_name}:${data.id}:${updated}`;
}

async function isDuplicateWebhookEvent(eventKey: string): Promise<boolean> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("audit_events")
    .select("id")
    .eq("action", WEBHOOK_AUDIT_ACTION)
    .eq("entity_id", eventKey)
    .maybeSingle();

  return Boolean(data);
}

async function recordWebhookEvent(
  eventKey: string,
  payload: LemonSqueezyWebhookPayload,
): Promise<void> {
  const admin = createAdminClient();
  await admin.from("audit_events").insert({
    action: WEBHOOK_AUDIT_ACTION,
    entity_type: "lemonsqueezy",
    entity_id: eventKey,
    metadata_json: {
      event_name: payload.meta.event_name,
      subscription_id: payload.data.id,
      email: payload.data.attributes.user_email,
    },
  });
}

async function countFoundingMembers(): Promise<number> {
  const admin = createAdminClient();
  const { count, error } = await admin
    .from("users")
    .select("id", { count: "exact", head: true })
    .eq("is_founding_member", true);

  if (error) {
    return FOUNDING_MEMBER_CAP;
  }
  return count ?? FOUNDING_MEMBER_CAP;
}

async function upsertUserByEmail(
  email: string,
  name: string | undefined,
  isFoundingMember: boolean,
): Promise<string> {
  const admin = createAdminClient();
  const normalized = email.trim().toLowerCase();

  const { data: existing } = await admin
    .from("users")
    .select("id, is_founding_member")
    .eq("email", normalized)
    .maybeSingle();

  if (existing) {
    const keepFounding = existing.is_founding_member || isFoundingMember;
    await admin
      .from("users")
      .update({
        ...(name ? { name } : {}),
        is_founding_member: keepFounding,
      })
      .eq("id", existing.id);
    return existing.id;
  }

  const { data: created, error } = await admin
    .from("users")
    .insert({
      email: normalized,
      name: name ?? null,
      is_founding_member: isFoundingMember,
    })
    .select("id")
    .single();

  if (error || !created) {
    throw new Error(`Failed to create user: ${error?.message ?? "unknown"}`);
  }

  return created.id;
}

async function upsertSubscription(
  userId: string,
  payload: LemonSqueezyWebhookPayload,
  planCode: string,
  status: string,
  eventId: string,
): Promise<void> {
  const admin = createAdminClient();
  const attrs = payload.data.attributes;
  const providerSubId = payload.data.id;

  const row = {
    user_id: userId,
    provider: "lemonsqueezy",
    provider_customer_id: String(attrs.customer_id),
    provider_subscription_id: providerSubId,
    provider_variant_id: String(attrs.variant_id),
    provider_price_id: null,
    plan_code: planCode,
    status,
    current_period_start: attrs.created_at,
    current_period_end: attrs.renews_at ?? attrs.ends_at ?? null,
    renews_at: attrs.renews_at ?? null,
    ends_at: attrs.ends_at ?? null,
    cancel_at_period_end: attrs.cancelled === true,
    customer_portal_url: attrs.urls?.customer_portal ?? null,
    update_payment_method_url: attrs.urls?.update_payment_method ?? null,
    last_webhook_event_id: eventId,
    updated_at: new Date().toISOString(),
  };

  const { data: existing } = await admin
    .from("subscriptions")
    .select("id")
    .eq("provider_subscription_id", providerSubId)
    .maybeSingle();

  if (existing) {
    const { error } = await admin
      .from("subscriptions")
      .update(row)
      .eq("id", existing.id);
    if (error) {
      throw new Error(`Failed to update subscription: ${error.message}`);
    }
    return;
  }

  const { error } = await admin.from("subscriptions").insert({
    ...row,
    created_at: new Date().toISOString(),
  });
  if (error) {
    throw new Error(`Failed to insert subscription: ${error.message}`);
  }
}

async function sendMagicLinkEmail(email: string): Promise<void> {
  const admin = createAdminClient();
  const redirectTo = `${clientEnv.NEXT_PUBLIC_APP_URL}/auth/callback`;

  const { error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: email.trim().toLowerCase(),
    options: { redirectTo },
  });

  if (error) {
    console.error("[lemonsqueezy] magic link generation failed:", error.message);
  }
}

export type WebhookHandlerResult =
  | { ok: true; duplicate?: boolean; event: string }
  | { ok: false; error: string; status: number };

export async function handleLemonSqueezyWebhook(
  payload: LemonSqueezyWebhookPayload,
): Promise<WebhookHandlerResult> {
  const eventName = payload.meta.event_name;
  const eventKey = eventDedupeKey(payload);

  if (await isDuplicateWebhookEvent(eventKey)) {
    return { ok: true, duplicate: true, event: eventName };
  }

  const attrs = payload.data.attributes;
  const email = attrs.user_email;
  if (!email) {
    return { ok: false, error: "Missing user_email", status: 422 };
  }

  const planCode = planCodeFromVariantId(attrs.variant_id);
  let status = mapLemonSubscriptionStatus(attrs.status);

  if (eventName === "subscription_cancelled") {
    status = "cancelled";
  }
  if (eventName === "subscription_expired") {
    status = "expired";
  }
  if (eventName === "subscription_payment_failed") {
    status = "past_due";
  }
  if (eventName === "subscription_payment_success") {
    status = status === "past_due" ? "active" : status;
  }

  let isFoundingMember = false;
  if (planCode === "founding_monthly") {
    const foundingCount = await countFoundingMembers();
    isFoundingMember = foundingCount < FOUNDING_MEMBER_CAP;
  }

  const userId = await upsertUserByEmail(
    email,
    attrs.user_name,
    isFoundingMember,
  );

  await upsertSubscription(userId, payload, planCode, status, eventKey);

  if (eventName === "subscription_created") {
    await sendMagicLinkEmail(email);
  }

  await recordWebhookEvent(eventKey, payload);

  return { ok: true, event: eventName };
}

export function isWebhookBackendReady(): boolean {
  const env = getServerEnv();
  return (
    env.LEMONSQUEEZY_WEBHOOK_SECRET.length > 0 &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    env.SUPABASE_SERVICE_ROLE_KEY.length > 0
  );
}
