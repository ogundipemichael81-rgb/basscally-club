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

export const metadata: Metadata = {
  title: "Dashboard — Basscally Hub",
  description: "Your latest drops, practice library, and upcoming releases.",
};

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

  if (!session.hasAccess) {
    redirect(routes.paywall({ reason: "lapsed" }));
  }

  const filterParam = searchParams.filter;
  const filterValue = Array.isArray(filterParam) ? filterParam[0] : filterParam;
  const filter = parseDashboardFilter(filterValue);

  const data = await getDashboardData(session.userId);
  const summary = await getAccountSubscriptionSummary();

  return (
    <>
      {summary ? <PastDueBanner summary={summary} className="mb-8" /> : null}
      <DashboardPageView session={session} data={data} filter={filter} />
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
