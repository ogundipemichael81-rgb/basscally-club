import { DashboardScrollReveal } from "@/components/dashboard/dashboard-scroll-reveal";
import { NextDropCountdown } from "@/components/dashboard/next-drop-countdown";
import { Badge } from "@/components/ui/badge";
import { formatScheduledDate } from "@/lib/dashboard/format";
import type { UpcomingDrop } from "@/lib/dashboard/types";

type Props = {
  upcoming: UpcomingDrop[];
  nextDropIso: string | null;
};

export function DashboardUpcomingRail({ upcoming, nextDropIso }: Props) {
  const nextDrop = upcoming[0] ?? null;

  return (
    <aside className="space-y-4" aria-label="Upcoming drops rail">
      <DashboardScrollReveal delayMs={60}>
        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
            Next drop countdown
          </p>
          {nextDropIso ? (
            <>
              <NextDropCountdown targetIso={nextDropIso} className="mt-4" />
              {nextDrop ? (
                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <p className="text-sm font-semibold text-[var(--color-text)]">{nextDrop.title}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    {formatScheduledDate(nextDrop.scheduledFor)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="default">{nextDrop.typeLabel}</Badge>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Weekly drops are scheduled by the Hub team. Your next publish window will appear here.
            </p>
          )}
        </section>
      </DashboardScrollReveal>

      {upcoming.length > 0 ? (
        <DashboardScrollReveal delayMs={100}>
          <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
              Upcoming drop rail
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
              Release rhythm
            </h2>
            <ol className="mt-4 space-y-4">
              {upcoming.map((drop, index) => (
                <li
                  key={drop.id}
                  className="border-l-2 border-[var(--color-border)] pl-4"
                  style={
                    index === 0
                      ? { borderColor: "var(--color-brand)" }
                      : undefined
                  }
                >
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                    {formatScheduledDate(drop.scheduledFor)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">{drop.title}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">{drop.typeLabel}</p>
                </li>
              ))}
            </ol>
          </section>
        </DashboardScrollReveal>
      ) : null}
    </aside>
  );
}
