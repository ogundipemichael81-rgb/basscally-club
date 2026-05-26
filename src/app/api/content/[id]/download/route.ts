import { NextResponse } from "next/server";
import { createGuardedDownloadUrl } from "@/lib/downloads/guarded-download";

export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }> };

/**
 * Gated download — subscription check server-side before signed Storage URL.
 */
export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  const result = await createGuardedDownloadUrl(id);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    url: result.signedUrl,
    expiresIn: result.expiresIn,
  });
}
