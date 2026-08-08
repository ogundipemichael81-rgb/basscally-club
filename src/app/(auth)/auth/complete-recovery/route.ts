import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabasePublishableKey, getSupabaseUrl, isSupabaseClientConfigured } from "@/lib/env";
import { AUTH_FLOW_COOKIE } from "@/lib/auth/flow-cookie";
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth/login?passwordUpdated=1", request.url));
  response.cookies.set(AUTH_FLOW_COOKIE, "", { path: "/", maxAge: 0 });
  if (isSupabaseClientConfigured()) {
    const supabase = createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), { cookies: { getAll: () => request.cookies.getAll(), setAll: cookies => cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options)) } });
    await supabase.auth.signOut({ scope: "local" });
  }
  response.headers.set("Cache-Control", "no-store");
  return response;
}