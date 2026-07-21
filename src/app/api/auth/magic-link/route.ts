import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { checkMagicLinkRateLimit } from "@/lib/auth/rate-limit";
import { clientEnv, getSupabasePublishableKey, getSupabaseUrl, isSupabaseClientConfigured } from "@/lib/env";
import { routes } from "@/lib/routes";

export const runtime = "nodejs";

type Payload = {
  email?: string;
};

type MagicLinkFailure = {
  error: string;
  reason: "resend_cooldown" | "ip_burst_limit" | "provider_email_limit" | "provider_error";
  retryAfterSeconds?: number;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

export async function POST(request: NextRequest) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);
  const rate = checkMagicLinkRateLimit(email, ip);
  if (!rate.allowed) {
    const body: MagicLinkFailure = {
      error: `We just sent a sign-in link. Please wait ${rate.retryAfterSeconds}s before requesting another.`,
      reason: rate.reason,
      retryAfterSeconds: rate.retryAfterSeconds,
    };
    return NextResponse.json(
      body,
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  if (
    process.env.NODE_ENV === "development" &&
    email.endsWith("@basscally.club")
  ) {
    return NextResponse.json({ ok: true });
  }

  if (!isSupabaseClientConfigured()) {
    return NextResponse.json(
      { error: "Auth service is not configured." },
      { status: 503 },
    );
  }

  let response = NextResponse.json({ ok: true });
  const supabase = createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.json({ ok: true });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${clientEnv.NEXT_PUBLIC_APP_URL}${routes.auth.callback}`,
    },
  });

  if (error) {
    const isProviderRateLimit =
      error.status === 429 ||
      /rate limit|too many requests/i.test(error.message);

    if (isProviderRateLimit) {
      const body: MagicLinkFailure = {
        error:
          "Email delivery is temporarily at capacity. Please wait a little before requesting another sign-in link.",
        reason: "provider_email_limit",
      };

      return NextResponse.json(body, { status: 429 });
    }

    const body: MagicLinkFailure = {
      error: "We could not send a sign-in link right now. Please try again shortly.",
      reason: "provider_error",
    };
    return NextResponse.json(
      body,
      { status: 500 },
    );
  }

  return response;
}
