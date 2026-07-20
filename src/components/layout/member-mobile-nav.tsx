"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

const ITEMS = [
  {
    id: "mobile-home",
    href: routes.member.dashboard,
    label: "Home",
    match: (pathname: string, filter: string | null) =>
      pathname === routes.member.dashboard && !filter,
  },
  {
    id: "mobile-library",
    href: `${routes.member.dashboard}?filter=all#library`,
    label: "Library",
    match: (_pathname: string, filter: string | null) =>
      filter === "all" ||
      filter === "bassless" ||
      filter === "grooves" ||
      filter === "fills" ||
      filter === "challenges",
  },
  {
    id: "mobile-files",
    href: `${routes.member.dashboard}?filter=downloaded#library`,
    label: "Files",
    match: (_pathname: string, filter: string | null) => filter === "downloaded",
  },
  {
    id: "mobile-you",
    href: routes.member.account,
    label: "You",
    match: (pathname: string) => pathname.startsWith("/account"),
  },
] as const;

function NavIcon({ id }: { id: string }) {
  if (id === "mobile-home") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 13h8V3H3v10Z" />
        <path d="M13 21h8V11h-8v10Z" />
        <path d="M13 3v6h8V3h-8Z" />
        <path d="M3 21h8v-6H3v6Z" />
      </svg>
    );
  }
  if (id === "mobile-library") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M4 19.5V6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5" />
        <path d="M8 8h8" />
        <path d="M8 12h6" />
      </svg>
    );
  }
  if (id === "mobile-files") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function MemberMobileNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  return (
    <nav
      className="member-mobile-nav mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[rgba(10,10,11,0.96)] px-2 py-2 backdrop-blur-sm lg:hidden"
      aria-label="Mobile bottom nav"
    >
      <ul className="grid grid-cols-4 gap-1">
        {ITEMS.map((item) => {
          const active = item.match(pathname, filter);
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] px-1 text-[10px] font-semibold",
                  active
                    ? "text-[var(--color-brand)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="h-5 w-5 [&_svg]:h-full [&_svg]:w-full">
                  <NavIcon id={item.id} />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
