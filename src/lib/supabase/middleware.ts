import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
  isSupabaseClientConfigured,
} from "@/lib/env";

function createMiddlewareClient(request: NextRequest) {
  return createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll() {
        // Session writes happen in updateSession response flow.
      },
    },
  });
}

/**
 * Refreshes the Supabase Auth session and returns a response with updated cookies.
 * Route protection stays in src/middleware.ts.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!isSupabaseClientConfigured()) {
    return { response: supabaseResponse, user: null };
  }

  const supabase = createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  return { response: supabaseResponse, user };
}

export async function getUserFromRequest(request: NextRequest) {
  if (!isSupabaseClientConfigured()) {
    return null;
  }
  const supabase = createMiddlewareClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
