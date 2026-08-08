export type CanonicalAudioMimeType = "audio/mpeg" | "audio/wav";

export function audioExtension(filename: string): "mp3" | "wav" | null {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension === "mp3" || extension === "wav" ? extension : null;
}

export function canonicalAudioMimeType(filename: string): CanonicalAudioMimeType | null {
  const extension = audioExtension(filename);
  if (extension === "mp3") return "audio/mpeg";
  if (extension === "wav") return "audio/wav";
  return null;
}

export function browserMimeMatchesAudioExtension(filename: string, browserMime: string | null): boolean {
  if (!browserMime) return true;
  const extension = audioExtension(filename);
  const normalized = browserMime.toLowerCase();
  if (extension === "mp3") return normalized === "audio/mpeg" || normalized === "audio/mp3";
  if (extension === "wav") return normalized === "audio/wav" || normalized === "audio/x-wav" || normalized === "audio/wave";
  return false;
}
