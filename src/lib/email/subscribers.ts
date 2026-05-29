import "server-only";

import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { createAdminClient } from "@/lib/supabase/admin";
import { isEmailUnsubscribed } from "@/lib/email/unsubscribe";

export type ActiveSubscriber = {
  userId: string;
  email: string;
  name: string | null;
};

export async function listActiveSubscribers(): Promise<ActiveSubscriber[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select(
      "user_id, status, current_period_end, ends_at, cancel_at_period_end, users(id, email, name)",
    )
    .order("created_at", { ascending: false });

  const byUser = new Map<string, ActiveSubscriber>();

  for (const row of data ?? []) {
    if (
      !subscriptionGrantsAccess({
        status: row.status,
        current_period_end: row.current_period_end,
        ends_at: row.ends_at,
        cancel_at_period_end: row.cancel_at_period_end,
      })
    ) {
      continue;
    }

    const user = Array.isArray(row.users) ? row.users[0] : row.users;
    if (!user?.email || byUser.has(row.user_id)) {
      continue;
    }

    if (await isEmailUnsubscribed(user.email)) {
      continue;
    }

    byUser.set(row.user_id, {
      userId: row.user_id,
      email: user.email,
      name: user.name ?? null,
    });
  }

  return Array.from(byUser.values());
}
