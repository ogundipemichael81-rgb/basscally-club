import type { ReactNode } from "react";
import { MarketingNav } from "@/components/marketing/marketing-nav";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col pb-20 lg:pb-0">
      <MarketingNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
