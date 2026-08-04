import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";
import { routes } from "@/lib/routes";
import { isAdminEmail } from "@/lib/admin/allowlist";
import { provisionPublicUser } from "@/lib/auth/provision-user";
import { AUTH_FLOW_COOKIE, encodeAuthFlow } from "@/lib/auth/flow-cookie";

function loginErrorRedirect(request: NextRequest, message: string) {
  const url = new URL(routes.auth.login, request.url);
  url.searchParams.set("authError", message);
  return NextResponse.redirect(url);
}

/**
 * Exchanges the PKCE code on the server using the verifier cookie stored when
 * the magic link was requested. This avoids client-side verifier drift.
 */
export async function GET(request: NextRequest) {
  if (!isSupabaseClientConfigured()) {
    return loginErrorRedirect(request, "Sign-in is not configured yet.");
  }

  const code = request.nextUrl.searchParams.get("code");
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const callbackType = request.nextUrl.searchParams.get("type");
  if (!code && !tokenHash) {
    return loginErrorRedirect(request, "This sign-in link is invalid or has expired.");
  }

  const destination = new URL(callbackType === "recovery" ? "/auth/reset-password" : routes.member.dashboard, request.url);
  const response = NextResponse.redirect(destination);

  const supabase = createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = tokenHash
    ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type: callbackType === "recovery" ? "recovery" : "email" })
    : await supabase.auth.exchangeCodeForSession(code!);
  if (error) {
    return loginErrorRedirect(
      request,
      "This sign-in link must be opened in the same browser where it was requested. Please request a new link there.",
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (callbackType !== "recovery" && user?.id && user.email && hasSupabaseServiceRole()) await provisionPublicUser(user);
  if (callbackType !== "recovery" && user?.email && isAdminEmail(user.email)) {
    destination.pathname = routes.admin.root;
  }

  response.headers.set("Cache-Control", "private, no-store");
  if (callbackType === "recovery") {
    response.cookies.set(AUTH_FLOW_COOKIE, await encodeAuthFlow("recovery_pending"), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 15 * 60,
    });
  }
  return response;
}
