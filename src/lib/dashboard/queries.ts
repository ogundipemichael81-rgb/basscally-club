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
import { getPublishedFreePreview } from "@/lib/content/queries";

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
  is_free_preview?: boolean;
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
    isFreePreview: Boolean(row.is_free_preview),
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

  // Resolve this separately from the dashboard filters so an unpaid user's
  // access never depends on account age, downloads, or a library query shape.
  const currentPreview = await getPublishedFreePreview();

  const { data: publishedRows } = await admin
    .from("content")
    .select(
      "id, title, type, description, difficulty, cover_image_url, status, published_at, scheduled_for, is_free_preview",
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

  let published = (publishedRows ?? []).map((row) => {
    const item = mapPublishedRow(row as ContentRow);
    return currentPreview ? { ...item, isFreePreview: item.id === currentPreview.id } : item;
  });
  if (currentPreview && !published.some((item) => item.id === currentPreview.id)) {
    published = [
      {
        id: currentPreview.id,
        title: currentPreview.title,
        type: currentPreview.type,
        typeLabel: currentPreview.typeLabel,
        description: currentPreview.description,
        difficulty: currentPreview.difficulty,
        coverUrl: currentPreview.coverUrl,
        publishedAt: currentPreview.publishedAt,
        isFreePreview: true,
      },
      ...published,
    ];
  }
  const upcoming = (upcomingRows ?? []).map((row) =>
    mapUpcomingRow(row as ContentRow),
  );

  if (published.length === 0 && upcoming.length === 0) {
    if (process.env.NODE_ENV === "development") {
      return {
        ...DEMO_DASHBOARD_DATA,
        downloadedIds,
        source: "demo",
      };
    }

    return {
      source: "database",
      published: [],
      upcoming: [],
      downloadedIds,
    };
  }

  if (published.length === 0 && process.env.NODE_ENV === "development") {
    return {
      ...DEMO_DASHBOARD_DATA,
      downloadedIds,
      source: "demo",
    };
  }

  return {
    source: "database",
    published,
    upcoming,
    downloadedIds,
  };
}
