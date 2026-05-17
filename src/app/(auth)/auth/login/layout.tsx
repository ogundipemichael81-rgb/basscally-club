import Link from "next/link";
import { AuthBackLink } from "@/components/auth/auth-back-link";
import { routes } from "@/lib/routes";
import type { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-page-shell">
      <AuthBackLink />
      {children}
      <footer className="relative z-[1] mt-10 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
        <Link href={routes.home} className="hover:text-[var(--color-text-muted)]">
          Basscally Club
        </Link>
        {" · "}
        <span>Privacy</span>
        {" · "}
        <span>Terms</span>
      </footer>
    </div>
  );
}
