import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/admin/allowlist";
import { updateSession } from "@/lib/supabase/middleware";
import { routes } from "@/lib/routes";
import { AUTH_FLOW_COOKIE, readAuthFlow } from "@/lib/auth/flow-cookie";

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

function isAdminApiPath(pathname: string) {
  return pathname.startsWith("/api/admin");
}

function loginRedirect(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = routes.auth.login;
  url.search = `next=${encodeURIComponent(`${request.nextUrl.pathname}${request.nextUrl.search}`)}`;
  return url;
}

function paywallRedirect(
  request: NextRequest,
  options: { contentId?: string; reason?: string },
) {
  const url = request.nextUrl.clone();
  url.pathname = "/paywall";
  url.search = "";
  if (options.contentId) {
    url.searchParams.set("contentId", options.contentId);
  }
  if (options.reason) {
    url.searchParams.set("reason", options.reason);
  }
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

/**
 * Refreshes Supabase session and protects member/admin routes.
 * Dev simulator mock cookie remains supported.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { response, user } = await updateSession(request);
  const flow = await readAuthFlow(request.cookies.get(AUTH_FLOW_COOKIE)?.value);

  if (pathname === "/auth/reset-password" && flow !== "recovery_pending") {
    return NextResponse.redirect(new URL("/auth/forgot-password", request.url));
  }

  if (flow === "recovery_pending") {
    const allowed = pathname === "/auth/reset-password" || pathname === "/auth/cancel-recovery" || pathname.startsWith("/_next/") || pathname.startsWith("/favicon");
    if (!allowed) {
      if (pathname.startsWith("/api/")) return NextResponse.json({ error: "recovery_incomplete" }, { status: 403 });
      return NextResponse.redirect(new URL("/auth/reset-password", request.url));
    }
  }

  if (pathname === routes.admin.unauthorized) {
    if (isMockAllowed(request)) {
      return response;
    }

    if (!user) {
      return NextResponse.redirect(loginRedirect(request));
    }

    return response;
  }

  if (pathname.startsWith("/api/cron")) {
    return response;
  }

  if (pathname === routes.auth.login) {
    if (isMockAllowed(request)) {
      return NextResponse.redirect(new URL(routes.member.dashboard, request.url));
    }

    if (user) {
      if (isAdminEmail(user.email)) {
        return NextResponse.redirect(new URL(routes.admin.root, request.url));
      }
      return NextResponse.redirect(new URL(routes.member.dashboard, request.url));
    }

    return response;
  }

  const needsMemberAuth =
    isMemberPath(pathname) ||
    isAdminPath(pathname) ||
    isAuthedApiPath(pathname) ||
    isAdminApiPath(pathname);

  if (!needsMemberAuth) {
    return response;
  }

  if (isMockAllowed(request)) {
    if (
      (isAdminPath(pathname) || isAdminApiPath(pathname)) &&
      !isMockAdmin(request)
    ) {
      if (isAdminApiPath(pathname)) {
        return NextResponse.json({ error: "Admin access required." }, { status: 403 });
      }
      return NextResponse.redirect(new URL(routes.admin.unauthorized, request.url));
    }
    return response;
  }

  if (!user) {
    if (isAdminApiPath(pathname)) {
      return NextResponse.json({ error: "Admin access required." }, { status: 401 });
    }
    if (pathname.startsWith("/c/")) {
      const segments = pathname.split("/").filter(Boolean);
      const contentId = segments[1];
      if (contentId) {
        return NextResponse.redirect(
          paywallRedirect(request, { contentId, reason: "anonymous" }),
        );
      }
    }
    return NextResponse.redirect(loginRedirect(request));
  }

  if (isAdminPath(pathname) && !isAdminEmail(user.email)) {
    return NextResponse.redirect(new URL(routes.admin.unauthorized, request.url));
  }

  if (isAdminApiPath(pathname) && !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/c/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/content/:path*",
    "/auth/:path*",
    "/api/cron/:path*",
  ],
};
