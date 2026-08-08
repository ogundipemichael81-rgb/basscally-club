export function validateScheduledFor(value: string | null | undefined, nowMs = Date.now()): string | null {
  if (!value) return "Release date is required when scheduling a drop.";
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp) || timestamp <= nowMs) return "Scheduled release must be a valid future date.";
  return null;
}

export function localDateTimeToUtcIso(value: string): string {
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) throw new Error("Scheduled release must be a valid future date.");
  return new Date(timestamp).toISOString();
}