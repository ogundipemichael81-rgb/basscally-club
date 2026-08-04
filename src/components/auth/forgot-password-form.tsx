"use client";
import Link from "next/link";

export function ForgotPasswordForm() {
  return <div className="relative z-[1] w-full max-w-[400px] text-center"><h1 className="mb-3 text-2xl font-bold">Password recovery is temporarily unavailable</h1><p className="text-sm leading-relaxed text-[var(--color-text-muted)]">For safety, recovery is paused while we complete a server-only reset flow. Please contact Basscally support for account help.</p><a href="mailto:basscally.enquiry@gmail.com?subject=Basscally%20password%20recovery" className="mt-6 inline-flex min-h-11 items-center text-[var(--color-brand)] underline">Contact support</a><Link href="/auth/login" className="mt-3 inline-flex min-h-11 items-center text-[var(--color-text-muted)] underline">Return to sign in</Link></div>;
}
