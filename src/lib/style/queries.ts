import "server-only";

import { DEMO_STYLE_PAGE } from "@/lib/style/demo-data";
import { buildLearnPoints, contentTypeLabel } from "@/lib/style/content-labels";
import type { StylePageData, StylePageTrack } from "@/lib/style/types";
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
};

export async function getStylePageBySlug(slug: string): Promise<StylePageData | null> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    if (slug === DEMO_STYLE_PAGE.slug) {
      return DEMO_STYLE_PAGE;
    }
    return null;
  }

  const admin = createAdminClient();

  const { data: style, error: styleError } = await admin
    .from("styles")
    .select(
      `
      id,
      slug,
      title,
      headline,
      description,
      default_difficulty,
      hero_image_url,
      is_published,
      artist:artists (
        slug,
        name,
        bio,
        hero_image_url
      )
    `,
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (styleError || !style || !style.artist) {
    if (slug === DEMO_STYLE_PAGE.slug) {
      return DEMO_STYLE_PAGE;
    }
    return null;
  }

  const artist = Array.isArray(style.artist) ? style.artist[0] : style.artist;

  const { data: tagRows } = await admin
    .from("content_style_tags")
    .select(
      `
      content:content (
        id,
        title,
        type,
        description,
        difficulty,
        cover_image_url,
        status,
        published_at
      )
    `,
    )
    .eq("style_id", style.id);

  const published = (tagRows ?? [])
    .map((row) => {
      const raw = row.content;
      const content = (Array.isArray(raw) ? raw[0] : raw) as ContentRow | null;
      return content;
    })
    .filter((c): c is ContentRow => Boolean(c && c.status === "published"))
    .sort((a, b) => {
      const aTime = a.published_at ? new Date(a.published_at).getTime() : 0;
      const bTime = b.published_at ? new Date(b.published_at).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 5);

  const tracks: StylePageTrack[] = published.map((content) => ({
    id: content.id,
    title: content.title,
    type: content.type,
    typeLabel: contentTypeLabel(content.type),
    difficulty: content.difficulty,
    description: content.description,
    coverUrl: getCoverPublicUrl(content.cover_image_url),
  }));

  const headline =
    style.headline?.trim() ||
    `Play ${style.title} like ${artist.name}`;

  return {
    slug: style.slug,
    title: style.title,
    headline,
    description: style.description,
    defaultDifficulty: style.default_difficulty,
    heroImageUrl: getCoverPublicUrl(style.hero_image_url) ?? getCoverPublicUrl(artist.hero_image_url),
    artist: {
      slug: artist.slug,
      name: artist.name,
      bio: artist.bio,
      heroImageUrl: getCoverPublicUrl(artist.hero_image_url),
    },
    tracks: tracks.length > 0 ? tracks : DEMO_STYLE_PAGE.tracks,
    learnPoints: buildLearnPoints(style.description, tracks),
  };
}
