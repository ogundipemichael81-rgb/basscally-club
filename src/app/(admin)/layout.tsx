import type { ReactNode } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminPage } from "@/lib/admin/auth";
export const dynamic="force-dynamic";
export const revalidate=0;
export default async function AdminLayout({children}:{children:ReactNode}){await requireAdminPage(); return <AdminShell>{children}</AdminShell>;}