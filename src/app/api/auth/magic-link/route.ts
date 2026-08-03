import { NextResponse, type NextRequest } from "next/server";
import { checkMagicLinkRateLimit } from "@/lib/auth/rate-limit";
import { hasSupabaseServiceRole, isSupabaseClientConfigured } from "@/lib/env";
import { routes } from "@/lib/routes";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/client";

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

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
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

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return NextResponse.json(
      { error: "Auth service is not configured." },
      { status: 503 },
    );
  }

  try {
    const admin = createAdminClient();
    let generated = await admin.auth.admin.generateLink({ type: "magiclink", email });

    if (generated.error && /not found|user.*exist/i.test(generated.error.message)) {
      const created = await admin.auth.admin.createUser({ email, email_confirm: true });
      if (created.error && !/already registered|already exists/i.test(created.error.message)) {
        throw created.error;
      }
      generated = await admin.auth.admin.generateLink({ type: "magiclink", email });
    }

    if (generated.error) throw generated.error;
    const hashedToken = generated.data.properties?.hashed_token;
    if (!hashedToken) throw new Error("Magic link generation failed.");

    const origin = process.env.NODE_ENV === "production"
      ? "https://basscallyhub.vercel.app"
      : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
    const callbackUrl = `${origin}${routes.auth.callback}?token_hash=${encodeURIComponent(hashedToken)}&type=email`;
    const safeUrl = escapeHtml(callbackUrl);
    const emailResult = await sendEmail({
      to: email,
      subject: "Your Basscally Hub sign-in link",
      html: `<h2>Sign in to Basscally Hub</h2><p>Use the button below to securely enter your Basscally Hub account.</p><p><a href="${safeUrl}">Sign in to Basscally Hub</a></p><p>This link can only be used once and expires shortly.</p><p>If you did not request this email, you can safely ignore it.</p>`,
      text: `Sign in to Basscally Hub: ${callbackUrl}\n\nThis link can only be used once and expires shortly.`,
    });
    if (!emailResult.ok) throw new Error(emailResult.error);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/rate limit|too many requests/i.test(message)) {
      return NextResponse.json({ error: "Email delivery is temporarily at capacity. Please wait a little before trying again.", reason: "provider_email_limit" }, { status: 429 });
    }
    console.error("[auth/magic-link] delivery failed:", message);
    return NextResponse.json({ error: "We could not send a sign-in link right now. Please try again shortly.", reason: "provider_error" }, { status: 500 });
  }
}
