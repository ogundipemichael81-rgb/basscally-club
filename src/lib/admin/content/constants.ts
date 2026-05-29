export const CONTENT_TYPES = [
  "bassless_track",
  "groove",
  "fill",
  "challenge",
] as const;

export const CONTENT_DIFFICULTIES = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const PUBLISH_ACTIONS = ["draft", "scheduled", "publish_now"] as const;

export const MAX_AUDIO_BYTES = 50 * 1024 * 1024;
export const MAX_COVER_BYTES = 5 * 1024 * 1024;

export const CONTENT_TYPE_LABELS: Record<(typeof CONTENT_TYPES)[number], string> = {
  bassless_track: "Bass-less cover",
  groove: "Groove",
  fill: "Fill",
  challenge: "Challenge",
};
