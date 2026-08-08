export const FOUNDING_WEEK_END = "2026-08-15T00:00:00Z";
export const FOUNDING_TRIAL_HOURS = 168;

export type TrialStateInput = {
  nowMs: number;
  trialEndsAt: string | null;
  foundingEligible: boolean;
  foundingPriceLocked: boolean;
  paid: boolean;
};

export type TrialState = TrialStateInput & {
  trialRemainingMs: number;
  trialActive: boolean;
  trialExpiring: boolean;
  trialExpired: boolean;
};

export function deriveTrialState(input: TrialStateInput): TrialState {
  const trialRemainingMs = input.trialEndsAt ? Math.max(0, Date.parse(input.trialEndsAt) - input.nowMs) : 0;
  const trialActive = !input.paid && trialRemainingMs > 0;
  const trialExpiring = trialActive && trialRemainingMs <= 48 * 60 * 60 * 1000;
  const trialExpired = !input.paid && Boolean(input.trialEndsAt) && trialRemainingMs === 0;
  return { ...input, trialRemainingMs, trialActive, trialExpiring, trialExpired };
}

export function formatTrialRemaining(ms: number): string {
  const hours = Math.ceil(ms / 36e5);
  if (hours >= 24) { const days = Math.floor(hours / 24); const rest = hours % 24; return rest ? `${days} day${days === 1 ? "" : "s"} ${rest} hour${rest === 1 ? "" : "s"} remaining` : `${days} day${days === 1 ? "" : "s"} remaining`; }
  return `${hours} hour${hours === 1 ? "" : "s"} remaining`;
}
