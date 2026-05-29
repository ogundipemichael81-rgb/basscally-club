import { NextResponse } from "next/server";
import {
  isEmailUnsubscribed,
  recordEmailUnsubscribe,
  verifyUnsubscribeToken,
} from "@/lib/email/unsubscribe";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing unsubscribe token." }, { status: 400 });
  }

  const email = verifyUnsubscribeToken(token);
  if (!email) {
    return NextResponse.json({ error: "Invalid or expired unsubscribe link." }, { status: 400 });
  }

  if (!(await isEmailUnsubscribed(email))) {
    await recordEmailUnsubscribe(email);
  }

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>Unsubscribed — Basscally Hub</title></head><body style="font-family:Geist,Inter,sans-serif;background:#0A0A0B;color:#F5F5F7;padding:40px;"><h1 style="color:#FF4500;">You are unsubscribed</h1><p>${email} will no longer receive new-drop or lifecycle emails from Basscally Hub.</p><p>Transactional billing messages may still arrive when required.</p></body></html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
