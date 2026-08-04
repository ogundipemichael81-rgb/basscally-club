import { Suspense } from "react";
import { redirect } from "next/navigation";
import { PastDueBanner } from "@/components/account/past-due-banner";
import { DashboardPageView } from "@/components/dashboard/dashboard-page-view";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { getAccountSubscriptionSummary } from "@/lib/account/subscription-summary";
import { getDashboardData } from "@/lib/dashboard/queries";
import { parseDashboardFilter } from "@/lib/dashboard/filters";
import { getMemberSession } from "@/lib/subscriptions/member-session";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/marketing/button-link";
import { UnpaidPreviewDashboard } from "@/components/dashboard/unpaid-preview-dashboard";

export const metadata: Metadata = {
  title: "Dashboard — Basscally Hub",
  description: "Your latest drops, practice library, and upcoming releases.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function DashboardContent({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getMemberSession();
  if (!session) {
    redirect(routes.auth.login);
  }

  const filterParam = searchParams.filter;
  const filterValue = Array.isArray(filterParam) ? filterParam[0] : filterParam;
  const filter = parseDashboardFilter(filterValue);

  let data;
  let summary;
  try {
    [data, summary] = await Promise.all([
      getDashboardData(session.userId),
      getAccountSubscriptionSummary(),
    ]);
  } catch (error) {
    console.error("[dashboard] data load failed:", error instanceof Error ? error.message : error);
    return (
      <div className="rounded-[var(--radius-xl)] border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.08)] p-8" role="alert">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-danger)]">Dashboard unavailable</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-black">We could not load your practice room.</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">Your sign-in is still valid. Refresh once, or contact support if this continues.</p>
        <ButtonLink className="mt-6" href={routes.home}>Return home</ButtonLink>
      </div>
    );
  }

  return (
    <>
      {summary ? <PastDueBanner summary={summary} className="mb-8" /> : null}
      {session.hasAccess ? <DashboardPageView session={session} data={data} filter={filter} /> : <UnpaidPreviewDashboard data={data} />}
    </>
  );
}

export default async function DashboardPage({ searchParams }: Props) {
  const resolved = await searchParams;

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent searchParams={resolved} />
    </Suspense>
  );
}
