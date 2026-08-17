import "server-only";

import { resolveMemberFromRequest } from "@/lib/subscriptions/resolve-member";

export type MemberSession = {
  userId: string;
  email: string;
  hasAccess: boolean;
  isFoundingMember: boolean;
  planLabel: string | null;
  trialEndsAt: string | null;
  trialActive: boolean;
};

/**
 * Free Access Mode authority: every authenticated normal member can use the
 * full Hub. Historical trial, founding, and subscription data remains stored,
 * but is deliberately not consulted for entitlement.
 */
export async function getMemberSession(): Promise<MemberSession | null> {
  const member = await resolveMemberFromRequest();
  if (!member) return null;

  return {
    userId: member.userId,
    email: member.email,
    hasAccess: true,
    isFoundingMember: false,
    planLabel: null,
    trialEndsAt: null,
    trialActive: false,
  };
}