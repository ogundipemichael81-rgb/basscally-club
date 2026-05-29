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
};

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
      "id, title, type, description, difficulty, cover_image_url, status, published_at",
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
  };
}
