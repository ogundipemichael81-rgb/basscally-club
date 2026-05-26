/** Normalize content.audio_storage_key for Supabase Storage object path. */

export function storageObjectPath(
  audioStorageKey: string,
  bucket: string,
): string {
  const trimmed = audioStorageKey.replace(/^\/+/, "");
  const prefix = `${bucket}/`;
  if (trimmed.startsWith(prefix)) {
    return trimmed.slice(prefix.length);
  }
  return trimmed;
}
