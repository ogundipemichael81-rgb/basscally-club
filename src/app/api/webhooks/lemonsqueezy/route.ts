import { NextResponse } from "next/server";
import { verifyLemonSqueezySignature } from "@/lib/lemonsqueezy/verify-signature";
import type { LemonSqueezyWebhookPayload } from "@/lib/lemonsqueezy/types";
import { getServerEnv } from "@/lib/env";
import {
  handleLemonSqueezyWebhook,
  isWebhookBackendReady,
} from "@/lib/webhooks/lemonsqueezy-handler";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isWebhookBackendReady()) {
    return NextResponse.json(
      {
        error: "Webhook backend not configured",
        message:
          "Set LEMONSQUEEZY_WEBHOOK_SECRET, SUPABASE_SERVICE_ROLE_KEY, and NEXT_PUBLIC_SUPABASE_URL.",
      },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const signature =
    request.headers.get("x-signature") ??
    request.headers.get("X-Signature");

  const { LEMONSQUEEZY_WEBHOOK_SECRET } = getServerEnv();

  if (
    !verifyLemonSqueezySignature(
      rawBody,
      signature,
      LEMONSQUEEZY_WEBHOOK_SECRET,
    )
  ) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: LemonSqueezyWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as LemonSqueezyWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload?.meta?.event_name || !payload?.data?.attributes) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 422 });
  }

  try {
    const result = await handleLemonSqueezyWebhook(payload);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({
      received: true,
      event: result.event,
      duplicate: result.duplicate ?? false,
    });
  } catch (err) {
    console.error("[lemonsqueezy webhook]", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
