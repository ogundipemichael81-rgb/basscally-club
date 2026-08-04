"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MIN_PASSWORD_LENGTH = 12;

export function AccountSecurityView() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    if (password.length < MIN_PASSWORD_LENGTH) {
      setState("error");
      setMessage(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmation) {
      setState("error");
      setMessage("Your new passwords do not match.");
      return;
    }
    setState("saving");
    setMessage("");
    const { error } = await createClient().auth.updateUser({ password });
    if (error) {
      setState("error");
      setMessage("We could not update your password. Sign in again and try once more.");
      return;
    }
    setPassword("");
    setConfirmation("");
    setState("success");
    setMessage("Password updated. Your current session remains signed in on this device.");
  }

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 px-5 py-10 sm:py-14">
      <header>
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">Account security</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em]">Keep your account secure.</h1>
        <p className="mt-3 max-w-xl text-[var(--color-text-muted)]">Change your password whenever you need to. Basscally never stores your password.</p>
      </header>
      <section className="basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">Change password</h2>
        <form className="mt-6 space-y-4" onSubmit={changePassword}>
          <div className="relative">
            <Input id="new-password" label="New password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={MIN_PASSWORD_LENGTH} required value={password} onChange={(event) => { setPassword(event.target.value); if (state !== "idle") setState("idle"); }} />
            <button type="button" className="absolute right-3 top-9 min-h-11 px-2 text-sm text-[var(--color-text-muted)] underline" aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button>
          </div>
          <Input id="confirm-new-password" label="Confirm new password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={MIN_PASSWORD_LENGTH} required value={confirmation} onChange={(event) => { setConfirmation(event.target.value); if (state !== "idle") setState("idle"); }} />
          <p className="text-sm text-[var(--color-text-muted)]">Use at least 12 characters. Choose something you do not use elsewhere.</p>
          {message ? <p role={state === "error" ? "alert" : "status"} className={state === "error" ? "text-sm text-[var(--color-danger)]" : "text-sm text-emerald-400"}>{message}</p> : null}
          <Button type="submit" className="w-full sm:w-auto" disabled={state === "saving"}>{state === "saving" ? "Updating password…" : "Update password"}</Button>
        </form>
      </section>
    </main>
  );
}
