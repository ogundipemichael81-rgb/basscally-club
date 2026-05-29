import "server-only";

import { DEMO_DASHBOARD_DATA } from "@/lib/dashboard/demo-data";
import type { DashboardContentItem, DashboardData, UpcomingDrop } from "@/lib/dashboard/types";
import { contentTypeLabel } from "@/lib/style/content-labels";
import { getCoverPublicUrl } from "@/lib/storage/cover-url";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

type ContentRow = {
  id: string;
  title: string;
  type: string;
  description: string | null;
  difficulty: string | null;
  cover_image_url: string | null;
  status: string;
  published_at: string | null;
  scheduled_for: string | null;
};

function mapPublishedRow(row: ContentRow): DashboardContentItem {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    typeLabel: contentTypeLabel(row.type),
    description: row.description,
    difficulty: row.difficulty,
    coverUrl: getCoverPublicUrl(row.cover_image_url),
    publishedAt: row.published_at,
  };
}

function mapUpcomingRow(row: ContentRow): UpcomingDrop {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    typeLabel: contentTypeLabel(row.type),
    scheduledFor: row.scheduled_for ?? new Date().toISOString(),
  };
}

export async function getDashboardData(userId?: string): Promise<DashboardData> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return DEMO_DASHBOARD_DATA;
  }

  const admin = createAdminClient();
  const nowIso = new Date().toISOString();

  const { data: publishedRows } = await admin
    .from("content")
    .select(
      "id, title, type, description, difficulty, cover_image_url, status, published_at, scheduled_for",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const { data: upcomingRows } = await admin
    .from("content")
    .select(
      "id, title, type, description, difficulty, cover_image_url, status, published_at, scheduled_for",
    )
    .not("scheduled_for", "is", null)
    .gt("scheduled_for", nowIso)
    .neq("status", "published")
    .order("scheduled_for", { ascending: true })
    .limit(5);

  let downloadedIds: string[] = [];
  if (userId) {
    const { data: downloadRows } = await admin
      .from("downloads")
      .select("content_id")
      .eq("user_id", userId);
    downloadedIds = (downloadRows ?? []).map((row) => row.content_id);
  }

  const published = (publishedRows ?? []).map((row) =>
    mapPublishedRow(row as ContentRow),
  );
  const upcoming = (upcomingRows ?? []).map((row) =>
    mapUpcomingRow(row as ContentRow),
  );

  if (published.length === 0 && upcoming.length === 0) {
    return {
      source: "database",
      published: [],
      upcoming: [],
      downloadedIds,
    };
  }

  return {
    source: "database",
    published,
    upcoming,
    downloadedIds,
  };
}
