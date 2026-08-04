"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/marketing/brand-mark";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter(); const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState(""); const [error,setError]=useState<string>(); const [loading,setLoading]=useState(false); const [ready,setReady]=useState<boolean | null>(null);
  useEffect(() => { createClient().auth.getSession().then(({data}) => setReady(Boolean(data.session))).catch(() => setReady(false)); }, []);
  async function submit(event: React.FormEvent) { event.preventDefault(); if(password.length<10||password!==confirm){setError("Use at least 10 characters and make both passwords match.");return;} setLoading(true);setError(undefined);try{const {error:authError}=await createClient().auth.updateUser({password});if(authError)throw authError;await createClient().auth.signOut({scope:"local"});router.replace("/auth/login?passwordUpdated=1");}catch{setError("This recovery session has expired or is invalid. Request a new password-reset link.");}finally{setLoading(false);} }
  if(ready===null)return <div className="relative z-[1] w-full max-w-[400px] text-center"><BrandMark size="lg" className="mx-auto mb-6"/><p className="text-sm text-[var(--color-text-muted)]">Checking your recovery session…</p></div>;
  if(!ready)return <div className="relative z-[1] w-full max-w-[400px] text-center"><BrandMark size="lg" className="mx-auto mb-6"/><h1 className="mb-3 text-2xl font-bold">Recovery link unavailable</h1><p className="text-sm text-[var(--color-text-muted)]">This recovery session has expired or is invalid. Request a new password-reset link.</p><a href="/auth/forgot-password" className="mt-6 inline-flex min-h-11 items-center text-[var(--color-brand)] underline">Request a new link</a></div>;
  return <div className="relative z-[1] w-full max-w-[400px]"><BrandMark size="lg" className="mx-auto mb-6"/><h1 className="mb-3 text-2xl font-bold">Choose a new password</h1><p className="mb-6 text-sm text-[var(--color-text-muted)]">Use at least 10 characters. Your password is stored securely by Supabase.</p><form onSubmit={submit} className="space-y-4"><Input label="New password" type="password" autoComplete="new-password" required value={password} onChange={e=>setPassword(e.target.value)}/><Input label="Confirm password" type="password" autoComplete="new-password" required value={confirm} onChange={e=>setConfirm(e.target.value)}/>{error?<p role="alert" className="text-sm text-[var(--color-danger)]">{error}</p>:null}<Button type="submit" className="w-full" disabled={loading}>{loading?"Updating…":"Update password"}</Button></form><a href="/auth/cancel-recovery" className="mt-5 inline-flex min-h-11 items-center text-sm text-[var(--color-text-muted)] underline">Cancel password recovery</a></div>;
}
