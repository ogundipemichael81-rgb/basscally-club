import { Suspense } from "react";
import { redirect } from "next/navigation";
import { DashboardPageView } from "@/components/dashboard/dashboard-page-view";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { getDashboardData } from "@/lib/dashboard/queries";
import { parseDashboardFilter } from "@/lib/dashboard/filters";
import { getMemberSession } from "@/lib/subscriptions/member-session";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";
export const metadata: Metadata={title:"Dashboard",description:"Your practice room and published Basscally drops."};export const dynamic="force-dynamic";export const revalidate=0;
type Props={searchParams:Promise<Record<string,string|string[]|undefined>>};
async function DashboardContent({searchParams}:{searchParams:Record<string,string|string[]|undefined>}){const session=await getMemberSession();if(!session)redirect(routes.auth.login);const value=Array.isArray(searchParams.filter)?searchParams.filter[0]:searchParams.filter;const data=await getDashboardData(session.userId);return <DashboardPageView session={session} data={data} filter={parseDashboardFilter(value)} isOverview={!value}/>}
export default async function DashboardPage({searchParams}:Props){return <Suspense fallback={<DashboardSkeleton/>}><DashboardContent searchParams={await searchParams}/></Suspense>}