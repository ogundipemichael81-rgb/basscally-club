"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DASHBOARD_FILTER_TABS,
  type DashboardFilter,
  parseDashboardFilter,
} from "@/lib/dashboard/filters";
import { cn } from "@/lib/utils";

export function DashboardFilterTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = parseDashboardFilter(searchParams.get("filter") ?? undefined);

  const hrefFor = (filter: DashboardFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    const query = params.toString();
    return query ? `${pathname}?${query}#library` : `${pathname}#library`;
  };

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Filter content type"
    >
      {DASHBOARD_FILTER_TABS.map((tab) => {
        const selected = active === tab.id;
        return (
          <Link
            key={tab.id}
            href={hrefFor(tab.id)}
            role="tab"
            aria-selected={selected}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-full)] border px-4 text-sm font-semibold transition-colors",
              selected
                ? "border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] text-[var(--color-text)]"
                : "border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
