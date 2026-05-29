import "server-only";

import {
  AUDIO_STORAGE_BUCKET,
  PREVIEW_MAX_SECONDS,
  SIGNED_URL_EXPIRY_SECONDS,
} from "@/lib/constants";
import { storageObjectPath } from "@/lib/storage/audio-path";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { resolveMemberFromRequest } from "@/lib/subscriptions/resolve-member";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export type PreviewAccessResult =
  | {
      ok: true;
      url: string;
      expiresIn: number;
      gated: boolean;
      previewSeconds: number | null;
    }
  | { ok: false; status: number; error: string };

export async function createPreviewAccess(
  contentId: string,
): Promise<PreviewAccessResult> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return {
      ok: false,
      status: 503,
      error: "Preview playback is not configured yet.",
    };
  }

  const admin = createAdminClient();

  const { data: content, error: contentError } = await admin
    .from("content")
    .select("id, status, audio_storage_key")
    .eq("id", contentId)
    .maybeSingle();

  if (contentError || !content) {
    return { ok: false, status: 404, error: "Track not found." };
  }

  if (content.status !== "published") {
    return { ok: false, status: 403, error: "This track is not available yet." };
  }

  if (!content.audio_storage_key) {
    return { ok: false, status: 404, error: "Audio preview is not available." };
  }

  const member = await resolveMemberFromRequest();
  let hasFullAccess = false;

  if (member) {
    const { data: subscriptions } = await admin
      .from("subscriptions")
      .select("status, current_period_end, ends_at, cancel_at_period_end")
      .eq("user_id", member.userId)
      .order("updated_at", { ascending: false });

    const subscription =
      subscriptions?.find((row) => subscriptionGrantsAccess(row)) ?? null;
    hasFullAccess = subscriptionGrantsAccess(subscription);
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
      error: "Could not load preview audio.",
    };
  }

  return {
    ok: true,
    url: signed.signedUrl,
    expiresIn: SIGNED_URL_EXPIRY_SECONDS,
    gated: !hasFullAccess,
    previewSeconds: hasFullAccess ? null : PREVIEW_MAX_SECONDS,
  };
}
