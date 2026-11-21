import "server-only";

import {
  AUDIO_STORAGE_BUCKET,
  DOWNLOAD_RATE_LIMIT_PER_HOUR,
  SIGNED_URL_EXPIRY_SECONDS,
} from "@/lib/constants";
import { downloadFilename, sniffAudioExtension } from "@/lib/downloads/download-filename";
import { storageObjectPath } from "@/lib/storage/audio-path";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMemberSession } from "@/lib/subscriptions/member-session";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export type DownloadResult =
  | { ok: true; signedUrl: string; expiresIn: number }
  | { ok: false; status: number; error: string };

export async function createGuardedDownloadUrl(
  contentId: string,
): Promise<DownloadResult> {
  const session = await getMemberSession();
  if (!session) {
    return { ok: false, status: 401, error: "Sign in required." };
  }

  if (!session.hasAccess) {
    return {
      ok: false,
      status: 403,
      error: "Active membership required to download this drop.",
    };
  }
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return {
      ok: false,
      status: 503,
      error: "Download service is not configured.",
    };
  }

  const admin = createAdminClient();

  const { data: content, error: contentError } = await admin
    .from("content")
    .select("id, title, status, audio_storage_key")
    .eq("id", contentId)
    .maybeSingle();

  if (contentError || !content) {
    return { ok: false, status: 404, error: "Content not found." };
  }

  if (content.status !== "published") {
    return { ok: false, status: 403, error: "This drop is not available yet." };
  }

  if (!content.audio_storage_key) {
    return { ok: false, status: 404, error: "Audio file not available." };
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: recentDownloads } = await admin
    .from("downloads")
    .select("id", { count: "exact", head: true })
    .eq("user_id", session.userId)
    .gte("downloaded_at", oneHourAgo);

  if ((recentDownloads ?? 0) >= DOWNLOAD_RATE_LIMIT_PER_HOUR) {
    return {
      ok: false,
      status: 429,
      error: "Download rate limit reached. Try again later.",
    };
  }

  const objectPath = storageObjectPath(
    content.audio_storage_key,
    AUDIO_STORAGE_BUCKET,
  );

  // Name the saved file by what the audio really is: several drops are WAV data
  // stored under an .mp3 name, which some players refuse to open.
  const extension = await detectAudioExtension(admin, objectPath);
  const { data: signed, error: signError } = await admin.storage
    .from(AUDIO_STORAGE_BUCKET)
    .createSignedUrl(objectPath, SIGNED_URL_EXPIRY_SECONDS, {
      download: downloadFilename(content.title, extension),
    });

  if (signError || !signed?.signedUrl) {
    return {
      ok: false,
      status: 502,
      error: "Could not generate download URL.",
    };
  }

  await admin.from("downloads").insert({
    user_id: session.userId,
    content_id: content.id,
  });

  return {
    ok: true,
    signedUrl: signed.signedUrl,
    expiresIn: SIGNED_URL_EXPIRY_SECONDS,
  };
}

async function detectAudioExtension(
  admin: ReturnType<typeof createAdminClient>,
  objectPath: string,
): Promise<string> {
  try {
    const { data } = await admin.storage
      .from(AUDIO_STORAGE_BUCKET)
      .createSignedUrl(objectPath, 60);
    if (!data?.signedUrl) return sniffAudioExtension(new Uint8Array(), objectPath);
    const res = await fetch(data.signedUrl, { headers: { Range: "bytes=0-15" }, cache: "no-store" });
    const head = new Uint8Array(await res.arrayBuffer()).slice(0, 16);
    return sniffAudioExtension(res.ok ? head : new Uint8Array(), objectPath);
  } catch {
    return sniffAudioExtension(new Uint8Array(), objectPath);
  }
}
