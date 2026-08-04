import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin/allowlist";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
}
