import type { ContentFieldsInput } from "@/lib/admin/content/schema";

export type ResolvedPublishState = {
  status: "draft" | "scheduled" | "published";
  scheduledFor: string | null;
  publishedAt: string | null;
  queueEmail: boolean;
  emailScheduledFor: string | null;
};

export function resolvePublishState(
  fields: ContentFieldsInput,
  now = new Date(),
): ResolvedPublishState {
  if (fields.publishAction === "draft") {
    return {
      status: "draft",
      scheduledFor: fields.scheduledFor
        ? new Date(fields.scheduledFor).toISOString()
        : null,
      publishedAt: null,
      queueEmail: false,
      emailScheduledFor: null,
    };
  }

  if (fields.publishAction === "scheduled") {
    const scheduledFor = new Date(fields.scheduledFor as string).toISOString();
    return {
      status: "scheduled",
      scheduledFor,
      publishedAt: null,
      queueEmail: Boolean(fields.notifyMembers),
      emailScheduledFor: scheduledFor,
    };
  }

  return {
    status: "published",
    scheduledFor: null,
    publishedAt: now.toISOString(),
    queueEmail: Boolean(fields.notifyMembers),
    emailScheduledFor: now.toISOString(),
  };
}
