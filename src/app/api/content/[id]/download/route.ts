import { NextResponse } from "next/server";
import { createGuardedDownloadUrl } from "@/lib/downloads/guarded-download";

export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }> };

/**
 * Gated download: signed-in member, published drop, hourly limit, then a short-lived
 * signed Storage URL that saves the file under the drop's name.
 */
export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  const result = await createGuardedDownloadUrl(id);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(
    { url: result.signedUrl, expiresIn: result.expiresIn },
    { headers: { "Cache-Control": "no-store" } },
  );
}
