import "server-only";

import { randomUUID } from "crypto";
import { AUDIO_STORAGE_BUCKET } from "@/lib/constants";
import { MAX_AUDIO_BYTES } from "@/lib/admin/content/constants";
import { createAdminClient } from "@/lib/supabase/admin";

const AUDIO_TYPES = new Map([
  ["mp3", ["audio/mpeg", "audio/mp3"]],
  ["wav", ["audio/wav", "audio/x-wav", "audio/wave"]],
]);

function audioExtension(filename: string): "mp3" | "wav" | null {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension === "mp3" || extension === "wav" ? extension : null;
}

export type AudioUploadRequest = { filename: string; size: number; contentType: string | null };

export function validateAudioUploadRequest(file: AudioUploadRequest): string | null {
  const extension = audioExtension(file.filename);
  if (!extension) return "Audio must be an MP3 or WAV file.";
  if (!Number.isFinite(file.size) || file.size <= 0 || file.size > MAX_AUDIO_BYTES) {
    return "Audio file must be 50MB or smaller.";
  }
  const allowedTypes = AUDIO_TYPES.get(extension) ?? [];
  if (file.contentType && !allowedTypes.includes(file.contentType.toLowerCase())) {
    return "Audio file type does not match its extension.";
  }
  return null;
}

export function audioObjectPath(contentId: string, filename: string): string {
  const extension = audioExtension(filename);
  if (!extension) throw new Error("Audio must be an MP3 or WAV file.");
  return `drops/${contentId}/audio.${extension}`;
}

export function audioStorageKey(contentId: string, filename: string): string {
  return `${AUDIO_STORAGE_BUCKET}/${audioObjectPath(contentId, filename)}`;
}

export function isExpectedAudioStorageKey(contentId: string, storageKey: string): boolean {
  return /^audio\/drops\/[0-9a-f-]{36}\/audio\.(mp3|wav)$/.test(storageKey)
    && storageKey.startsWith(`audio/drops/${contentId}/`);
}

export async function authorizeAudioUpload(input: AudioUploadRequest, contentId?: string) {
  const resolvedContentId = contentId ?? randomUUID();
  const validationError = validateAudioUploadRequest(input);
  if (validationError) throw new Error(validationError);
  const path = audioObjectPath(resolvedContentId, input.filename);
  const admin = createAdminClient();
  const { data, error } = await admin.storage.from(AUDIO_STORAGE_BUCKET).createSignedUploadUrl(path, { upsert: false });
  if (error || !data?.token) throw new Error(error?.message ?? "Could not authorize audio upload.");
  return { contentId: resolvedContentId, bucket: AUDIO_STORAGE_BUCKET, path, token: data.token, storageKey: `${AUDIO_STORAGE_BUCKET}/${path}` };
}

export async function verifyUploadedAudioObject(contentId: string, storageKey: string): Promise<void> {
  if (!isExpectedAudioStorageKey(contentId, storageKey)) {
    throw new Error("Audio upload path is invalid.");
  }
  const path = storageKey.slice(`${AUDIO_STORAGE_BUCKET}/`.length);
  const parent = path.slice(0, path.lastIndexOf("/"));
  const filename = path.slice(path.lastIndexOf("/") + 1);
  const admin = createAdminClient();
  const { data, error } = await admin.storage.from(AUDIO_STORAGE_BUCKET).list(parent, { search: filename, limit: 1 });
  if (error || !data?.some((object) => object.name === filename)) {
    throw new Error("Uploaded audio could not be confirmed. Please upload it again.");
  }
}