import { NextResponse } from "next/server";
import { verifyCronRequest } from "@/lib/cron/verify";
import { processEmailQueue } from "@/lib/email/queue/process";
import { publishDueScheduledContent } from "@/lib/email/publish-scheduled";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const published = await publishDueScheduledContent();
  const queue = await processEmailQueue({ limit: 50 });

  return NextResponse.json({
    ok: true,
    published,
    queue,
  });
}
