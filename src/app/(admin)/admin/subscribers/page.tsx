import { AdminSubscribersList } from "@/components/admin/admin-subscribers-list";
import { listAdminMembers, type AdminMemberFilter, type AdminMemberSort } from "@/lib/admin/metrics/queries";
import type { Metadata } from "next";
export const metadata: Metadata={title:"Members — Basscally Admin",description:"Founding trial member control room."};
type Props={searchParams:Promise<Record<string,string|string[]|undefined>>};
export default async function AdminSubscribersPage({searchParams}:Props){const p=await searchParams; const q=typeof p.q==='string'?p.q:""; const filter=(typeof p.filter==='string'?p.filter:"all") as AdminMemberFilter; const sort=(typeof p.sort==='string'?p.sort:"newest") as AdminMemberSort; const page=Number.parseInt(typeof p.page==='string'?p.page:"1",10)||1; const data=await listAdminMembers({query:q,filter,sort,page,pageSize:50}); return <AdminSubscribersList data={data} query={q} filter={filter} sort={sort}/>;}

