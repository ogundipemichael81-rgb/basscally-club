import { notFound, redirect } from "next/navigation";
import { PastDueBanner } from "@/components/account/past-due-banner";
import { ContentDetailView } from "@/components/content/content-detail-view";
import { getAccountSubscriptionSummary } from "@/lib/account/subscription-summary";
import { getContentDetail } from "@/lib/content/queries";
import { getMemberSession } from "@/lib/subscriptions/member-session";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const content = await getContentDetail(id);

  return {
    title: content ? `${content.title} — Basscally Hub` : "Practice drop — Basscally Hub",
    description: content?.description ?? "Play, download, and practice this Basscally Hub drop.",
  };
}

export default async function ContentDetailPage({ params }: Props) {
  const { id } = await params;

  const session = await getMemberSession();
  const summary = await getAccountSubscriptionSummary();

  if (!session) {
    redirect(routes.paywall({ contentId: id, reason: "anonymous" }));
  }

  if (summary?.isPastDue && !summary.hasAccess) {
    redirect(routes.paywall({ contentId: id, reason: "past_due" }));
  }

  if (!session.hasAccess) {
    redirect(routes.paywall({ contentId: id, reason: "lapsed" }));
  }

  const content = await getContentDetail(id);
  if (!content) {
    notFound();
  }

  return (
    <>
      {summary?.isPastDue ? <PastDueBanner summary={summary} className="mb-8" /> : null}
      <ContentDetailView content={content} />
    </>
  );
}
