import { NextResponse } from "next/server";
import { createPreviewAccess } from "@/lib/content/preview-access";
import { PREVIEW_MAX_SECONDS } from "@/lib/constants";

export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }> };

/**
 * Gated 30-second preview for visitors; full playback when membership is active.
 */
export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  const result = await createPreviewAccess(id);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    url: result.url,
    expiresIn: result.expiresIn,
    gated: result.gated,
    previewSeconds: result.previewSeconds ?? PREVIEW_MAX_SECONDS,
  });
}
