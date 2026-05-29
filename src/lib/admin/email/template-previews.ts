import "server-only";

import {
  EMAIL_DROP_SLA_MINUTES,
  EMAIL_WELCOME_SLA_SECONDS,
} from "@/lib/email/constants";
import {
  previewUnsubscribeUrl,
  renderNewDropEmail,
  renderPaymentFailedEmail,
  renderWelcomeEmail,
} from "@/lib/email/templates/render";

export type EmailTemplatePreview = {
  id: string;
  name: string;
  subject: string;
  body: string;
  description: string;
};

export function getEmailTemplatePreviews(): EmailTemplatePreview[] {
  const sampleUnsub = previewUnsubscribeUrl("member@example.com");

  const welcome = renderWelcomeEmail({
    name: "Alex",
    magicLinkUrl: "https://basscally.club/auth/callback?example=magic",
    unsubscribeUrl: sampleUnsub,
  });

  const newDrop = renderNewDropEmail({
    dropTitle: "Funk Slap Pattern in E",
    dropDescription: "Weekly groove for pocket practice.",
    contentId: "e0000000-0000-4000-8000-000000000001",
    unsubscribeUrl: sampleUnsub,
  });

  const paymentFailed = renderPaymentFailedEmail({
    billingPortalUrl: "https://basscally.lemonsqueezy.com/billing",
    unsubscribeUrl: sampleUnsub,
  });

  return [
    {
      id: "welcome",
      name: "Welcome email",
      subject: welcome.subject,
      body: welcome.text,
      description: `Sent after subscription_created webhook (target: within ${EMAIL_WELCOME_SLA_SECONDS} seconds).`,
    },
    {
      id: "new_drop",
      name: "New drop notification",
      subject: newDrop.subject,
      body: newDrop.text,
      description: `Queued when a drop is published — 100% active subscribers within ${EMAIL_DROP_SLA_MINUTES} minutes.`,
    },
    {
      id: "payment_failed",
      name: "Payment failed",
      subject: paymentFailed.subject,
      body: paymentFailed.text,
      description: "Sent when subscription payment fails (past_due).",
    },
    {
      id: "cancellation",
      name: "Cancellation confirmation",
      subject: "Your Basscally Hub membership ends soon",
      body: `Your membership is set to cancel at period end.

Access continues until: {{period_end}}

Reactivate anytime through the billing portal: {{billing_portal_url}}`,
      description: "Sent when cancel_at_period_end is set.",
    },
  ];
}
