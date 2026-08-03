import { NextRequest, NextResponse } from "next/server";
import { getServerEnv, hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";
import { isResendConfigured } from "@/lib/email/config";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const env = getServerEnv();
  if (!env.CRON_SECRET || request.headers.get("x-health-secret") !== env.CRON_SECRET) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    supabaseAdminConfigured: isSupabaseClientConfigured() && hasSupabaseServiceRole(),
    resendConfigured: isResendConfigured(),
    senderConfigured: env.RESEND_FROM_EMAIL.length > 0,
    productionAppUrlConfigured: env.NODE_ENV !== "production" || Boolean(process.env.NEXT_PUBLIC_APP_URL),
  }, { headers: { "Cache-Control": "no-store" } });
}
