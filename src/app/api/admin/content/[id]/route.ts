import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { logAdminAudit } from "@/lib/admin/audit";
import { requireAdminApi } from "@/lib/admin/auth";
import { verifyUploadedAudioObject } from "@/lib/admin/content/audio-upload";
import { resolvePublishState } from "@/lib/admin/content/publish";
import { getAdminContentById, softDeleteAdminContent, updateAdminContent } from "@/lib/admin/content/queries";
import { parseContentFields, validatePublishRequirements } from "@/lib/admin/content/schema";
import { uploadContentCover } from "@/lib/admin/content/storage";
import { hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";

export const runtime = "nodejs";
type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const auth = await requireAdminApi(); if (!auth.ok) return auth.response;
  const { id } = await params; const content = await getAdminContentById(id);
  return content ? NextResponse.json({ content }) : NextResponse.json({ error: "Drop not found." }, { status: 404 });
}

export async function PATCH(request: Request, { params }: Props) {
  const auth = await requireAdminApi(); if (!auth.ok) return auth.response;
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) return NextResponse.json({ error: "Admin content storage is not configured yet." }, { status: 503 });
  const { id } = await params; const existing = await getAdminContentById(id);
  if (!existing) return NextResponse.json({ error: "Drop not found." }, { status: 404 });
  const formData = await request.formData(); const parsed = parseContentFields(formData);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid form data." }, { status: 400 });
  const publishError = validatePublishRequirements(parsed.data);
  if (publishError) return NextResponse.json({ error: publishError }, { status: 400 });
  let audioStorageKey: string | undefined; let coverImageUrl: string | null | undefined;
  try {
    if (parsed.data.audioStorageKey) { await verifyUploadedAudioObject(id, parsed.data.audioStorageKey); audioStorageKey = parsed.data.audioStorageKey; }
    const coverFile = formData.get("cover"); if (coverFile instanceof File && coverFile.size > 0) coverImageUrl = await uploadContentCover(coverFile, id);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 400 }); }
  if (!existing.audioStorageKey && !audioStorageKey) return NextResponse.json({ error: "Audio file is required before publishing." }, { status: 400 });
  const publish = resolvePublishState(parsed.data);
  try {
    await updateAdminContent({ id, fields: parsed.data, publish, audioStorageKey, coverImageUrl });
    await logAdminAudit(auth.session, { action: "content.update", entityType: "content", entityId: id, metadata: { status: publish.status, title: parsed.data.title } });
    revalidatePath("/admin/content"); revalidatePath("/dashboard"); revalidatePath(`/c/${id}`);
    return NextResponse.json({ ok: true, id, status: publish.status });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save changes." }, { status: 500 }); }
}

export async function DELETE(_request: Request, { params }: Props) {
  const auth = await requireAdminApi(); if (!auth.ok) return auth.response;
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) return NextResponse.json({ error: "Admin content storage is not configured yet." }, { status: 503 });
  const { id } = await params; const existing = await getAdminContentById(id);
  if (!existing) return NextResponse.json({ error: "Drop not found." }, { status: 404 });
  try { await softDeleteAdminContent(id); await logAdminAudit(auth.session, { action: "content.soft_delete", entityType: "content", entityId: id, metadata: { title: existing.title } }); revalidatePath("/admin/content"); revalidatePath("/dashboard"); revalidatePath(`/c/${id}`); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not archive drop." }, { status: 500 }); }
}