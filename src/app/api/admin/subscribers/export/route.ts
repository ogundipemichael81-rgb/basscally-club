import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { buildSubscribersCsv } from "@/lib/admin/metrics/queries";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return NextResponse.json(
      { error: "Subscriber export is not configured yet." },
      { status: 503 },
    );
  }

  const csv = await buildSubscribersCsv();
  const filename = `basscally-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
