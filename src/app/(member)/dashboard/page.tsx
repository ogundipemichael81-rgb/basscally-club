import { Suspense } from "react";
import { redirect } from "next/navigation";
import { PastDueBanner } from "@/components/account/past-due-banner";
import { DashboardPageView } from "@/components/dashboard/dashboard-page-view";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { getAccountSubscriptionSummary } from "@/lib/account/subscription-summary";
import { getDashboardData } from "@/lib/dashboard/queries";
import { parseDashboardFilter } from "@/lib/dashboard/filters";
import { getMemberSession } from "@/lib/subscriptions/member-session";
import { deriveTrialState, formatTrialRemaining } from "@/lib/subscriptions/trial-state";
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
function TrialStateBanner({ session, nowMs }: { session: Awaited<ReturnType<typeof getMemberSession>>; nowMs: number }) {
  if (!session) return null;
  const paid = Boolean(session.planLabel && session.planLabel !== "Founding trial");
  const state = deriveTrialState({ nowMs, trialEndsAt: session.trialEndsAt, foundingEligible: session.isFoundingMember, foundingPriceLocked: session.isFoundingMember, paid });
  if (state.trialExpired) return <div className="mb-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6" role="status"><p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--color-brand)]">Your 7-day trial has ended</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-black">Your Founding rate is still locked.</h2><p className="mt-2 text-sm text-[var(--color-text-muted)]">Your account and practice history remain available. Premium drops are locked until membership is active.</p></div>;
  if (!state.trialActive) return null;
  const expiring = state.trialExpiring;
  return <div className={`mb-8 rounded-[var(--radius-xl)] border p-6 ${expiring ? "border-[rgba(255,183,77,0.5)] bg-[rgba(255,183,77,0.08)]" : "border-[rgba(255,91,0,0.45)] bg-[linear-gradient(135deg,rgba(255,91,0,0.18),rgba(255,255,255,0.04))]"}`} role="status"><p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--color-brand)]">{expiring ? "Your free trial ends soon" : "Founding trial"}</p><div className="mt-2 flex flex-wrap items-baseline justify-between gap-3"><h2 className="font-[family-name:var(--font-display)] text-2xl font-black">{formatTrialRemaining(state.trialRemainingMs)}</h2><span className="rounded-full border border-[rgba(255,255,255,0.15)] px-3 py-1 text-sm text-[var(--color-text-muted)]">$1.50/month locked</span></div><p className="mt-2 text-sm text-[var(--color-text-muted)]">Your Founding Member rate is locked. Keep exploring Basscally Hub while your trial is active.</p></div>;
}
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
  const nowMs = new Date().getTime();
  return (
    <>
      <TrialStateBanner session={session} nowMs={nowMs} />
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
