import { NextResponse } from "next/server";

/** Phase 1 — integrations not wired. */
export function notImplementedStub(feature: string) {
  return NextResponse.json(
    {
      error: "Not implemented",
      message: `${feature} is not wired in Phase 1 scaffold.`,
    },
    { status: 501 },
  );
}
