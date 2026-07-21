import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
  isSupabaseClientConfigured,
} from "@/lib/env";
import { routes } from "@/lib/routes";

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
  if (!code) {
    return loginErrorRedirect(request, "This sign-in link is invalid or has expired.");
  }

  const destination = new URL(routes.member.dashboard, request.url);
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

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return loginErrorRedirect(
      request,
      "This sign-in link must be opened in the same browser where it was requested. Please request a new link there.",
    );
  }

  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
