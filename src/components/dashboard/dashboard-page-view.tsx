import { Suspense } from "react";
import { DashboardContentGrid } from "@/components/dashboard/dashboard-content-grid";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardFilterTabs } from "@/components/dashboard/dashboard-filter-tabs";
import { DashboardLatestHero } from "@/components/dashboard/dashboard-latest-hero";
import { DashboardScrollReveal } from "@/components/dashboard/dashboard-scroll-reveal";
import { DashboardUpcomingRail } from "@/components/dashboard/dashboard-upcoming-rail";
import { Badge } from "@/components/ui/badge";
import { dashboardFilterHref, filterDashboardItems, getDashboardLibraryContext, type DashboardFilter } from "@/lib/dashboard/filters";
import type { DashboardData } from "@/lib/dashboard/types";
import type { MemberSession } from "@/lib/subscriptions/member-session";
import Link from "next/link";

type Props = { session: MemberSession; data: DashboardData; filter: DashboardFilter; isOverview: boolean };
const CATEGORY_CARDS: { filter: DashboardFilter; title: string }[] = [
  { filter: "bassless", title: "Bass-less" }, { filter: "grooves", title: "Grooves" }, { filter: "fills", title: "Fills" }, { filter: "challenges", title: "Challenges" },
];

export function DashboardPageView({ session, data, filter, isOverview }: Props) {
  const isEmpty = data.published.length === 0;
  const nextDropIso = data.upcoming[0]?.scheduledFor ?? null;
  const filteredItems = filterDashboardItems(data.published, filter, data.downloadedIds);
  const latestDrop = filteredItems[0] ?? null;
  const library = getDashboardLibraryContext(filter);

  if (isEmpty) return <DashboardEmptyState upcoming={data.upcoming} upcomingTargetIso={nextDropIso} />;

  return <div className="space-y-8">
    <DashboardScrollReveal>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">{isOverview ? "Practice Room" : library.eyebrow}</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black leading-[0.95] tracking-[-0.03em]">{isOverview ? "Your Practice Room." : library.title}</h1>
          <p className="mt-3 max-w-2xl text-[length:var(--text-body)] text-[var(--color-text-muted)]">{isOverview ? "Start with the latest drop, then choose the kind of practice you need today." : library.description}</p>
        </div>
        <div className="flex flex-wrap gap-2"><Badge variant="active">Active</Badge>{session.isFoundingMember ? <Badge variant="brand">Founding member</Badge> : null}{session.planLabel ? <Badge variant="default">{session.planLabel}</Badge> : null}</div>
      </header>
    </DashboardScrollReveal>

    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]"><div className="space-y-8">
      {latestDrop ? <DashboardLatestHero item={latestDrop} /> : null}
      {isOverview ? <section aria-label="Practice categories" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{CATEGORY_CARDS.map((card) => { const count = filterDashboardItems(data.published, card.filter, data.downloadedIds).length; return <Link key={card.filter} href={dashboardFilterHref(card.filter)} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:border-[var(--color-border-strong)]"><p className="font-[family-name:var(--font-display)] text-lg font-bold">{card.title}</p><p className="mt-2 text-sm text-[var(--color-text-muted)]">{count} published {count === 1 ? "drop" : "drops"}</p><p className="mt-4 text-xs font-semibold text-[var(--color-brand)]">Open category →</p></Link>; })}</section> : null}
      <section id="library" className="scroll-mt-24 space-y-5"><DashboardScrollReveal delayMs={80}><div><p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">{isOverview ? "Library" : library.eyebrow}</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black tracking-[-0.03em]">{isOverview ? "Practice library" : library.title}</h2><p className="mt-2 text-sm text-[var(--color-text-muted)]">{isOverview ? "All published drops, ready for your next session." : `${filteredItems.length} published ${filteredItems.length === 1 ? "drop" : "drops"} in this category.`}</p></div></DashboardScrollReveal>
        <Suspense fallback={<div className="h-11 animate-pulse rounded-full bg-[var(--color-surface-raised)]" />}><DashboardFilterTabs /></Suspense>
        <DashboardContentGrid items={filteredItems} emptyTitle={library.emptyTitle} emptyDescription={library.emptyDescription} />
      </section>
    </div><DashboardUpcomingRail upcoming={data.upcoming} nextDropIso={nextDropIso} /></div>
  </div>;
}