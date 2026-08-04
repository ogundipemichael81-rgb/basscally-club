"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false); const [codeMode, setCodeMode] = useState(false); const [code, setCode] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState<string>();
  async function submit(event: React.FormEvent) {
    event.preventDefault(); const normalized = email.trim().toLowerCase();
    if (!normalized.includes("@")) { setError("Enter a valid email address."); return; }
    setLoading(true); setError(undefined);
    try { const { error: authError } = await createClient().auth.resetPasswordForEmail(normalized, { redirectTo: `${window.location.origin}/auth/callback?type=recovery` }); if (authError) throw authError; setCodeMode(true); }
    catch { setError("We could not start recovery. Please try again shortly."); }
    finally { setLoading(false); }
  }
  if (done) return <div className="relative z-[1] w-full max-w-[400px] text-center"><h1 className="mb-3 text-2xl font-bold">Recovery started</h1><p className="text-sm text-[var(--color-text-muted)]">Continue with the code or secure link sent to your email.</p><Link href="/auth/login" className="mt-6 inline-flex min-h-11 items-center text-[var(--color-brand)] underline">Return to sign in</Link></div>;
  if (codeMode) return <div className="relative z-[1] w-full max-w-[400px]"><h1 className="mb-3 text-2xl font-bold">Enter your recovery code</h1><p className="mb-6 text-sm text-[var(--color-text-muted)]">Enter the six-digit code in this browser.</p><form onSubmit={async e=>{e.preventDefault();if(!/^\d{6}$/.test(code)){setError("Enter the six-digit code.");return;}setLoading(true);try{const {data,error:verifyError}=await createClient().auth.verifyOtp({email:email.trim().toLowerCase(),token:code,type:"recovery"});if(verifyError||!data.session)throw verifyError??new Error("No session");window.location.assign("/auth/reset-password");}catch{setError("That code is invalid or expired. Request a new one.");}finally{setLoading(false);}}} className="space-y-4"><Input label="Six-digit code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,"").slice(0,6))}/>{error?<p role="alert" className="text-sm text-[var(--color-danger)]">{error}</p>:null}<Button type="submit" className="w-full" disabled={loading}>{loading?"Verifying…":"Verify code"}</Button></form></div>;
  return <div className="relative z-[1] w-full max-w-[400px]"><h1 className="mb-3 text-2xl font-bold">Reset your password</h1><p className="mb-6 text-sm text-[var(--color-text-muted)]">Enter your email and we’ll send secure recovery instructions.</p><form onSubmit={submit} className="space-y-4"><Input label="Email address" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/>{error?<p role="alert" className="text-sm text-[var(--color-danger)]">{error}</p>:null}<Button type="submit" className="w-full" disabled={loading}>{loading?"Sending…":"Send recovery email"}</Button></form><Link href="/auth/login" className="mt-5 inline-flex min-h-11 items-center text-sm text-[var(--color-brand)] underline">Back to sign in</Link></div>;
}
