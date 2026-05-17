import type { ReactNode } from "react";
import { SidebarShell, type SidebarNavItem } from "@/components/layout/sidebar-shell";
import { routes } from "@/lib/routes";

const adminNav: SidebarNavItem[] = [
  { href: routes.admin.root, label: "Metrics" },
  { href: routes.admin.content, label: "Content" },
  { href: routes.admin.contentNew, label: "Upload" },
  { href: routes.admin.subscribers, label: "Subscribers" },
  { href: routes.admin.emailLogs, label: "Email logs" },
  { href: routes.admin.emailTemplates, label: "Templates" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <SidebarShell navItems={adminNav} brand="Basscally Admin">
      {children}
    </SidebarShell>
  );
}
