import "server-only";

import { COVERS_STORAGE_BUCKET } from "@/lib/constants";
import { isSupabaseClientConfigured } from "@/lib/env";
import { storageObjectPath } from "@/lib/storage/audio-path";
import { createAdminClient } from "@/lib/supabase/admin";

export function getCoverPublicUrl(coverImageUrl: string | null | undefined): string | null {
  if (!coverImageUrl) return null;
  if (coverImageUrl.startsWith("http://") || coverImageUrl.startsWith("https://")) {
    return coverImageUrl;
  }

  if (!isSupabaseClientConfigured()) {
    return null;
  }

  const path = storageObjectPath(coverImageUrl, COVERS_STORAGE_BUCKET);
  const { data } = createAdminClient()
    .storage.from(COVERS_STORAGE_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}
