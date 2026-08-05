import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { getCoverPublicUrl } from "@/lib/storage/cover-url";
import { contentTypeLabel } from "@/lib/style/content-labels";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export type ContentDetail = {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
  description: string | null;
  difficulty: string | null;
  coverUrl: string | null;
  publishedAt: string | null;
  downloadCount: number;
  issueLabel: string | null;
  isFreePreview: boolean;
};

export type PracticeTrack = Pick<ContentDetail, "id" | "title">;

const DEMO_CONTENT: Record<string, ContentDetail> = {
  "e0000000-0000-4000-8000-000000000001": {
    id: "e0000000-0000-4000-8000-000000000001",
    title: "Pocket Groove — Placeholder 01",
    type: "groove",
    typeLabel: contentTypeLabel("groove"),
    description: "Short looped pattern for weekly practice.",
    difficulty: "beginner",
    coverUrl: null,
    publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    downloadCount: 0,
    issueLabel: "Issue 003",
    isFreePreview: false,
  },
  "e0000000-0000-4000-8000-000000000002": {
    id: "e0000000-0000-4000-8000-000000000002",
    title: "Transition Fill — Placeholder 02",
    type: "fill",
    typeLabel: contentTypeLabel("fill"),
    description: "Transitional phrase placeholder from Chris and world-class bassists.",
    difficulty: "intermediate",
    coverUrl: null,
    publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    downloadCount: 0,
    issueLabel: "Issue 002",
    isFreePreview: false,
  },
  "e0000000-0000-4000-8000-000000000003": {
    id: "e0000000-0000-4000-8000-000000000003",
    title: "Bass-less Cover — Placeholder 03",
    type: "bassless_track",
    typeLabel: contentTypeLabel("bassless_track"),
    description:
      "Weekly bass-less cover placeholder for the Hub dashboard and style page previews.",
    difficulty: "advanced",
    coverUrl: null,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    downloadCount: 0,
    issueLabel: "Issue 001",
    isFreePreview: false,
  },
};

export async function getContentDetail(contentId: string): Promise<ContentDetail | null> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return DEMO_CONTENT[contentId] ?? null;
  }

  const admin = createAdminClient();

  const { data: content, error } = await admin
    .from("content")
    .select(
      "id, title, type, description, difficulty, cover_image_url, status, published_at, is_free_preview",
    )
    .eq("id", contentId)
    .maybeSingle();

  if (error || !content || content.status !== "published") {
    return DEMO_CONTENT[contentId] ?? null;
  }

  const { count: downloadCount } = await admin
    .from("downloads")
    .select("id", { count: "exact", head: true })
    .eq("content_id", contentId);

  const { count: issueIndex } = await admin
    .from("content")
    .select("id", { count: "exact", head: true })
    .eq("status", "published")
    .lte("published_at", content.published_at ?? new Date().toISOString());

  const issueNumber = issueIndex ?? null;

  return {
    id: content.id,
    title: content.title,
    type: content.type,
    typeLabel: contentTypeLabel(content.type),
    description: content.description,
    difficulty: content.difficulty,
    coverUrl: getCoverPublicUrl(content.cover_image_url),
    publishedAt: content.published_at,
    downloadCount: downloadCount ?? 0,
    issueLabel: issueNumber ? `Issue ${String(issueNumber).padStart(3, "0")}` : null,
    isFreePreview: Boolean(content.is_free_preview),
  };
}

/**
 * The lightweight practice sequence used by the player next/previous controls.
 * A future pack model can replace this ordering without changing player behaviour.
 */
export async function getPracticeSequence(contentId: string): Promise<PracticeTrack[]> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return Object.values(DEMO_CONTENT)
      .sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""))
      .map(({ id, title }) => ({ id, title }));
  }

  const admin = createAdminClient();
  const { data: tags } = await admin
    .from("content_style_tags")
    .select("style_id")
    .eq("content_id", contentId);
  const styleIds = tags?.map((tag) => tag.style_id).filter(Boolean) ?? [];

  let query = admin
    .from("content")
    .select("id, title")
    .eq("status", "published")
    .order("published_at", { ascending: true });

  if (styleIds.length) {
    const { data: tagged } = await admin
      .from("content_style_tags")
      .select("content_id")
      .in("style_id", styleIds);
    const ids = tagged?.map((tag) => tag.content_id).filter(Boolean) ?? [];
    if (ids.length) query = query.in("id", ids);
  }

  const { data } = await query;
  return data?.map(({ id, title }) => ({ id, title })) ?? [];
}
