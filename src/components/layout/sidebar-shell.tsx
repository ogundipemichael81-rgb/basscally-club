import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SidebarNavItem = {
  href: string;
  label: string;
};

export function SidebarShell({
  children,
  navItems,
  brand = "Basscally",
  className,
}: {
  children: ReactNode;
  navItems: SidebarNavItem[];
  brand?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row", className)}>
      <aside className="min-w-0 max-w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface-sunken)] lg:w-64 lg:border-b-0 lg:border-r">
        <div className="p-6">
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text)]">
            {brand}
          </p>
        </div>
        <nav className="flex min-w-0 flex-col gap-1 px-4 pb-4 lg:px-2 lg:pb-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 w-full min-w-0 items-center rounded-[var(--radius-md)] px-4 py-3 text-[length:var(--text-body-sm)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 lg:p-6">{children}</main>
    </div>
  );
}
