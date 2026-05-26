import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Refreshes Supabase sessions on matched routes. Member/admin protection and
 * mock-auth simulator cookies are unchanged until BH-04.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = await updateSession(request);

  if (pathname.startsWith("/api/cron")) {
    // Cron auth will validate CRON_SECRET in Phase 7
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/c/:path*",
    "/admin/:path*",
    "/auth/:path*",
    "/api/cron/:path*",
  ],
};
