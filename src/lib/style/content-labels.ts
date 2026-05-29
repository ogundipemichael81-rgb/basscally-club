const TYPE_LABELS: Record<string, string> = {
  groove: "Groove",
  fill: "Fill",
  bassless_track: "Bass-less cover",
  challenge: "Challenge",
};

export function contentTypeLabel(type: string): string {
  return TYPE_LABELS[type] ?? type.replace(/_/g, " ");
}

export function buildLearnPoints(
  styleDescription: string | null,
  tracks: { type: string; title: string }[],
): string[] {
  const points: string[] = [];

  if (styleDescription) {
    points.push(styleDescription);
  }

  const types = new Set(tracks.map((t) => t.type));
  if (types.has("groove")) {
    points.push("Lock pocket grooves you can loop until they feel automatic");
  }
  if (types.has("bassless_track")) {
    points.push("Practice full songs on bass-less covers without fighting the original line");
  }
  if (types.has("fill")) {
    points.push("Steal transition fills and make them part of your vocabulary");
  }
  if (types.has("challenge")) {
    points.push("Hit weekly challenges and share your progress in the Hub");
  }

  if (points.length < 3) {
    points.push("Stream previews free — unlock every drop with a Basscally Hub membership");
  }

  return points.slice(0, 6);
}
