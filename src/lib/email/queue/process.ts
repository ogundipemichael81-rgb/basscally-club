import "server-only";

import { EMAIL_QUEUE_MAX_ATTEMPTS } from "@/lib/constants";
import { sendEmail } from "@/lib/email/client";
import { generateMagicLinkForEmail } from "@/lib/email/magic-link";
import {
  renderNewDropEmail,
  renderPaymentFailedEmail,
  renderWelcomeEmail,
} from "@/lib/email/templates/render";
import { isEmailUnsubscribed, buildUnsubscribeUrl } from "@/lib/email/unsubscribe";
import { fetchPendingQueueItems } from "@/lib/email/queue/enqueue";
import { createAdminClient } from "@/lib/supabase/admin";

type QueueRow = {
  id: string;
  user_id: string | null;
  content_id: string | null;
  email_type: string;
  attempts: string | null;
};

async function loadUser(userId: string) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("users")
    .select("id, email, name")
    .eq("id", userId)
    .maybeSingle();
  return data;
}

async function loadContent(contentId: string) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("content")
    .select("id, title, description, email_subject, email_body")
    .eq("id", contentId)
    .maybeSingle();
  return data;
}

async function loadBillingPortalUrl(userId: string): Promise<string | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select("update_payment_method_url, customer_portal_url")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.update_payment_method_url ?? data?.customer_portal_url ?? null;
}

async function markQueueRow(
  rowId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  const admin = createAdminClient();
  await admin
    .from("email_queue")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", rowId);
}

async function writeEmailLog(options: {
  userId: string | null;
  contentId: string | null;
  emailType: string;
  status: string;
  providerMessageId?: string;
  errorReason?: string;
}): Promise<void> {
  const admin = createAdminClient();
  await admin.from("email_logs").insert({
    user_id: options.userId,
    content_id: options.contentId,
    email_type: options.emailType,
    status: options.status,
    provider_message_id: options.providerMessageId ?? null,
    error_reason: options.errorReason ?? null,
    sent_at: options.status === "sent" ? new Date().toISOString() : null,
  });
}

async function processQueueRow(row: QueueRow): Promise<boolean> {
  if (!row.user_id) {
    await markQueueRow(row.id, {
      status: "failed",
      error_reason: "Missing user_id on queue row.",
      attempts: String(Number.parseInt(String(row.attempts ?? "0"), 10) + 1),
    });
    return false;
  }

  const user = await loadUser(row.user_id);
  if (!user?.email) {
    await markQueueRow(row.id, {
      status: "failed",
      error_reason: "User email not found.",
      attempts: String(Number.parseInt(String(row.attempts ?? "0"), 10) + 1),
    });
    return false;
  }

  if (await isEmailUnsubscribed(user.email)) {
    await markQueueRow(row.id, { status: "skipped", error_reason: "unsubscribed" });
    await writeEmailLog({
      userId: user.id,
      contentId: row.content_id,
      emailType: row.email_type,
      status: "skipped",
      errorReason: "unsubscribed",
    });
    return true;
  }

  let rendered;
  if (row.email_type === "welcome") {
    const magicLinkUrl = await generateMagicLinkForEmail(user.email);
    if (!magicLinkUrl) {
      await markQueueRow(row.id, {
        status: "failed",
        error_reason: "Could not generate magic link.",
        attempts: String(Number.parseInt(String(row.attempts ?? "0"), 10) + 1),
      });
      return false;
    }
    rendered = renderWelcomeEmail({
      name: user.name,
      magicLinkUrl,
      unsubscribeUrl: buildUnsubscribeUrl(user.email),
    });
  } else if (row.email_type === "payment_failed") {
    const portalUrl = await loadBillingPortalUrl(user.id);
    rendered = renderPaymentFailedEmail({
      billingPortalUrl: portalUrl,
      unsubscribeUrl: buildUnsubscribeUrl(user.email),
    });
  } else if (row.email_type === "new_drop" || row.email_type === "new_drop_resend") {
    if (!row.content_id) {
      await markQueueRow(row.id, {
        status: "failed",
        error_reason: "Missing content_id for new drop email.",
        attempts: String(Number.parseInt(String(row.attempts ?? "0"), 10) + 1),
      });
      return false;
    }
    const content = await loadContent(row.content_id);
    if (!content) {
      await markQueueRow(row.id, {
        status: "failed",
        error_reason: "Content not found.",
        attempts: String(Number.parseInt(String(row.attempts ?? "0"), 10) + 1),
      });
      return false;
    }
    rendered = renderNewDropEmail({
      dropTitle: content.title,
      dropDescription: content.description,
      contentId: content.id,
      customSubject: content.email_subject,
      customBody: content.email_body,
      unsubscribeUrl: buildUnsubscribeUrl(user.email),
    });
  } else {
    await markQueueRow(row.id, {
      status: "failed",
      error_reason: `Unknown email type: ${row.email_type}`,
      attempts: String(Number.parseInt(String(row.attempts ?? "0"), 10) + 1),
    });
    return false;
  }

  const result = await sendEmail({
    to: user.email,
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
  });

  const attempts = Number.parseInt(String(row.attempts ?? "0"), 10) + 1;

  if (!result.ok) {
    const failed = attempts >= EMAIL_QUEUE_MAX_ATTEMPTS;
    await markQueueRow(row.id, {
      status: failed ? "failed" : "pending",
      error_reason: result.error,
      attempts: String(attempts),
    });
    await writeEmailLog({
      userId: user.id,
      contentId: row.content_id,
      emailType: row.email_type,
      status: "failed",
      errorReason: result.error,
    });
    return false;
  }

  await markQueueRow(row.id, {
    status: "sent",
    provider_message_id: result.messageId,
    attempts: String(attempts),
    error_reason: null,
  });
  await writeEmailLog({
    userId: user.id,
    contentId: row.content_id,
    emailType: row.email_type,
    status: "sent",
    providerMessageId: result.messageId,
  });

  return true;
}

export async function processEmailQueue(options?: {
  limit?: number;
}): Promise<{ processed: number; sent: number }> {
  const rows = await fetchPendingQueueItems(options?.limit ?? 25);
  let sent = 0;

  for (const row of rows) {
    await markQueueRow(row.id, {
      locked_at: new Date().toISOString(),
    });
    const ok = await processQueueRow(row as QueueRow);
    if (ok) sent += 1;
  }

  return { processed: rows.length, sent };
}

export async function triggerWelcomeEmail(userId: string): Promise<void> {
  const { queueWelcomeEmail } = await import("@/lib/email/queue/enqueue");
  await queueWelcomeEmail(userId);
  await processEmailQueue({ limit: 5 });
}
