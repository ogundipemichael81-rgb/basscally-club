import type { StylePageData } from "@/lib/style/types";

/** Fallback when Supabase is not configured — matches supabase/seed.sql demo. */
export const DEMO_STYLE_PAGE: StylePageData = {
  slug: "makossa-tribe-fuego",
  title: "Makossa — Tribe Fuego",
  headline: "Play Makossa like Tribe Fuego",
  description:
    "Weekly grooves and bass-less material from Chris and world-class bassists in the Makossa pocket.",
  defaultDifficulty: "intermediate",
  heroImageUrl: null,
  artist: {
    slug: "chris",
    name: "Chris",
    bio: "Basscally Hub founder — TikTok bass educator and weekly drop curator.",
    heroImageUrl: null,
  },
  tracks: [
    {
      id: "e0000000-0000-4000-8000-000000000001",
      title: "Pocket Groove — Placeholder 01",
      type: "groove",
      typeLabel: "Groove",
      difficulty: "beginner",
      description: "Short looped pattern for weekly practice.",
      coverUrl: null,
    },
    {
      id: "e0000000-0000-4000-8000-000000000002",
      title: "Transition Fill — Placeholder 02",
      type: "fill",
      typeLabel: "Fill",
      difficulty: "intermediate",
      description: "Transitional phrase placeholder from Chris and world-class bassists.",
      coverUrl: null,
    },
    {
      id: "e0000000-0000-4000-8000-000000000003",
      title: "Bass-less Cover — Placeholder 03",
      type: "bassless_track",
      typeLabel: "Bass-less cover",
      difficulty: "advanced",
      description: "Weekly bass-less cover placeholder for the Hub dashboard and style page previews.",
      coverUrl: null,
    },
  ],
  learnPoints: [
    "Lock in the Makossa pocket with short, repeatable grooves",
    "Practice bass-less covers without fighting the original bass line",
    "Steal transition fills you can reuse in your own playing",
    "Build a weekly habit with Chris and world-class bassists",
  ],
};
