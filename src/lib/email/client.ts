import "server-only";

import {
  getResendApiKey,
  getResendFromEmail,
  isResendConfigured,
} from "@/lib/email/config";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type SendEmailResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!isResendConfigured()) {
    return { ok: false, error: "Resend is not configured." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getResendApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getResendFromEmail(),
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  const json = (await response.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
  };

  if (!response.ok) {
    return {
      ok: false,
      error: json.message || `Resend error (${response.status})`,
    };
  }

  return { ok: true, messageId: json.id ?? "unknown" };
}
