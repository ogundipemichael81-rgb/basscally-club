import { APP_NAME } from "@/lib/constants";
import { whatsappCommunityUrl } from "@/lib/social-links";
import { clientEnv } from "@/lib/env";
import { routes } from "@/lib/routes";

export type RenderedEmail = {
  subject: string;
  html: string;
  text: string;
};

function footer(unsubscribeUrl: string): string {
  return `\n\n— ${APP_NAME}\nUnsubscribe: ${unsubscribeUrl}`;
}

function footerHtml(unsubscribeUrl: string): string {
  return `<p style="margin-top:24px;color:#6B6B72;font-size:12px;">— ${APP_NAME}<br/><a href="${unsubscribeUrl}">Unsubscribe</a></p>`;
}

export function renderWelcomeEmail(options: {
  name: string | null;
  magicLinkUrl: string;
  unsubscribeUrl: string;
}): RenderedEmail {
  const firstName = options.name?.split(" ")[0] || "there";
  const dashboardUrl = `${clientEnv.NEXT_PUBLIC_APP_URL}${routes.member.dashboard}`;

  const subject = `Welcome to ${APP_NAME} — your magic link is inside`;
  const text = `Hey ${firstName},

Welcome to ${APP_NAME}. Your membership is active.

Sign in with your magic link:
${options.magicLinkUrl}

Open your dashboard: ${dashboardUrl}
Join the WhatsApp community: ${whatsappCommunityUrl}

Questions? basscally.enquiry@gmail.com${footer(options.unsubscribeUrl)}`;

  const html = `<div style="font-family:Geist,Inter,sans-serif;color:#F5F5F7;background:#0A0A0B;padding:24px;">
<h1 style="color:#FF4500;">Welcome to ${APP_NAME}</h1>
<p>Hey ${firstName}, your membership is active.</p>
<p><a href="${options.magicLinkUrl}" style="display:inline-block;background:#FF4500;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:600;">Open magic link</a></p>
<p><a href="${dashboardUrl}">Go to dashboard</a> · <a href="${whatsappCommunityUrl}">Join WhatsApp community</a></p>
${footerHtml(options.unsubscribeUrl)}
</div>`;

  return { subject, html, text };
}

export function renderNewDropEmail(options: {
  dropTitle: string;
  dropDescription: string | null;
  contentId: string;
  customSubject?: string | null;
  customBody?: string | null;
  unsubscribeUrl: string;
}): RenderedEmail {
  const contentUrl = `${clientEnv.NEXT_PUBLIC_APP_URL}${routes.member.content(options.contentId)}`;

  const subject = options.customSubject?.trim() || `[New drop] ${options.dropTitle}`;
  const bodyIntro =
    options.customBody?.trim() ||
    `New practice drop just landed in the Hub.\n\n${options.dropTitle}${options.dropDescription ? `\n${options.dropDescription}` : ""}`;

  const text = `${bodyIntro}

Play now: ${contentUrl}
Download from the drop page (members only).

100% active subscribers receive this notification within 5 minutes of publish.${footer(options.unsubscribeUrl)}`;

  const html = `<div style="font-family:Geist,Inter,sans-serif;color:#F5F5F7;background:#0A0A0B;padding:24px;">
<h1 style="color:#FF4500;">New drop: ${options.dropTitle}</h1>
<p>${bodyIntro.replace(/\n/g, "<br/>")}</p>
<p><a href="${contentUrl}" style="display:inline-block;background:#FF4500;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:600;">Play &amp; download</a></p>
${footerHtml(options.unsubscribeUrl)}
</div>`;

  return { subject, html, text };
}

export function renderPaymentFailedEmail(options: {
  billingPortalUrl: string | null;
  unsubscribeUrl: string;
}): RenderedEmail {
  const portalUrl =
    options.billingPortalUrl ||
    `${clientEnv.NEXT_PUBLIC_APP_URL}${routes.member.accountBillingPortal}`;

  const subject = "Update your Basscally Hub payment method";
  const text = `We could not process your latest payment.

Update billing: ${portalUrl}

Your access continues during the grace period. Fix payment to keep streaming and downloads.${footer(options.unsubscribeUrl)}`;

  const html = `<div style="font-family:Geist,Inter,sans-serif;color:#F5F5F7;background:#0A0A0B;padding:24px;">
<h1 style="color:#FF4500;">Payment failed</h1>
<p>We could not process your latest payment. Update your card to keep access.</p>
<p><a href="${portalUrl}" style="display:inline-block;background:#FF4500;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:600;">Update payment</a></p>
${footerHtml(options.unsubscribeUrl)}
</div>`;

  return { subject, html, text };
}

export function previewUnsubscribeUrl(email: string): string {
  return `${clientEnv.NEXT_PUBLIC_APP_URL}/api/email/unsubscribe?token=preview-${encodeURIComponent(email)}`;
}
