import type { ReactNode } from "react";

/** Cinematic checkout pages — grid background via globals. */
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <div className="basscally-checkout-shell">{children}</div>;
}
