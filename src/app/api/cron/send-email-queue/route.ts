import { NextResponse } from "next/server";
import { verifyCronRequest } from "@/lib/cron/verify";
import { processEmailQueue } from "@/lib/email/queue/process";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await processEmailQueue({ limit: 50 });

  return NextResponse.json({
    ok: true,
    ...result,
  });
}
