/**
 * Canonical route paths — mirrors 09_routes_wiring_screen_map_and_components.md
 */

export const routes = {
  home: "/",
  pricing: "/pricing",
  auth: {
    login: "/auth/login",
    callback: "/auth/callback",
  },
  checkout: {
    success: "/checkout/success",
    cancelled: "/checkout/cancelled",
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
  },
  admin: {
    root: "/admin",
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
    },
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
  },
} as const;

export type Routes = typeof routes;
