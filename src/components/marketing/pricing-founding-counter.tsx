import type { FoundingMemberStats } from "@/lib/founding/stats";

type Props = {
  stats: FoundingMemberStats;
  className?: string;
};

export function PricingFoundingCounter({ stats, className }: Props) {
  const label = stats.live
    ? `Founding member spots remaining: ${stats.spotsRemaining} of ${stats.foundingCap}`
    : `Founding member window — up to ${stats.foundingCap} spots at $1.50/month`;

  return (
    <p
      className={className}
      data-founding-counter={stats.live ? "live" : "fallback"}
      data-spots-remaining={stats.spotsRemaining}
    >
      {label}
    </p>
  );
}
