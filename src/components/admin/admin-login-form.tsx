"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const check = await fetch("/api/admin/session-check", { cache: "no-store" });
      if (check.ok) { router.replace("/admin"); return; }
      await supabase.auth.signOut({ scope: "local" });
      if (active) setError("This account is not authorised for administration.");
    });
    return () => { active = false; };
  }, [router]);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    if (authError) { setError("Email or password is incorrect."); setLoading(false); return; }
    const check = await fetch("/api/admin/session-check", { cache: "no-store" });
    if (!check.ok) { await supabase.auth.signOut({ scope: "local" }); setError("This account is not authorised for administration."); setLoading(false); return; }
    router.replace(next?.startsWith("/admin") && !next.startsWith("//") ? next : "/admin"); router.refresh();
  }
  return <form onSubmit={submit} className="space-y-4"><label className="block text-sm">Email<input className="mt-2 w-full rounded border p-3 text-base text-black" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="block text-sm">Password<input className="mt-2 w-full rounded border p-3 text-base text-black" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error ? <p role="alert" className="text-sm text-red-400">{error}</p> : null}<button disabled={loading} className="min-h-11 w-full rounded bg-[var(--color-brand)] px-4 py-3 font-bold text-black">{loading ? "Checking access…" : "Sign in to admin"}</button></form>;
}
