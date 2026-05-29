import "server-only";

import { EMAIL_QUEUE_MAX_ATTEMPTS } from "@/lib/constants";
import { EMAIL_TYPES } from "@/lib/email/constants";
import { createAdminClient } from "@/lib/supabase/admin";
import { listActiveSubscribers } from "@/lib/email/subscribers";

export async function queueWelcomeEmail(userId: string): Promise<string | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("email_queue")
    .insert({
      user_id: userId,
      email_type: EMAIL_TYPES.welcome,
      status: "pending",
      scheduled_for: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[email] queue welcome failed:", error?.message);
    return null;
  }

  return data.id;
}

export async function queuePaymentFailedEmail(userId: string): Promise<void> {
  const admin = createAdminClient();
  await admin.from("email_queue").insert({
    user_id: userId,
    email_type: EMAIL_TYPES.paymentFailed,
    status: "pending",
    scheduled_for: new Date().toISOString(),
  });
}

/** Fan out new-drop notification to 100% active subscribers. */
export async function fanOutNewDropEmails(contentId: string): Promise<number> {
  const subscribers = await listActiveSubscribers();
  if (subscribers.length === 0) {
    return 0;
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const rows = subscribers.map((subscriber) => ({
    user_id: subscriber.userId,
    content_id: contentId,
    email_type: EMAIL_TYPES.newDrop,
    status: "pending",
    scheduled_for: now,
  }));

  const { error } = await admin.from("email_queue").insert(rows);
  if (error) {
    throw new Error(error.message);
  }

  return rows.length;
}

export async function fanOutNewDropResend(contentId: string): Promise<number> {
  const subscribers = await listActiveSubscribers();
  if (subscribers.length === 0) {
    return 0;
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const rows = subscribers.map((subscriber) => ({
    user_id: subscriber.userId,
    content_id: contentId,
    email_type: EMAIL_TYPES.newDropResend,
    status: "pending",
    scheduled_for: now,
  }));

  const { error } = await admin.from("email_queue").insert(rows);
  if (error) {
    throw new Error(error.message);
  }

  return rows.length;
}

export async function fetchPendingQueueItems(limit = 25) {
  const admin = createAdminClient();
  const now = new Date().toISOString();

  const { data } = await admin
    .from("email_queue")
    .select("*")
    .eq("status", "pending")
    .lte("scheduled_for", now)
    .order("created_at", { ascending: true })
    .limit(limit);

  return (data ?? []).filter((row) => {
    const attempts = Number.parseInt(String(row.attempts ?? "0"), 10);
    return attempts < EMAIL_QUEUE_MAX_ATTEMPTS;
  });
}
