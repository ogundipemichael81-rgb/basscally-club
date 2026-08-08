"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void supabase.auth.getUser().then(async ({ data: { user }, error: authError }) => {
      if (authError) console.warn("[admin-login] existing session check failed", authError.message);
      if (!user) return;
      const check = await fetch("/api/admin/session-check", { cache: "no-store" });
      if (check.ok) { router.replace("/admin"); return; }
      await supabase.auth.signOut({ scope: "local" });
      if (active) setError("This account is not authorised for administration.");
    });
    return () => { active = false; };
  }, [router]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    if (authError) {
      console.warn("[admin-login] password authentication failed", { code: authError.code, status: authError.status });
      setError("Email or password is incorrect.");
      setLoading(false);
      return;
    }
    const check = await fetch("/api/admin/session-check", { cache: "no-store" });
    if (!check.ok) {
      console.warn("[admin-login] authenticated user failed admin authorization", { status: check.status });
      await supabase.auth.signOut({ scope: "local" });
      setError("This account is not authorised for administration.");
      setLoading(false);
      return;
    }
    router.replace(next?.startsWith("/admin") && !next.startsWith("//") ? next : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <Input label="Email" id="admin-email" name="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
      <div className="relative">
        <Input label="Password" id="admin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        <button type="button" className="absolute right-3 top-9 min-h-11 px-2 text-sm text-[var(--color-text-muted)] underline" aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button>
      </div>
      {error ? <p role="alert" className="text-sm text-[var(--color-danger)]">{error}</p> : null}
      <Button type="submit" disabled={loading} className="w-full">{loading ? "Checking access…" : "Sign in to admin"}</Button>
    </form>
  );
}