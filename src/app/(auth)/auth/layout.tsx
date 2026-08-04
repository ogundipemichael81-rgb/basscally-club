import Link from "next/link";
import type { ReactNode } from "react";
import { AuthBackLink } from "@/components/auth/auth-back-link";
import { routes } from "@/lib/routes";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-page-shell min-h-[100svh] overflow-x-hidden">
      <AuthBackLink />
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </main>
      <footer className="relative z-[1] mt-auto pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
        <Link href={routes.home} className="inline-flex min-h-11 items-center hover:text-[var(--color-text-muted)]">Basscally Hub</Link>
        <span aria-hidden> · </span>
        <Link href={routes.legal.privacy} className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-[var(--color-text-muted)]">Privacy</Link>
        <span aria-hidden> · </span>
        <Link href={routes.legal.terms} className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-[var(--color-text-muted)]">Terms</Link>
      </footer>
    </div>
  );
}
