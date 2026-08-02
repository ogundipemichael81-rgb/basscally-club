import "server-only";

import { getCoverPublicUrl } from "@/lib/storage/cover-url";
import { contentTypeLabel } from "@/lib/style/content-labels";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";
import type { ContentFieldsInput } from "@/lib/admin/content/schema";
import type { ResolvedPublishState } from "@/lib/admin/content/publish";

export type StyleOption = {
  id: string;
  slug: string;
  title: string;
  artistName: string;
  label: string;
};

export type AdminContentRow = {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
  difficulty: string | null;
  status: string;
  scheduledFor: string | null;
  publishedAt: string | null;
  updatedAt: string;
  styleLabel: string | null;
};

export type AdminContentDetail = {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
  description: string | null;
  difficulty: string | null;
  audioStorageKey: string | null;
  coverImageUrl: string | null;
  coverUrl: string | null;
  status: string;
  scheduledFor: string | null;
  publishedAt: string | null;
  emailSubject: string | null;
  emailBody: string | null;
  styleId: string | null;
  styleLabel: string | null;
};

function readArtistName(artists: unknown): string | null {
  if (!artists) return null;
  if (Array.isArray(artists)) {
    const first = artists[0] as { name?: string } | undefined;
    return first?.name ?? null;
  }
  if (typeof artists === "object" && artists !== null && "name" in artists) {
    return String((artists as { name?: string }).name ?? "");
  }
  return null;
}

function mapStyleLabel(style: { title: string; artists: unknown }): string {
  const artist = readArtistName(style.artists);
  return artist ? `${artist} — ${style.title}` : style.title;
}

export async function listStyleOptions(): Promise<StyleOption[]> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return [];
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("styles")
    .select("id, slug, title, artists(name)")
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => {
    const label = mapStyleLabel({
      title: row.title,
      artists: row.artists,
    });
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      artistName: readArtistName(row.artists) ?? "Artist",
      label,
    };
  });
}

export async function listAdminContent(): Promise<AdminContentRow[]> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return [];
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("content")
    .select(
      "id, title, type, difficulty, status, scheduled_for, published_at, updated_at, content_style_tags(style_id, styles(title, artists(name)))",
    )
    .order("updated_at", { ascending: false });

  return (data ?? []).map((row) => {
    const tag = Array.isArray(row.content_style_tags)
      ? row.content_style_tags[0]
      : null;
    const style = tag?.styles as { title: string; artists: unknown } | null | undefined;

    return {
      id: row.id,
      title: row.title,
      type: row.type,
      typeLabel: contentTypeLabel(row.type),
      difficulty: row.difficulty,
      status: row.status,
      scheduledFor: row.scheduled_for,
      publishedAt: row.published_at,
      updatedAt: row.updated_at,
      styleLabel: style ? mapStyleLabel(style) : null,
    };
  });
}

export async function getAdminContentById(
  id: string,
): Promise<AdminContentDetail | null> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return null;
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("content")
    .select(
      "id, title, type, description, difficulty, audio_storage_key, cover_image_url, status, scheduled_for, published_at, email_subject, email_body, content_style_tags(style_id, styles(title, artists(name)))",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) return null;

  const tag = Array.isArray(data.content_style_tags)
    ? data.content_style_tags[0]
    : null;
  const style = tag?.styles as { title: string; artists: unknown } | null | undefined;

  return {
    id: data.id,
    title: data.title,
    type: data.type,
    typeLabel: contentTypeLabel(data.type),
    description: data.description,
    difficulty: data.difficulty,
    audioStorageKey: data.audio_storage_key,
    coverImageUrl: data.cover_image_url,
    coverUrl: getCoverPublicUrl(data.cover_image_url),
    status: data.status,
    scheduledFor: data.scheduled_for,
    publishedAt: data.published_at,
    emailSubject: data.email_subject,
    emailBody: data.email_body,
    styleId: tag?.style_id ?? null,
    styleLabel: style ? mapStyleLabel(style) : null,
  };
}

async function syncStyleTag(contentId: string, styleId: string | null | undefined) {
  const admin = createAdminClient();
  await admin.from("content_style_tags").delete().eq("content_id", contentId);

  if (styleId) {
    await admin.from("content_style_tags").insert({
      content_id: contentId,
      style_id: styleId,
    });
  }
}

import {
  fanOutNewDropEmails,
  fanOutNewDropResend,
} from "@/lib/email/queue/enqueue";
import { processEmailQueue } from "@/lib/email/queue/process";

export async function createAdminContent(options: {
  id: string;
  fields: ContentFieldsInput;
  publish: ResolvedPublishState;
  audioStorageKey: string;
  coverImageUrl: string | null;
  adminUserId: string;
}): Promise<{ id: string }> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("content")
    .insert({
      id: options.id,
      title: options.fields.title,
      type: options.fields.type,
      description: options.fields.description || null,
      difficulty: options.fields.difficulty || null,
      audio_storage_key: options.audioStorageKey,
      cover_image_url: options.coverImageUrl,
      status: options.publish.status,
      scheduled_for: options.publish.scheduledFor,
      published_at: options.publish.publishedAt,
      email_subject: options.fields.emailSubject || null,
      email_body: options.fields.emailBody || null,
      created_by_admin_id: options.adminUserId,
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Could not save drop.");
  }

  await syncStyleTag(data.id, options.fields.styleId);

  if (options.publish.queueEmail) {
    // Publishing must not fail because optional Resend/email tables are not configured.
    // Queue delivery is best-effort and can be processed later by cron.
    try {
      await fanOutNewDropEmails(data.id);
      await processEmailQueue({ limit: 50 });
    } catch (error) {
      console.error("[admin-content] email fan-out skipped:", error instanceof Error ? error.message : error);
    }
  }

  return { id: data.id };
}

export async function updateAdminContent(options: {
  id: string;
  fields: ContentFieldsInput;
  publish: ResolvedPublishState;
  audioStorageKey?: string | null;
  coverImageUrl?: string | null;
}): Promise<void> {
  const admin = createAdminClient();
  const patch: Record<string, unknown> = {
    title: options.fields.title,
    type: options.fields.type,
    description: options.fields.description || null,
    difficulty: options.fields.difficulty || null,
    status: options.publish.status,
    scheduled_for: options.publish.scheduledFor,
    published_at: options.publish.publishedAt,
    email_subject: options.fields.emailSubject || null,
    email_body: options.fields.emailBody || null,
    updated_at: new Date().toISOString(),
  };

  if (options.audioStorageKey) {
    patch.audio_storage_key = options.audioStorageKey;
  }

  if (options.coverImageUrl !== undefined) {
    patch.cover_image_url = options.coverImageUrl;
  }

  const { error } = await admin.from("content").update(patch).eq("id", options.id);

  if (error) {
    throw new Error(error.message);
  }

  await syncStyleTag(options.id, options.fields.styleId);

  if (options.publish.queueEmail) {
    try {
      await fanOutNewDropEmails(options.id);
      await processEmailQueue({ limit: 50 });
    } catch (error) {
      console.error("[admin-content] email fan-out skipped:", error instanceof Error ? error.message : error);
    }
  }
}

export async function softDeleteAdminContent(id: string): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin
    .from("content")
    .update({
      status: "archived",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function resendDropEmail(contentId: string): Promise<number> {
  return fanOutNewDropResend(contentId);
}
