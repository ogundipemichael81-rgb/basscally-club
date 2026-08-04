/**
 * Canonical route paths — mirrors 09_routes_wiring_screen_map_and_components.md
 */

import { DEFAULT_STYLE_SLUG } from "@/lib/constants";

export const routes = {
  home: "/",
  pricing: "/pricing",
  waitlist: "/waitlist",
  join: "/join",
  checkoutFlow: "/checkout",
  style: (slug: string) => `/style/${slug}` as const,
  defaultStyle: `/style/${DEFAULT_STYLE_SLUG}` as const,
  auth: {
    login: "/auth/login",
    callback: "/auth/callback",
  },
  checkout: {
    success: "/checkout/success",
    cancelled: "/checkout/cancelled",
  },
  paywall: (options?: { contentId?: string; reason?: string }) => {
    const params = new URLSearchParams();
    if (options?.contentId) params.set("contentId", options.contentId);
    if (options?.reason) params.set("reason", options.reason);
    const query = params.toString();
    return query ? (`/paywall?${query}` as const) : ("/paywall" as const);
  },
  legal: {
    terms: "/terms",
    privacy: "/privacy",
    refundPolicy: "/refund-policy",
  },
  member: {
    dashboard: "/dashboard",
    content: (id: string) => `/c/${id}` as const,
    account: "/account",
    accountBilling: "/account/billing",
    accountBillingPortal: "/account/billing/portal",
    accountCancel: "/account/cancel",
    accountSecurity: "/account/security",
  },
  admin: {
    root: "/admin",
    unauthorized: "/admin/unauthorized",
    content: "/admin/content",
    contentNew: "/admin/content/new",
    contentEdit: (id: string) => `/admin/content/${id}` as const,
    contentDelete: (id: string) => `/admin/content/${id}/delete` as const,
    subscribers: "/admin/subscribers",
    emailLogs: "/admin/email-logs",
    emailLogsResend: "/admin/email-logs/resend",
    emailTemplates: "/admin/email-templates",
  },
  api: {
    auth: {
      magicLink: "/api/auth/magic-link",
      joinCreateAccount: "/api/join/create-account",
      checkoutCreate: "/api/checkout/create",
      checkoutStatus: "/api/checkout/status",
    },
    waitlist: "/api/waitlist",
    adminContent: "/api/admin/content",
    adminContentById: (id: string) => `/api/admin/content/${id}` as const,
    adminContentResend: (id: string) => `/api/admin/content/${id}/resend` as const,
    adminSubscribersExport: "/api/admin/subscribers/export" as const,
    contentPreview: (id: string) => `/api/content/${id}/preview` as const,
    webhooks: {
      lemonSqueezy: "/api/webhooks/lemonsqueezy",
      resend: "/api/webhooks/resend",
    },
    contentDownload: (id: string) => `/api/content/${id}/download` as const,
    cron: {
      publishScheduled: "/api/cron/publish-scheduled",
      sendEmailQueue: "/api/cron/send-email-queue",
      sendReminders: "/api/cron/send-reminders",
    },
    emailUnsubscribe: "/api/email/unsubscribe",
  },
} as const;

export type Routes = typeof routes;

