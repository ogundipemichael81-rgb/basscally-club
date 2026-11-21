/** "Jehovah You Are The Most High" -> "Jehovah You Are The Most High - Basscally.wav" */
export function downloadFilename(title: string | null | undefined, extension: string): string {
  const base = (title ?? "")
    .normalize("NFKD")
    // Apostrophes are dropped: storage double-encodes them in the saved name (D%27Abundo).
    .replace(/[^\w\s\-()&.,]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100)
    .replace(/^[.\s]+|[.\s]+$/g, "");
  return `${base || "Basscally drop"} - Basscally.${extension}`;
}

/** Audio container from its first bytes; falls back to the stored name's extension. */
export function sniffAudioExtension(head: Uint8Array, storedPath: string): string {
  const ascii = (from: number, to: number) => String.fromCharCode(...head.slice(from, to));
  if (head.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WAVE") return "wav";
  if (head.length >= 3 && ascii(0, 3) === "ID3") return "mp3";
  if (head.length >= 2 && head[0] === 0xff && (head[1] & 0xe0) === 0xe0) return "mp3";
  if (head.length >= 8 && ascii(4, 8) === "ftyp") return "m4a";
  const stored = storedPath.split(".").pop()?.toLowerCase();
  return stored && /^(mp3|wav|m4a|aac)$/.test(stored) ? stored : "mp3";
}
