/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { planMonthlyUsd } from "@/lib/admin/metrics/mrr";
import { listAdminContent } from "@/lib/admin/content/queries";
import { PLANS } from "@/lib/plans";
import { subscriptionGrantsAccess } from "@/lib/subscriptions/access";
import { deriveTrialState, formatTrialRemaining } from "@/lib/subscriptions/trial-state";
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
  memberMetrics?: Awaited<ReturnType<typeof getAdminMemberMetrics>>;
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
      memberMetrics: {totalUsers:0,signedUpToday:0,activeTrials:0,trialExpiring:0,trialExpired:0,foundingUsers:0,foundingUnpaid:0,foundingPaid:0,paidMembers:0,convertedDuringTrial:0},
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
    memberMetrics: await getAdminMemberMetrics(),
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
  memberMetrics?: Awaited<ReturnType<typeof getAdminMemberMetrics>>;
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
      memberMetrics: {totalUsers:0,signedUpToday:0,activeTrials:0,trialExpiring:0,trialExpired:0,foundingUsers:0,foundingUnpaid:0,foundingPaid:0,paidMembers:0,convertedDuringTrial:0},
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

export type AdminMemberFilter = "all" | "signed-up-today" | "just-signed-up" | "trial-active" | "trial-expiring" | "trial-expired" | "founding-users" | "founding-unpaid" | "founding-paid" | "paid-members" | "converted-during-trial";
export type AdminMemberSort = "newest" | "oldest" | "trial-ending-soon" | "recently-converted";
export type AdminMemberRow = {
  id:string; email:string; name:string|null; createdAt:string; trialStartedAt:string|null; trialEndsAt:string|null; trialRemaining:string; trialStatus:string; foundingEligible:boolean; foundingPriceLocked:boolean; foundingPriceCents:number|null; foundingCurrency:string|null; paymentStatus:string; paidAt:string|null; planCode:string|null; planLabel:string|null; provider:string|null; convertedDuringTrial:boolean; isNew:boolean;
};
export type ListAdminMembersResult = { rows:AdminMemberRow[]; total:number; page:number; pageSize:number; totalPages:number; isLive:boolean };

