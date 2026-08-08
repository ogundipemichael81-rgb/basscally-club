import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Downloads are deliberately paused for launch. The guarded implementation is
 * retained in src/lib/downloads/guarded-download.ts for later re-enablement.
 */
export function GET() {
  return NextResponse.json(
    { error: "Downloads are temporarily unavailable." },
    { status: 503 },
  );
}
