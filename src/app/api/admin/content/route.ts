import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logAdminAudit } from "@/lib/admin/audit";
import { requireAdminApi } from "@/lib/admin/auth";
import { verifyUploadedAudioObject } from "@/lib/admin/content/audio-upload";
import { resolvePublishState } from "@/lib/admin/content/publish";
import { createAdminContent } from "@/lib/admin/content/queries";
import { parseContentFields, validatePublishRequirements } from "@/lib/admin/content/schema";
import { uploadContentCover } from "@/lib/admin/content/storage";
import { hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return NextResponse.json({ error: "Admin content storage is not configured yet." }, { status: 503 });
  }
  const formData = await request.formData();
  const parsed = parseContentFields(formData);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid form data." }, { status: 400 });
  const publishError = validatePublishRequirements(parsed.data);
  if (publishError) return NextResponse.json({ error: publishError }, { status: 400 });

  const audioStorageKey = parsed.data.audioStorageKey;
  const contentId = audioStorageKey?.split("/")[2];
  if (!audioStorageKey || !contentId) {
    return NextResponse.json({ error: "Upload audio before saving this drop." }, { status: 400 });
  }

  let coverImageUrl: string | null = null;
  try {
    await verifyUploadedAudioObject(contentId, audioStorageKey);
    const coverFile = formData.get("cover");
    if (coverFile instanceof File && coverFile.size > 0) coverImageUrl = await uploadContentCover(coverFile, contentId);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 400 });
  }

  const publish = resolvePublishState(parsed.data);
  try {
    const created = await createAdminContent({ id: contentId, fields: parsed.data, publish, audioStorageKey, coverImageUrl, adminUserId: auth.session.userId });
    await logAdminAudit(auth.session, { action: "content.create", entityType: "content", entityId: created.id, metadata: { status: publish.status, title: parsed.data.title } });
    revalidatePath("/admin/content"); revalidatePath("/dashboard"); revalidatePath(`/c/${created.id}`);
    return NextResponse.json({ ok: true, id: created.id, status: publish.status });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save drop." }, { status: 500 });
  }
}