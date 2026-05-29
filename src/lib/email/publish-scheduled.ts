import "server-only";

import { fanOutNewDropEmails } from "@/lib/email/queue/enqueue";
import { processEmailQueue } from "@/lib/email/queue/process";
import { createAdminClient } from "@/lib/supabase/admin";

export async function publishDueScheduledContent(): Promise<{
  published: number;
  emailsQueued: number;
}> {
  const admin = createAdminClient();
  const now = new Date().toISOString();

  const { data: dueRows } = await admin
    .from("content")
    .select("id")
    .eq("status", "scheduled")
    .lte("scheduled_for", now);

  let emailsQueued = 0;

  for (const row of dueRows ?? []) {
    await admin
      .from("content")
      .update({
        status: "published",
        published_at: now,
        updated_at: now,
      })
      .eq("id", row.id);

    emailsQueued += await fanOutNewDropEmails(row.id);
  }

  if (emailsQueued > 0) {
    await processEmailQueue({ limit: 50 });
  }

  return {
    published: dueRows?.length ?? 0,
    emailsQueued,
  };
}
