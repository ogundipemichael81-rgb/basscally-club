import { MarketingNav } from "@/components/marketing/marketing-nav";
import { routes } from "@/lib/routes";
import type { ReactNode } from "react";

export default function CallbackLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingNav
        hideGhostOnMobile={false}
        ghostHref={routes.auth.login}
        ghostLabel="Back to sign in"
        primaryHref={routes.home}
        primaryLabel="Home"
      />
      {children}
    </div>
  );
}
