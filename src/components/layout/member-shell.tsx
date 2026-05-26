import type { ReactNode } from "react";
import { SidebarShell, type SidebarNavItem } from "@/components/layout/sidebar-shell";
import { routes } from "@/lib/routes";

const memberNav: SidebarNavItem[] = [
  { href: routes.member.dashboard, label: "Dashboard" },
  { href: routes.member.account, label: "Membership" },
  { href: routes.member.accountBilling, label: "Billing" },
];

export function MemberShell({ children }: { children: ReactNode }) {
  return (
    <SidebarShell navItems={memberNav} brand="Basscally Hub">
      {children}
    </SidebarShell>
  );
}
