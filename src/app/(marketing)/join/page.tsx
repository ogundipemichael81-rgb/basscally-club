import Link from "next/link";
import { redirect } from "next/navigation";
import { JoinForm } from "@/components/join/join-form";
import { getMemberSession } from "@/lib/subscriptions/member-session";

const validPlans = new Set(["founding-monthly", "standard-monthly", "annual"]);

export default async function JoinPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  if (plan && !validPlans.has(plan)) redirect("/pricing");
  const session = await getMemberSession();
  if (session) redirect(plan ? `/checkout?plan=${encodeURIComponent(plan)}` : "/dashboard");
  const next = plan ? `/checkout?plan=${encodeURIComponent(plan)}` : "/dashboard";
  return <main className="mx-auto flex min-h-screen max-w-lg items-center px-5 py-12"><section className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"><p className="text-sm text-[var(--color-brand)]">BASSCALLY HUB</p><h1 className="mt-3 text-3xl font-black">Create your Basscally Hub account</h1><p className="mt-3 text-[var(--color-text-muted)]">Your Basscally account comes first. Payment is completed securely in the next step.</p><div className="mt-7"><JoinForm plan={plan} /></div><p className="mt-5 text-sm text-[var(--color-text-muted)]">Already have an account? <Link className="text-[var(--color-brand)] underline" href={`/auth/login?next=${encodeURIComponent(next)}`}>Sign in to continue</Link></p></section></main>;
}
