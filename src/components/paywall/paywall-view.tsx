import Link from "next/link";
import { LockedDropPreview } from "@/components/paywall/locked-drop-preview";
import { ButtonLink } from "@/components/marketing/button-link";
import { Badge } from "@/components/ui/badge";
import type { PaywallContext } from "@/lib/paywall/types";
import { routes } from "@/lib/routes";

const REASON_COPY = {
  anonymous: {
    badge: "Sign in required",
    badgeVariant: "danger" as const,
    title: "This drop is for",
    titleAccent: "Hub members.",
    lede: "Join Basscally Hub to play and download the latest bass-less covers, grooves, fills, and challenges.",
    primaryLabel: "Join Basscally Hub — $1.50/month",
    secondaryLabel: "I already paid. Sign in",
  },
  lapsed: {
    badge: "Membership inactive",
    badgeVariant: "danger" as const,
    title: "Reactivate to unlock",
    titleAccent: "this drop.",
    lede: "Your membership is not active. Reactivate through Lemon Squeezy to stream and download again.",
    primaryLabel: "Reactivate membership",
    secondaryLabel: "Sign in with another account",
  },
  past_due: {
    badge: "Payment past due",
    badgeVariant: "warning" as const,
    title: "Update payment to",
    titleAccent: "keep access.",
    lede: "Your last payment did not go through. Update your card in the billing portal, then return to this drop.",
    primaryLabel: "Update payment",
    secondaryLabel: "Manage membership",
  },
};

type Props = {
  context: PaywallContext;
};

export function PaywallView({ context }: Props) {
  const copy = REASON_COPY[context.reason];
  const primaryHref =
    context.reason === "past_due" && context.billingPortalUrl
      ? context.billingPortalUrl
      : context.reactivateCheckoutUrl;

  const primaryExternal =
    context.reason === "past_due" && Boolean(context.billingPortalUrl);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-5 py-10 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black_18%,transparent_78%)]" />

      <div className="relative mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
            Paywall
          </p>
          <Badge variant={copy.badgeVariant} className="mt-3">
            {copy.badge}
          </Badge>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.5rem)] font-black leading-[0.88] tracking-[-0.06em]">
            {copy.title}{" "}
            <span className="text-[var(--color-brand)] italic">{copy.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[var(--color-text-muted)]">{copy.lede}</p>

          {context.showFoundingRejoin ? (
            <p className="mt-4 max-w-xl rounded-[var(--radius-md)] border border-[rgba(255,69,0,0.28)] bg-[var(--color-brand-muted)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
              <span className="font-semibold text-[var(--color-brand)]">
                Founding member re-join:
              </span>{" "}
              You can return at $1.50/month while{" "}
              {context.foundingSpotsRemaining} founding spots remain.
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3 max-[680px]:flex-col">
            <ButtonLink
              href={primaryHref}
              className="landing-cta-glow max-[680px]:w-full"
              {...(primaryExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {copy.primaryLabel}
            </ButtonLink>
            <ButtonLink
              href={
                context.reason === "past_due"
                  ? routes.member.accountBilling
                  : context.loginUrl
              }
              variant="secondary"
              className="max-[680px]:w-full"
            >
              {copy.secondaryLabel}
            </ButtonLink>
          </div>

          <ol className="mt-8 max-w-lg space-y-4" aria-label="Recovery steps">
            {[
              {
                id: "paywall-step-subscribe",
                title: context.reason === "past_due" ? "Fix payment" : "Subscribe",
                body: "Checkout or billing portal opens through Lemon Squeezy.",
              },
              {
                id: "paywall-step-sign-in",
                title: "Open magic link",
                body: "Your account signs in without a password.",
              },
              {
                id: "paywall-step-return",
                title: "Return to this drop",
                body: "The audio player and download button become available.",
              },
            ].map((step, index) => (
              <li key={step.id} className="grid grid-cols-[32px_1fr] gap-3">
                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-brand)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">{step.title}</strong>
                  <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {context.reason === "anonymous" ? "Anonymous user" : null}
            {context.reason === "lapsed" ? "Lapsed member" : null}
            {context.reason === "past_due" ? "Past-due member" : null}
            {" · "}
            <Link href={routes.pricing} className="text-[var(--color-brand)] hover:underline">
              View all plans
            </Link>
          </p>
        </div>

        <LockedDropPreview content={context.content} />
      </div>
    </div>
  );
}
