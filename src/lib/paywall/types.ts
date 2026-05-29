import type { ContentDetail } from "@/lib/content/queries";

export type PaywallReason = "anonymous" | "lapsed" | "past_due";

export type PaywallContext = {
  reason: PaywallReason;
  content: ContentDetail | null;
  isFoundingMember: boolean;
  showFoundingRejoin: boolean;
  foundingSpotsRemaining: number;
  reactivateCheckoutUrl: string;
  billingPortalUrl: string | null;
  loginUrl: string;
  isAuthenticated: boolean;
};
