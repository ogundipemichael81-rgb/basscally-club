import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { logAdminAudit } from "@/lib/admin/audit";
import { requireAdminApi } from "@/lib/admin/auth";
import { resolvePublishState } from "@/lib/admin/content/publish";
import { createAdminContent } from "@/lib/admin/content/queries";
import {
  parseContentFields,
  validatePublishRequirements,
} from "@/lib/admin/content/schema";
import {
  uploadContentAudio,
  uploadContentCover,
} from "@/lib/admin/content/storage";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return NextResponse.json(
      { error: "Admin content storage is not configured yet." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const parsed = parseContentFields(formData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid form data." },
      { status: 400 },
    );
  }

  const publishError = validatePublishRequirements(parsed.data);
  if (publishError) {
    return NextResponse.json({ error: publishError }, { status: 400 });
  }

  const audioFile = formData.get("audio");
  if (!(audioFile instanceof File) || audioFile.size === 0) {
    return NextResponse.json(
      { error: "Audio file is required for a new drop." },
      { status: 400 },
    );
  }

  const contentId = randomUUID();
  let audioStorageKey: string;
  let coverImageUrl: string | null = null;

  try {
    audioStorageKey = await uploadContentAudio(audioFile, contentId);
    const coverFile = formData.get("cover");
    if (coverFile instanceof File && coverFile.size > 0) {
      coverImageUrl = await uploadContentCover(coverFile, contentId);
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed." },
      { status: 400 },
    );
  }

  const publish = resolvePublishState(parsed.data);

  try {
    const created = await createAdminContent({
      id: contentId,
      fields: parsed.data,
      publish,
      audioStorageKey,
      coverImageUrl,
      adminUserId: auth.session.userId,
    });

    await logAdminAudit(auth.session, {
      action: "content.create",
      entityType: "content",
      entityId: created.id,
      metadata: {
        status: publish.status,
        title: parsed.data.title,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not save drop." },
      { status: 500 },
    );
  }
}
