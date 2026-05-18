import type { ReactNode } from "react";
import { MarketingNav } from "@/components/marketing/marketing-nav";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="basscally-marketing flex min-h-full flex-col pb-20 lg:pb-0">
      <MarketingNav />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