export async function listAdminMembers(options:{page?:number; pageSize?:number; query?:string; filter?:AdminMemberFilter; sort?:AdminMemberSort}={}):Promise<ListAdminMembersResult>{
  const page=Math.max(1,options.page??1); const pageSize=Math.min(10000,Math.max(1,options.pageSize??50));
  if(!isSupabaseClientConfigured()||!hasSupabaseServiceRole()) return {rows:[],total:0,page,pageSize,totalPages:0,isLive:false};
  const admin=createAdminClient(); const q=options.query?.trim()??"";
  let usersQuery=admin.from("users").select("id,email,name,created_at,last_login_at,trial_started_at,trial_ends_at,founding_eligible,founding_price_locked,founding_price_cents,founding_currency",{count:"exact"});
  if(q) usersQuery=usersQuery.or(`email.ilike.%${q}%,name.ilike.%${q}%`);
  const {data:usersData,error}=await usersQuery.order("created_at",{ascending:options.sort==="oldest"}).range(0,9999);
  if(error) { console.error("[admin members] query failed",error.message); return {rows:[],total:0,page,pageSize,totalPages:0,isLive:true}; }
  const userIds=(usersData??[]).map((u:any)=>u.id); const {data:subsData}=userIds.length?await admin.from("subscriptions").select("user_id,plan_code,status,provider,current_period_end,created_at").in("user_id",userIds).order("created_at",{ascending:false}):{data:[]};
  const subByUser=new Map<string,any>(); for(const s of (subsData??[])){if(!subByUser.has(s.user_id))subByUser.set(s.user_id,s);}
  const now=Date.now(); const rows=(usersData??[]).map((u:any)=>{const s=subByUser.get(u.id); const paid=Boolean(s&&subscriptionGrantsAccess({status:s.status,current_period_end:s.current_period_end,ends_at:null,cancel_at_period_end:false})); const trial=deriveTrialState({nowMs:now,trialEndsAt:u.trial_ends_at,foundingEligible:Boolean(u.founding_eligible),foundingPriceLocked:Boolean(u.founding_price_locked),paid}); const remaining=trial.trialRemainingMs>0?formatTrialRemaining(trial.trialRemainingMs):"Expired"; const paidAt=paid?s.created_at:null; const converted=Boolean(paidAt&&u.trial_ends_at&&Date.parse(paidAt)<Date.parse(u.trial_ends_at)); return {id:u.id,email:u.email,name:u.name??null,createdAt:u.created_at,trialStartedAt:u.trial_started_at??null,trialEndsAt:u.trial_ends_at??null,trialRemaining:remaining,trialStatus:trial.trialActive?(trial.trialExpiring?"expiring":"active"):(trial.trialExpired?"expired":"none"),foundingEligible:Boolean(u.founding_eligible),foundingPriceLocked:Boolean(u.founding_price_locked),foundingPriceCents:u.founding_price_cents??null,foundingCurrency:u.founding_currency??null,paymentStatus:paid?"paid":"unpaid",paidAt,planCode:s?.plan_code??null,planLabel:s?PLANS[s.plan_code as keyof typeof PLANS]?.label??s.plan_code:null,provider:s?.provider??null,convertedDuringTrial:converted,isNew:Date.parse(u.created_at)>=now-86400000};});
  const f=options.filter??"all"; const filtered=rows.filter((r:any)=>f==="all"||(f==="signed-up-today"||f==="just-signed-up"?r.isNew:f==="trial-active"?r.trialStatus==="active":f==="trial-expiring"?r.trialStatus==="expiring":f==="trial-expired"?r.trialStatus==="expired":f==="founding-users"?r.foundingEligible:f==="founding-unpaid"?r.foundingEligible&&r.paymentStatus==="unpaid":f==="founding-paid"?r.foundingEligible&&r.paymentStatus==="paid":f==="paid-members"?r.paymentStatus==="paid":f==="converted-during-trial"?r.convertedDuringTrial:false));
  filtered.sort((a:any,b:any)=>options.sort==="oldest"?Date.parse(a.createdAt)-Date.parse(b.createdAt):options.sort==="trial-ending-soon"?Date.parse(a.trialEndsAt??"9999")-Date.parse(b.trialEndsAt??"9999"):options.sort==="recently-converted"?Date.parse(b.paidAt??"1970")-Date.parse(a.paidAt??"1970"):Date.parse(b.createdAt)-Date.parse(a.createdAt));
  const total=filtered.length,totalPages=Math.max(1,Math.ceil(total/pageSize)),safePage=Math.min(page,totalPages),start=(safePage-1)*pageSize; return {rows:filtered.slice(start,start+pageSize),total,page:safePage,pageSize,totalPages,isLive:true};
}

export async function getAdminMemberMetrics(){ const result=await listAdminMembers({page:1,pageSize:10000}); const rows=result.rows; return {totalUsers:result.total,signedUpToday:rows.filter(r=>r.isNew).length,activeTrials:rows.filter(r=>r.trialStatus==="active").length,trialExpiring:rows.filter(r=>r.trialStatus==="expiring").length,trialExpired:rows.filter(r=>r.trialStatus==="expired").length,foundingUsers:rows.filter(r=>r.foundingEligible).length,foundingUnpaid:rows.filter(r=>r.foundingEligible&&r.paymentStatus==="unpaid").length,foundingPaid:rows.filter(r=>r.foundingEligible&&r.paymentStatus==="paid").length,paidMembers:rows.filter(r=>r.paymentStatus==="paid").length,convertedDuringTrial:rows.filter(r=>r.convertedDuringTrial).length}; }






