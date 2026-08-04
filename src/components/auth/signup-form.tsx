"use client";
import Link from "next/link";

export function SignupForm() {
  return <div className="relative z-[1] w-full max-w-[400px] text-center"><h1 className="mb-3 text-2xl font-bold">Account creation follows checkout</h1><p className="text-sm leading-relaxed text-[var(--color-text-muted)]">Basscally Hub is a paid membership. Public account creation is paused until the secure checkout-claim process is complete.</p><Link href="/pricing" className="mt-6 inline-flex min-h-11 items-center text-[var(--color-brand)] underline">View membership options</Link><Link href="/auth/login" className="mt-3 inline-flex min-h-11 items-center text-[var(--color-text-muted)] underline">Already a member? Sign in</Link></div>;
}
