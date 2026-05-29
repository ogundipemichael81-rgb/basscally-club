import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";

export const runtime = "nodejs";

type ResendWebhookPayload = {
  type?: string;
  data?: {
    email_id?: string;
    to?: string[];
    bounce?: { message?: string };
  };
};

export async function POST(request: Request) {
  const raw = await request.text();
  let payload: ResendWebhookPayload;

  try {
    payload = JSON.parse(raw) as ResendWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messageId = payload.data?.email_id;
  if (!messageId) {
    return NextResponse.json({ received: true });
  }

  const statusMap: Record<string, string> = {
    "email.sent": "sent",
    "email.delivered": "delivered",
    "email.bounced": "bounced",
    "email.complained": "complained",
    "email.delivery_delayed": "delayed",
  };

  const mappedStatus = statusMap[payload.type ?? ""] ?? payload.type ?? "event";
  const admin = createAdminClient();

  await admin
    .from("email_logs")
    .update({
      status: mappedStatus,
      provider_event_id: payload.type ?? null,
      error_reason: payload.data?.bounce?.message ?? null,
    })
    .eq("provider_message_id", messageId);

  if (getServerEnv().RESEND_API_KEY.length === 0) {
    return NextResponse.json({ received: true, configured: false });
  }

  return NextResponse.json({ received: true });
}
