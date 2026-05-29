import { PaywallView } from "@/components/paywall/paywall-view";
import { resolvePaywallContext } from "@/lib/paywall/resolve-context";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members only — Basscally Hub",
  description: "Reactivate or join Basscally Hub to play and download practice drops.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PaywallPage({ searchParams }: Props) {
  const params = await searchParams;
  const contentId = typeof params.contentId === "string" ? params.contentId : undefined;
  const reason = typeof params.reason === "string" ? params.reason : undefined;

  const context = await resolvePaywallContext({ contentId, reason });

  return <PaywallView context={context} />;
}
