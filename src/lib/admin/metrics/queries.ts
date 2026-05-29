import "server-only";

import { planMonthlyUsd } from "@/lib/admin/metrics/mrr";
import { listAdminContent } from "@/lib/admin/content/queries";
import { PLANS } from "@/lib/plans";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  hasSupabaseServiceRole,
  isSupabaseClientConfigured,
} from "@/lib/env";

type SubscriptionRow = {
  id: string;
  user_id: string;
  plan_code: string;
  status: string;
  current_period_end: string | null;
  ends_at: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
};

export type AdminMetricsSnapshot = {
  activeSubscribers: number;
  mrr: number;
  newThisMonth: number;
  failedPayments: number;
  sparklines: {
    active: number[];
    mrr: number[];
    newSubs: number[];
    failed: number[];
  };
  nextScheduledDrop: { id: string; title: string; scheduledFor: string } | null;
  contentRows: Awaited<ReturnType<typeof listAdminContent>>;
  isLive: boolean;
};

export type AdminSubscriberRow = {
  id: string;
  email: string;
  name: string | null;
  planCode: string;
  planLabel: string;
  status: string;
  isFoundingMember: boolean;
  currentPeriodEnd: string | null;
  createdAt: string;
};

export type AdminEmailLogRow = {
  id: string;
  emailType: string;
  status: string;
  userEmail: string | null;
  contentTitle: string | null;
  sentAt: string | null;
  createdAt: string;
  errorReason: string | null;
};

const SPARK_DAYS = 12;

function startOfMonth(date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

function buildSparkline(values: number[]): number[] {
  const max = Math.max(...values, 1);
  return values.map((value) => Math.round((value / max) * 100));
}

function emptySparkline(): number[] {
  return Array.from({ length: SPARK_DAYS }, () => 8);
}

async function fetchSubscriptions(): Promise<SubscriptionRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select(
      "id, user_id, plan_code, status, current_period_end, ends_at, cancel_at_period_end, created_at",
    )
    .order("created_at", { ascending: false });

  return (data ?? []) as SubscriptionRow[];
}

export async function getAdminMetricsSnapshot(): Promise<AdminMetricsSnapshot> {
  const contentRows = await listAdminContent();

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return {
      activeSubscribers: 0,
      mrr: 0,
      newThisMonth: 0,
      failedPayments: 0,
      sparklines: {
        active: emptySparkline(),
        mrr: emptySparkline(),
        newSubs: emptySparkline(),
        failed: emptySparkline(),
      },
      nextScheduledDrop: null,
      contentRows,
      isLive: false,
    };
  }

  const admin = createAdminClient();
  const [subscriptions, scheduledResult] = await Promise.all([
    fetchSubscriptions(),
    admin
      .from("content")
      .select("id, title, scheduled_for")
      .eq("status", "scheduled")
      .order("scheduled_for", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const scheduledDrop = scheduledResult.data;

  const monthStart = startOfMonth();
  const activeSubs = subscriptions.filter((sub) =>
    subscriptionGrantsAccess(sub),
  );

  const mrr = activeSubs.reduce(
    (sum, sub) => sum + planMonthlyUsd(sub.plan_code),
    0,
  );

  const newThisMonth = subscriptions.filter((sub) => {
    const created = new Date(sub.created_at);
    return created >= monthStart && subscriptionGrantsAccess(sub);
  }).length;

  const failedPayments = subscriptions.filter((sub) => sub.status === "past_due").length;

  const dayBuckets = Array.from({ length: SPARK_DAYS }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (SPARK_DAYS - 1 - index));
    return dayKey(date.toISOString());
  });

  const newByDay = dayBuckets.map((key) =>
    subscriptions.filter(
      (sub) => dayKey(sub.created_at) === key && subscriptionGrantsAccess(sub),
    ).length,
  );

  const failedByDay = dayBuckets.map((key) =>
    subscriptions.filter(
      (sub) => sub.status === "past_due" && dayKey(sub.created_at) <= key,
    ).length,
  );

  const activeByDay = dayBuckets.map((key) =>
    subscriptions.filter(
      (sub) => subscriptionGrantsAccess(sub) && dayKey(sub.created_at) <= key,
    ).length,
  );

  const mrrByDay = dayBuckets.map((_, index) => {
    const activeCount = activeByDay[index] ?? 0;
    const avgPlan =
      activeSubs.length > 0 ? mrr / Math.max(activeSubs.length, 1) : 0;
    return Math.round(activeCount * avgPlan * 100) / 100;
  });

  return {
    activeSubscribers: activeSubs.length,
    mrr,
    newThisMonth,
    failedPayments,
    sparklines: {
      active: buildSparkline(activeByDay),
      mrr: buildSparkline(mrrByDay),
      newSubs: buildSparkline(newByDay),
      failed: buildSparkline(failedByDay),
    },
    nextScheduledDrop: scheduledDrop?.scheduled_for
      ? {
          id: scheduledDrop.id,
          title: scheduledDrop.title,
          scheduledFor: scheduledDrop.scheduled_for,
        }
      : null,
    contentRows,
    isLive: true,
  };
}

