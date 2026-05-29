/** Target: welcome + magic link within 60 seconds of subscription_created. */
export const EMAIL_WELCOME_SLA_SECONDS = 60;

/** Target: new-drop notification to 100% active subscribers within 5 minutes of publish. */
export const EMAIL_DROP_SLA_MINUTES = 5;

export const EMAIL_TYPES = {
  welcome: "welcome",
  newDrop: "new_drop",
  newDropResend: "new_drop_resend",
  paymentFailed: "payment_failed",
} as const;

export type EmailType = (typeof EMAIL_TYPES)[keyof typeof EMAIL_TYPES];
