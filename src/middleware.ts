import { NextResponse, type NextRequest } from "next/server";

/**
 * Phase 1 skeleton — no Supabase session checks yet.
 * Member/admin protection will be added when auth is wired.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/cron")) {
    // Cron auth will validate CRON_SECRET in Phase 7
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/c/:path*",
    "/admin/:path*",
    "/api/cron/:path*",
  ],
};
