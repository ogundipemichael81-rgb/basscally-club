"use client";
import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/marketing/brand-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!normalized.includes("@") || password.length < 10 || password !== confirm) { setError("Use a valid email, a password of at least 10 characters, and matching passwords."); return; }
    setLoading(true); setError(undefined);
    try {
      const { data, error: authError } = await createClient().auth.signUp({ email: normalized, password });
      if (authError) { setError("This account may already be registered. Try signing in or reset your password."); return; }
      if (data.session) window.location.assign("/auth/continue"); else setDone(true);
    } catch { setError("We could not create this account. Please try again."); }
    finally { setLoading(false); }
  }
  if (done) return <div className="relative z-[1] w-full max-w-[400px] text-center"><BrandMark size="lg" className="mx-auto mb-6"/><h1 className="mb-3 text-2xl font-bold">Check your email</h1><p className="text-[var(--color-text-muted)]">Use the secure confirmation link to finish creating your account, then sign in with your password.</p><Link href="/auth/login?accountCreated=1" className="mt-6 inline-flex min-h-11 items-center text-[var(--color-brand)] underline">Return to sign in</Link></div>;
  return <div className="relative z-[1] w-full max-w-[400px]"><BrandMark size="lg" className="mx-auto mb-6"/><h1 className="mb-3 text-center text-2xl font-bold">Create your Basscally Hub account</h1><p className="mb-8 text-center text-sm text-[var(--color-text-muted)]">Create an account to continue. A subscription is still required for member content.</p><form onSubmit={submit} className="space-y-4"><Input label="Email address" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/><Input label="Password (at least 10 characters)" type="password" autoComplete="new-password" required value={password} onChange={e=>setPassword(e.target.value)}/><Input label="Confirm password" type="password" autoComplete="new-password" required value={confirm} onChange={e=>setConfirm(e.target.value)}/>{error?<p role="alert" className="text-sm text-[var(--color-danger)]">{error}</p>:null}<Button type="submit" className="w-full" disabled={loading}>{loading?"Creating account…":"Create account"}</Button></form><p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">Already registered? <Link href="/auth/login" className="text-[var(--color-brand)] underline">Sign in</Link></p></div>;
}
