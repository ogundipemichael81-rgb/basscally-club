import "server-only";

import {
  AUDIO_STORAGE_BUCKET,
  COVERS_STORAGE_BUCKET,
} from "@/lib/constants";
import {
  MAX_AUDIO_BYTES,
  MAX_COVER_BYTES,
} from "@/lib/admin/content/constants";
import { createAdminClient } from "@/lib/supabase/admin";

function sanitizeExtension(filename: string, fallback: string): string {
  const ext = filename.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return ext || fallback;
}

export async function uploadContentAudio(
  file: File,
  contentId: string,
): Promise<string> {
  if (file.size > MAX_AUDIO_BYTES) {
    throw new Error("Audio file must be 50MB or smaller.");
  }

  const ext = sanitizeExtension(file.name, "mp3");
  const path = `drops/${contentId}/audio.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const admin = createAdminClient();

  const { error } = await admin.storage.from(AUDIO_STORAGE_BUCKET).upload(path, buffer, {
    contentType: file.type || "audio/mpeg",
    upsert: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  return `${AUDIO_STORAGE_BUCKET}/${path}`;
}

export async function uploadContentCover(
  file: File,
  contentId: string,
): Promise<string> {
  if (file.size > MAX_COVER_BYTES) {
    throw new Error("Cover image must be 5MB or smaller.");
  }

  const ext = sanitizeExtension(file.name, "webp");
  const path = `drops/${contentId}/cover.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const admin = createAdminClient();

  const { error } = await admin.storage.from(COVERS_STORAGE_BUCKET).upload(path, buffer, {
    contentType: file.type || "image/webp",
    upsert: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  return `${COVERS_STORAGE_BUCKET}/${path}`;
}
