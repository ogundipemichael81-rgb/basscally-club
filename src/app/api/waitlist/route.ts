import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export const runtime = "nodejs";

type WaitlistPayload = {
  email?: string;
  experienceLevel?: string;
  styleInterest?: string;
  note?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return NextResponse.json(
      { error: "Waitlist is not configured yet. Try again soon." },
      { status: 503 },
    );
  }

  let body: WaitlistPayload;
  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.from("waitlist").upsert(
    {
      email,
      experience_level: body.experienceLevel?.trim() || null,
      style_interest: body.styleInterest?.trim() || null,
      note: body.note?.trim() || null,
      source: "waitlist_page",
    },
    { onConflict: "email" },
  );

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({
        ok: true,
        message: "You are already on the waitlist.",
      });
    }
    return NextResponse.json(
      { error: "Could not save your details. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "You are on the waitlist. We will email you when your spot opens.",
  });
}
