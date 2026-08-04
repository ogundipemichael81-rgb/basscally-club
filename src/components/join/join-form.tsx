"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function JoinForm({ plan }: { plan?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (password !== confirm) { setError("Passwords must match."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/join/create-account", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, plan }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      const { error: signInError } = await createClient().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
      if (signInError) throw new Error("Your account was created. Sign in to continue.");
      router.replace(plan ? `/checkout?plan=${encodeURIComponent(plan)}` : "/dashboard?welcome=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account.");
      setLoading(false);
    }
  }

  return <form onSubmit={submit} className="space-y-4">
    <label className="block text-sm">Email address<input className="mt-2 w-full rounded border p-3 text-base text-black" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
    <label className="block text-sm">Password<div className="flex gap-2"><input className="mt-2 w-full rounded border p-3 text-base text-black" type={show ? "text" : "password"} autoComplete="new-password" minLength={12} required value={password} onChange={(event) => setPassword(event.target.value)} /><button className="mt-2 min-h-11 px-3" type="button" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button></div></label>
    <label className="block text-sm">Confirm password<input className="mt-2 w-full rounded border p-3 text-base text-black" type={show ? "text" : "password"} autoComplete="new-password" minLength={12} required value={confirm} onChange={(event) => setConfirm(event.target.value)} /></label>
    <p className="text-sm text-[var(--color-text-muted)]">Use at least 12 characters. This email becomes your login and receipt email; check it carefully before payment.</p>
    {error ? <p role="alert" className="text-sm text-red-400">{error}</p> : null}
    <button className="min-h-11 w-full rounded bg-[var(--color-brand)] px-4 py-3 font-bold text-black disabled:opacity-60" disabled={loading}>{loading ? "Creating account…" : plan ? "Create account and continue to payment" : "Create account"}</button>
  </form>;
}
