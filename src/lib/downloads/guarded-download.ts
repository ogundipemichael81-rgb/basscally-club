import "server-only";

import {
  AUDIO_STORAGE_BUCKET,
  DOWNLOAD_RATE_LIMIT_PER_HOUR,
  SIGNED_URL_EXPIRY_SECONDS,
} from "@/lib/constants";
import { storageObjectPath } from "@/lib/storage/audio-path";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { resolveMemberFromRequest, readMockPersonaId } from "@/lib/subscriptions/resolve-member";
import { createAdminClient } from "@/lib/supabase/admin";
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
  const member = await resolveMemberFromRequest();
  if (!member) {
    return { ok: false, status: 401, error: "Sign in required." };
  }

  const mockId = await readMockPersonaId();
  if (process.env.NODE_ENV === "development" && mockId === "mock-member-lapsed") {
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

  const { data: subscriptions } = await admin
    .from("subscriptions")
    .select("status, current_period_end, ends_at, cancel_at_period_end")
    .eq("user_id", member.userId)
    .order("updated_at", { ascending: false });

  const subscription =
    subscriptions?.find((row) => subscriptionGrantsAccess(row)) ?? null;

  if (!subscriptionGrantsAccess(subscription)) {
    return {
      ok: false,
      status: 403,
      error: "Active membership required to download this drop.",
    };
  }

  const { data: content, error: contentError } = await admin
    .from("content")
    .select("id, status, audio_storage_key")
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
    .eq("user_id", member.userId)
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

  const { data: signed, error: signError } = await admin.storage
    .from(AUDIO_STORAGE_BUCKET)
    .createSignedUrl(objectPath, SIGNED_URL_EXPIRY_SECONDS);

  if (signError || !signed?.signedUrl) {
    return {
      ok: false,
      status: 502,
      error: "Could not generate download URL.",
    };
  }

  await admin.from("downloads").insert({
    user_id: member.userId,
    content_id: content.id,
  });

  return {
    ok: true,
    signedUrl: signed.signedUrl,
    expiresIn: SIGNED_URL_EXPIRY_SECONDS,
  };
}
