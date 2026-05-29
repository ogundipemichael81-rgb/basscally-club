import "server-only";

import { clientEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

export async function generateMagicLinkForEmail(email: string): Promise<string | null> {
  const admin = createAdminClient();
  const redirectTo = `${clientEnv.NEXT_PUBLIC_APP_URL}/auth/callback`;

  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: email.trim().toLowerCase(),
    options: { redirectTo },
  });

  if (error || !data?.properties?.action_link) {
    console.error("[email] magic link generation failed:", error?.message);
    return null;
  }

  return data.properties.action_link;
}
