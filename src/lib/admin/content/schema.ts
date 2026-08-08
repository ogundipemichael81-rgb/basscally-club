import { z } from "zod";
import { validateScheduledFor } from "@/lib/admin/content/schedule";
import {
  CONTENT_DIFFICULTIES,
  CONTENT_TYPES,
  PUBLISH_ACTIONS,
} from "@/lib/admin/content/constants";

export const contentFieldsSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(80),
  type: z.enum(CONTENT_TYPES),
  difficulty: z.enum(CONTENT_DIFFICULTIES).optional().nullable(),
  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or fewer.")
    .optional()
    .nullable(),
  styleId: z.string().uuid().optional().nullable(),
  scheduledFor: z.string().optional().nullable(),
  audioStorageKey: z.string().optional().nullable(),
  publishAction: z.enum(PUBLISH_ACTIONS),
  emailSubject: z.string().trim().max(160).optional().nullable(),
  emailBody: z.string().trim().max(2000).optional().nullable(),
  notifyMembers: z.boolean().default(false),
  isFreePreview: z.boolean().default(false),
});

export type ContentFieldsInput = z.infer<typeof contentFieldsSchema>;

export function parseContentFields(formData: FormData) {
  const raw = {
    title: String(formData.get("title") ?? ""),
    type: String(formData.get("type") ?? ""),
    difficulty: formData.get("difficulty")
      ? String(formData.get("difficulty"))
      : null,
    description: formData.get("description")
      ? String(formData.get("description"))
      : null,
    styleId: formData.get("styleId") ? String(formData.get("styleId")) : null,
    scheduledFor: formData.get("scheduledFor")
      ? String(formData.get("scheduledFor"))
      : null,
    audioStorageKey: formData.get("audioStorageKey")
      ? String(formData.get("audioStorageKey"))
      : null,
    publishAction: String(formData.get("publishAction") ?? "draft"),
    emailSubject: formData.get("emailSubject")
      ? String(formData.get("emailSubject"))
      : null,
    emailBody: formData.get("emailBody") ? String(formData.get("emailBody")) : null,
    isFreePreview: formData.get("isFreePreview") === "true",
    notifyMembers: formData.get("notifyMembers") === "true",
  };

  return contentFieldsSchema.safeParse(raw);
}

export function validatePublishRequirements(
  fields: ContentFieldsInput,
): string | null {
  if (fields.publishAction === "scheduled") {
    const scheduledError = validateScheduledFor(fields.scheduledFor);
    if (scheduledError) return scheduledError;
  }

  if (fields.notifyMembers && !fields.emailSubject?.trim()) {
    return "Email subject is required when member notifications are enabled.";
  }
  if (fields.notifyMembers && !fields.emailBody?.trim()) {
    return "Email body is required when member notifications are enabled.";
  }

  return null;
}

