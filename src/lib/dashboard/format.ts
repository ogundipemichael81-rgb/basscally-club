export function formatDropDate(iso: string | null): string {
  if (!iso) return "Recently";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / 86400000);

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} wk ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatScheduledDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Soon";

  return date.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function difficultyBadgeVariant(
  difficulty: string | null,
): "beginner" | "intermediate" | "advanced" | "default" {
  if (difficulty === "beginner") return "beginner";
  if (difficulty === "intermediate") return "intermediate";
  if (difficulty === "advanced") return "advanced";
  return "default";
}
