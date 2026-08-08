import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { authorizeAudioUpload } from "@/lib/admin/content/audio-upload";
import { hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return NextResponse.json({ error: "Admin content storage is not configured yet." }, { status: 503 });
  }
  const body = await request.json().catch(() => null) as { filename?: unknown; size?: unknown; contentType?: unknown; contentId?: unknown } | null;
  if (!body || typeof body.filename !== "string" || typeof body.size !== "number") {
    return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
  }
  const contentId = typeof body.contentId === "string" && /^[0-9a-f-]{36}$/i.test(body.contentId) ? body.contentId : undefined;
  try {
    const upload = await authorizeAudioUpload({ filename: body.filename, size: body.size, contentType: typeof body.contentType === "string" ? body.contentType : null }, contentId);
    return NextResponse.json(upload);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not authorize upload." }, { status: 400 });
  }
}