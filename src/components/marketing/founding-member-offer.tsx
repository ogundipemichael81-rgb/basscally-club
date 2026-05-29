import type { ReactNode } from "react";
import { IconArrowRight } from "@/components/icons";
import { ButtonLink } from "@/components/marketing/button-link";
import { SectionLabel } from "@/components/marketing/section-label";
import { getFoundingMemberStats } from "@/lib/founding/stats";
import { routes } from "@/lib/routes";

function MarketingSection({
  id,
  children,
  riseClassName = "landing-rise",
}: {
  id: string;
  children: ReactNode;
  riseClassName?: string;
}) {
  return (
    <section
      id={id}
      className="border-t border-[var(--color-border)] py-12 lg:py-[var(--space-10)]"
    >
      <div className={`basscally-container ${riseClassName}`}>{children}</div>
    </section>
  );
}

export async function FoundingMemberOffer() {
  const stats = await getFoundingMemberStats();

  const spotsLabel = stats.live
    ? `Founding member spots remaining: ${stats.spotsRemaining}`
    : "Limited founding member window — spots fill from live signups";

  return (
    <MarketingSection id="founding" riseClassName="landing-rise">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[rgba(255,69,0,0.25)] bg-[var(--color-brand-muted)] p-8 text-center lg:p-12">
        <div
          className="landing-rail-line absolute inset-x-6 top-0 lg:inset-x-12"
          aria-hidden
        />
        <SectionLabel>Limited offer</SectionLabel>
        <h2 className="relative z-[1] mb-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight lg:text-4xl">
          Founding Member Offer
        </h2>
        <p className="relative z-[1] mx-auto mb-8 max-w-xl text-[var(--color-text-muted)]">
          The first {stats.foundingCap} members lock in{" "}
          <strong className="text-[var(--color-text)]">$1.50/month for life</strong>.
          After that, the price goes up.
        </p>
        <ButtonLink
          href={routes.pricing}
          size="lg"
          className="landing-cta-glow group relative z-[1] mx-auto w-full max-w-md sm:w-auto"
        >
          Become a Founding Member — $1.50/month
          <IconArrowRight className="transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </ButtonLink>
        <p
          className="relative z-[1] mt-4 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-dim)]"
          data-founding-counter={stats.live ? "live" : "fallback"}
        >
          {spotsLabel}
        </p>
      </div>
    </MarketingSection>
  );
}
