import { NextResponse } from "next/server";
import { logAdminAudit } from "@/lib/admin/audit";
import { requireAdminApi } from "@/lib/admin/auth";
import {
  getAdminContentById,
  resendDropEmail,
} from "@/lib/admin/content/queries";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: Props) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return NextResponse.json(
      { error: "Email resend is not configured yet." },
      { status: 503 },
    );
  }

  const { id } = await params;
  const content = await getAdminContentById(id);

  if (!content) {
    return NextResponse.json({ error: "Drop not found." }, { status: 404 });
  }

  if (content.status !== "published") {
    return NextResponse.json(
      { error: "Only published drops can be resent." },
      { status: 400 },
    );
  }

  try {
    await resendDropEmail(id);

    const { processEmailQueue } = await import("@/lib/email/queue/process");
    await processEmailQueue({ limit: 50 });

    await logAdminAudit(auth.session, {
      action: "content.resend_email",
      entityType: "content",
      entityId: id,
      metadata: { title: content.title },
    });

    return NextResponse.json({
      ok: true,
      message: "Resend queued. Full email delivery ships in a later autopilot step.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not queue resend." },
      { status: 500 },
    );
  }
}
