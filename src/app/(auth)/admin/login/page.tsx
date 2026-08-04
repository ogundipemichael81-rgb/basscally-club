import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <main className="mx-auto flex min-h-screen max-w-lg items-center px-5 py-12"><section className="w-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"><p className="text-xs uppercase tracking-wider text-[var(--color-brand)]">Basscally Hub administration</p><h1 className="mt-3 text-3xl font-black">Admin sign in</h1><p className="mt-3 text-[var(--color-text-muted)]">Use your administrator account. Member accounts cannot access this area.</p><div className="mt-7"><AdminLoginForm next={next} /></div></section></main>;
}
