import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { getUnsubscribeSecret } from "@/lib/email/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { clientEnv } from "@/lib/env";

const ACTION = "email_unsubscribe";

function signPayload(payload: string): string {
  return createHmac("sha256", getUnsubscribeSecret()).update(payload).digest("base64url");
}

export function buildUnsubscribeUrl(email: string): string {
  const normalized = email.trim().toLowerCase();
  const payload = Buffer.from(JSON.stringify({ email: normalized, v: 1 })).toString(
    "base64url",
  );
  const signature = signPayload(payload);
  const token = `${payload}.${signature}`;
  return `${clientEnv.NEXT_PUBLIC_APP_URL}/api/email/unsubscribe?token=${encodeURIComponent(token)}`;
}

export function verifyUnsubscribeToken(token: string): string | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = signPayload(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email?: string;
    };
    return parsed.email?.trim().toLowerCase() ?? null;
  } catch {
    return null;
  }
}

export async function isEmailUnsubscribed(email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const admin = createAdminClient();
  const { data } = await admin
    .from("audit_events")
    .select("id")
    .eq("action", ACTION)
    .eq("entity_id", normalized)
    .maybeSingle();

  return Boolean(data);
}

export async function recordEmailUnsubscribe(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  const admin = createAdminClient();
  await admin.from("audit_events").insert({
    action: ACTION,
    entity_type: "user_email",
    entity_id: normalized,
    metadata_json: { unsubscribed_at: new Date().toISOString() },
  });
}
