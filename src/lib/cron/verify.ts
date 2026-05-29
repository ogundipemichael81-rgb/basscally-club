import "server-only";

import { getServerEnv } from "@/lib/env";

export function verifyCronRequest(request: Request): boolean {
  const { CRON_SECRET } = getServerEnv();
  if (!CRON_SECRET) {
    return process.env.NODE_ENV === "development";
  }

  const auth = request.headers.get("authorization");
  return auth === `Bearer ${CRON_SECRET}`;
}
