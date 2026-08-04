"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState<string>();
  async function submit(event: React.FormEvent) {
    event.preventDefault(); const normalized = email.trim().toLowerCase();
    if (!normalized.includes("@")) { setError("Enter a valid email address."); return; }
    setLoading(true); setError(undefined);
    try { await createClient().auth.resetPasswordForEmail(normalized, { redirectTo: `${window.location.origin}/auth/callback?type=recovery` }); setDone(true); }
    catch { setError("We could not start recovery. Please try again shortly."); }
    finally { setLoading(false); }
  }
  if (done) return <div className="relative z-[1] w-full max-w-[400px] text-center"><h1 className="mb-3 text-2xl font-bold">Check your email</h1><p className="text-sm text-[var(--color-text-muted)]">If an account exists for that address, recovery instructions will be sent.</p><Link href="/auth/login" className="mt-6 inline-flex min-h-11 items-center text-[var(--color-brand)] underline">Return to sign in</Link></div>;
  return <div className="relative z-[1] w-full max-w-[400px]"><h1 className="mb-3 text-2xl font-bold">Reset your password</h1><p className="mb-6 text-sm text-[var(--color-text-muted)]">Enter your email and we’ll send secure recovery instructions.</p><form onSubmit={submit} className="space-y-4"><Input label="Email address" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/>{error?<p role="alert" className="text-sm text-[var(--color-danger)]">{error}</p>:null}<Button type="submit" className="w-full" disabled={loading}>{loading?"Sending…":"Send recovery email"}</Button></form><Link href="/auth/login" className="mt-5 inline-flex min-h-11 items-center text-sm text-[var(--color-brand)] underline">Back to sign in</Link></div>;
}
