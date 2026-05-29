import { AdminSubscribersList } from "@/components/admin/admin-subscribers-list";
import { listAdminSubscribers } from "@/lib/admin/metrics/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribers — Basscally Admin",
  description: "Search, filter, and export Basscally Hub subscribers.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminSubscribersPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const status = typeof params.status === "string" ? params.status : "all";
  const pageParam = typeof params.page === "string" ? Number.parseInt(params.page, 10) : 1;

  const data = await listAdminSubscribers({
    page: Number.isFinite(pageParam) ? pageParam : 1,
    query: q,
    status,
  });

  return <AdminSubscribersList data={data} query={q} status={status} />;
}