export type ListSubscribersOptions = {
  page?: number;
  pageSize?: number;
  query?: string;
  status?: string;
};

export type ListSubscribersResult = {
  rows: AdminSubscriberRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLive: boolean;
};

export async function listAdminSubscribers(
  options: ListSubscribersOptions = {},
): Promise<ListSubscribersResult> {
  const page = Math.max(1, options.page ?? 1);
  const pageSize = Math.min(50, Math.max(10, options.pageSize ?? 20));
  const query = options.query?.trim().toLowerCase() ?? "";
  const statusFilter = options.status?.trim().toLowerCase() ?? "all";

  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return {
      rows: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
      isLive: false,
    };
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select(
      "id, plan_code, status, current_period_end, created_at, users(id, email, name, is_founding_member)",
    )
    .order("created_at", { ascending: false });

  let rows: AdminSubscriberRow[] = (data ?? []).map((row) => {
    const user = Array.isArray(row.users) ? row.users[0] : row.users;
    const planCode = row.plan_code ?? "standard_monthly";
    return {
      id: row.id,
      email: user?.email ?? "unknown",
      name: user?.name ?? null,
      planCode,
      planLabel: PLANS[planCode as keyof typeof PLANS]?.label ?? planCode,
      status: row.status,
      isFoundingMember: Boolean(user?.is_founding_member),
      currentPeriodEnd: row.current_period_end,
      createdAt: row.created_at,
    };
  });

  if (query) {
    rows = rows.filter(
      (row) =>
        row.email.toLowerCase().includes(query) ||
        (row.name?.toLowerCase().includes(query) ?? false),
    );
  }

  if (statusFilter !== "all") {
    rows = rows.filter((row) => {
      if (statusFilter === "active") {
        return subscriptionGrantsAccess({
          status: row.status,
          current_period_end: row.currentPeriodEnd,
          ends_at: null,
          cancel_at_period_end: false,
        });
      }
      if (statusFilter === "cancelled") {
        return row.status === "cancelled" || row.status === "expired";
      }
      if (statusFilter === "past_due") {
        return row.status === "past_due";
      }
      return row.status === statusFilter;
    });
  }

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    rows: rows.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
    isLive: true,
  };
}

export async function listAdminEmailLogs(): Promise<{
  rows: AdminEmailLogRow[];
  isLive: boolean;
}> {
  if (!isSupabaseClientConfigured() || !hasSupabaseServiceRole()) {
    return { rows: [], isLive: false };
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("email_logs")
    .select(
      "id, email_type, status, sent_at, created_at, error_reason, users(email), content(title)",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  const rows: AdminEmailLogRow[] = (data ?? []).map((row) => {
    const user = Array.isArray(row.users) ? row.users[0] : row.users;
    const content = Array.isArray(row.content) ? row.content[0] : row.content;

    return {
      id: row.id,
      emailType: row.email_type,
      status: row.status,
      userEmail: user?.email ?? null,
      contentTitle: content?.title ?? null,
      sentAt: row.sent_at,
      createdAt: row.created_at,
      errorReason: row.error_reason,
    };
  });

  return { rows, isLive: true };
}

export async function buildSubscribersCsv(): Promise<string> {
  const { rows } = await listAdminSubscribers({ page: 1, pageSize: 10000 });
  const header = [
    "email",
    "name",
    "plan_code",
    "status",
    "is_founding_member",
    "current_period_end",
    "created_at",
  ];

  const lines = rows.map((row) =>
    [
      csvEscape(row.email),
      csvEscape(row.name ?? ""),
      csvEscape(row.planCode),
      csvEscape(row.status),
      row.isFoundingMember ? "true" : "false",
      csvEscape(row.currentPeriodEnd ?? ""),
      csvEscape(row.createdAt),
    ].join(","),
  );

  return [header.join(","), ...lines].join("\n");
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
