import { contentTypeLabel } from "@/lib/style/content-labels";
import type { DashboardData } from "@/lib/dashboard/types";

const now = Date.now();

/** Matches supabase/seed.sql — used when DB is unavailable. */
export const DEMO_DASHBOARD_DATA: DashboardData = {
  source: "demo",
  downloadedIds: [],
  published: [
    {
      id: "e0000000-0000-4000-8000-000000000003",
      title: "Bass-less Cover — Placeholder 03",
      type: "bassless_track",
      typeLabel: contentTypeLabel("bassless_track"),
      description:
        "Weekly bass-less cover placeholder for the Hub dashboard and style page previews.",
      difficulty: "advanced",
      coverUrl: null,
      publishedAt: new Date(now - 86400000).toISOString(),
    },
    {
      id: "e0000000-0000-4000-8000-000000000002",
      title: "Transition Fill — Placeholder 02",
      type: "fill",
      typeLabel: contentTypeLabel("fill"),
      description: "Transitional phrase placeholder from Chris and world-class bassists.",
      difficulty: "intermediate",
      coverUrl: null,
      publishedAt: new Date(now - 3 * 86400000).toISOString(),
    },
    {
      id: "e0000000-0000-4000-8000-000000000001",
      title: "Pocket Groove — Placeholder 01",
      type: "groove",
      typeLabel: contentTypeLabel("groove"),
      description: "Short looped pattern for weekly practice.",
      difficulty: "beginner",
      coverUrl: null,
      publishedAt: new Date(now - 7 * 86400000).toISOString(),
    },
  ],
  upcoming: [
    {
      id: "demo-upcoming-01",
      title: "Weekly bass-less cover",
      type: "bassless_track",
      typeLabel: contentTypeLabel("bassless_track"),
      scheduledFor: new Date(now + 4 * 86400000).toISOString(),
    },
    {
      id: "demo-upcoming-02",
      title: "Makossa pocket groove",
      type: "groove",
      typeLabel: contentTypeLabel("groove"),
      scheduledFor: new Date(now + 11 * 86400000).toISOString(),
    },
  ],
};
