import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";
import type { AdminSession } from "@/lib/admin/auth";

type AuditPayload = {
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
};

export async function logAdminAudit(
  session: AdminSession,
  payload: AuditPayload,
): Promise<void> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return;
  }

  try {
    const admin = createAdminClient();
    await admin.from("audit_events").insert({
      actor_user_id: session.userId,
      actor_email: session.email,
      action: payload.action,
      entity_type: payload.entityType,
      entity_id: payload.entityId,
      metadata_json: payload.metadata ?? null,
    });
  } catch {
    // Audit logging must not block admin writes.
  }
}
