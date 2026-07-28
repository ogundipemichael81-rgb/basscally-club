import { Suspense, type ReactNode } from "react";
import { MemberMobileNav } from "@/components/layout/member-mobile-nav";
import { MemberSidebarNav } from "@/components/layout/member-sidebar-nav";
import { cn } from "@/lib/utils";

export function MemberShell({
  children,
  brand = "Basscally Hub",
  className,
}: {
  children: ReactNode;
  brand?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row", className)}>
      <Suspense fallback={null}>
        <MemberSidebarNav brand={brand} />
      </Suspense>
      <main className="min-w-0 flex-1 p-4 pb-24 lg:p-6 lg:pb-6">{children}</main>
      <Suspense fallback={null}>
        <MemberMobileNav />
      </Suspense>
    </div>
  );
}
