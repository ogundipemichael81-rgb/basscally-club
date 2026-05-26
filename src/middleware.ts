import { NextResponse, type NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";
import { getUserFromRequest, updateSession } from "@/lib/supabase/middleware";
import { routes } from "@/lib/routes";

const MOCK_COOKIE_NAME = "basscally_mock_user_id";
const MOCK_ADMIN_ID = "mock-admin-michael";

function isMemberPath(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/c/")
  );
}

function isAdminPath(pathname: string) {
  return pathname.startsWith("/admin");
}

function isAuthedApiPath(pathname: string) {
  return pathname.startsWith("/api/content/");
}

function loginRedirect(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = routes.auth.login;
  url.search = `next=${encodeURIComponent(`${request.nextUrl.pathname}${request.nextUrl.search}`)}`;
  return url;
}

function isMockAllowed(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return false;
  }
  return Boolean(request.cookies.get(MOCK_COOKIE_NAME)?.value);
}

function isMockAdmin(request: NextRequest) {
  return request.cookies.get(MOCK_COOKIE_NAME)?.value === MOCK_ADMIN_ID;
}

function isAllowlistedAdmin(email: string | undefined) {
  if (!email) return false;
  const list = getServerEnv()
    .ADMIN_EMAIL_ALLOWLIST.split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

/**
 * Refreshes Supabase session and protects member/admin routes.
 * Dev simulator mock cookie remains supported.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = await updateSession(request);

  if (pathname.startsWith("/api/cron")) {
    // Cron auth will validate CRON_SECRET in Phase 7
    return response;
  }

  const needsMemberAuth =
    isMemberPath(pathname) || isAdminPath(pathname) || isAuthedApiPath(pathname);

  if (!needsMemberAuth) {
    return response;
  }

  if (isMockAllowed(request)) {
    if (isAdminPath(pathname) && !isMockAdmin(request)) {
      return NextResponse.redirect(new URL(routes.member.dashboard, request.url));
    }
    return response;
  }

  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.redirect(loginRedirect(request));
  }

  if (isAdminPath(pathname) && !isAllowlistedAdmin(user.email ?? undefined)) {
    return NextResponse.redirect(new URL(routes.member.dashboard, request.url));
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
