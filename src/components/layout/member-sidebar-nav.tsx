"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

type NavItem = {
  href: string;
  label: string;
  filter?: string;
  prefixMatch?: string;
};

const PRIMARY_NAV: NavItem[] = [
  { href: routes.member.dashboard, label: "Dashboard" },
  { href: `${routes.member.dashboard}?filter=all`, label: "All Drops", filter: "all" },
  { href: `${routes.member.dashboard}?filter=bassless`, label: "Bass-less", filter: "bassless" },
  { href: `${routes.member.dashboard}?filter=grooves`, label: "Grooves", filter: "grooves" },
  { href: `${routes.member.dashboard}?filter=fills`, label: "Fills", filter: "fills" },
  { href: `${routes.member.dashboard}?filter=challenges`, label: "Challenges", filter: "challenges" },
];

const ACCOUNT_NAV: NavItem[] = [
  { href: routes.member.account, label: "Membership", prefixMatch: "/account" },
  { href: routes.member.accountSecurity, label: "Security" },
];

function isActive(pathname: string, filter: string | null, item: NavItem): boolean {
  if (item.prefixMatch) {
    return pathname.startsWith(item.prefixMatch);
  }

  if (pathname !== routes.member.dashboard) {
    return false;
  }

  if (!item.filter) {
    return !filter || filter === "all";
  }

  return filter === item.filter;
}

export function MemberSidebarNav({ brand }: { brand: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  return (
    <>
      <aside className="min-w-0 max-w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface-sunken)] lg:w-64 lg:border-b-0 lg:border-r">
        <div className="p-6">
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text)]">
            {brand}
          </p>
        </div>
        <nav className="flex min-w-0 flex-col gap-1 px-4 pb-4 lg:px-2" aria-label="Member navigation">
          <p className="px-4 pb-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-dim)] lg:px-3">
            Library
          </p>
          {PRIMARY_NAV.map((item) => {
            const active = isActive(pathname, filter, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 w-full min-w-0 items-center rounded-[var(--radius-md)] px-4 py-3 text-[length:var(--text-body-sm)] transition-colors lg:px-3",
                  active
                    ? "bg-[var(--color-surface)] text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          <p className="mt-4 px-4 pb-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-dim)] lg:px-3">
            Account
          </p>
          {ACCOUNT_NAV.map((item) => {
            const active = isActive(pathname, filter, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 w-full min-w-0 items-center rounded-[var(--radius-md)] px-4 py-3 text-[length:var(--text-body-sm)] transition-colors lg:px-3",
                  active
                    ? "bg-[var(--color-surface)] text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <SignOutButton />
        </nav>
      </aside>
    </>
  );
}
