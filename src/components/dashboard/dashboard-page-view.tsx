import { Suspense } from "react";
import { DashboardContentGrid } from "@/components/dashboard/dashboard-content-grid";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardFilterTabs } from "@/components/dashboard/dashboard-filter-tabs";
import { DashboardLatestHero } from "@/components/dashboard/dashboard-latest-hero";
import { DashboardScrollReveal } from "@/components/dashboard/dashboard-scroll-reveal";
import { DashboardUpcomingRail } from "@/components/dashboard/dashboard-upcoming-rail";
import { Badge } from "@/components/ui/badge";
import {
  filterDashboardItems,
  type DashboardFilter,
} from "@/lib/dashboard/filters";
import type { DashboardData } from "@/lib/dashboard/types";
import type { MemberSession } from "@/lib/subscriptions/member-session";

type Props = {
  session: MemberSession;
  data: DashboardData;
  filter: DashboardFilter;
};

export function DashboardPageView({ session, data, filter }: Props) {
  const isEmpty = data.published.length === 0;
  const nextDropIso = data.upcoming[0]?.scheduledFor ?? null;
  const filteredItems = filterDashboardItems(data.published, filter, data.downloadedIds);
  const latestDrop = data.published[0] ?? null;

  if (isEmpty) {
    return (
      <DashboardEmptyState upcoming={data.upcoming} upcomingTargetIso={nextDropIso} />
    );
  }

  return (
    <div className="space-y-8">
      <DashboardScrollReveal>
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">
              Member dashboard
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black leading-[0.95] tracking-[-0.03em]">
              Latest drop just landed.
            </h1>
            <p className="mt-3 max-w-2xl text-[length:var(--text-body)] text-[var(--color-text-muted)]">
              Play the newest practice drop first, then move through the library by type and habit.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="active">Active</Badge>
            {session.isFoundingMember ? <Badge variant="brand">Founding member</Badge> : null}
            {session.planLabel ? <Badge variant="default">{session.planLabel}</Badge> : null}
          </div>
        </header>
      </DashboardScrollReveal>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-8">
          {latestDrop ? <DashboardLatestHero item={latestDrop} /> : null}

          <section id="library" className="scroll-mt-24 space-y-5">
            <DashboardScrollReveal delayMs={80}>
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
                  Library
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black tracking-[-0.03em]">
                  Practice library
                </h2>
              </div>
            </DashboardScrollReveal>

            <Suspense fallback={<div className="h-11 animate-pulse rounded-full bg-[var(--color-surface-raised)]" />}>
              <DashboardFilterTabs />
            </Suspense>

            <DashboardContentGrid items={filteredItems} />
          </section>
        </div>

        <DashboardUpcomingRail upcoming={data.upcoming} nextDropIso={nextDropIso} />
      </div>
    </div>
  );
}
