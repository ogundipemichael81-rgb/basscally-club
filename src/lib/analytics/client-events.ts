export type WhatsAppCommunityPlacement =
  | "first_login"
  | "dashboard"
  | "practice_complete";

type Plausible = (event: string, options?: { props?: Record<string, string | number> }) => void;

declare global {
  interface Window {
    plausible?: Plausible;
  }
}

/** Uses the existing cookieless Plausible event hook; safely no-ops when unconfigured. */
export function trackAnalyticsEvent(
  event: string,
  props: Record<string, string | number> = {},
) {
  window.plausible?.(event, { props });
}
