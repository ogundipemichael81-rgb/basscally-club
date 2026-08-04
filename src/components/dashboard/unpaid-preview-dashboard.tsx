import Link from "next/link";
import { ButtonLink } from "@/components/marketing/button-link";
import type { DashboardData } from "@/lib/dashboard/types";
import { routes } from "@/lib/routes";

/** A real unpaid state: the shell remains useful, but premium media is not authorised. */
export function UnpaidPreviewDashboard({ data }: { data: DashboardData }) {
  const preview = data.published.find((item) => item.isFreePreview) ?? null;
  return <div className="space-y-8">
    <section className="basscally-depth-card rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6 lg:p-10">
      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">Preview dashboard</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.04em] lg:text-5xl">Your practice room is ready.</h1>
      <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">Explore the library, try the free sample, then activate membership when you are ready for the complete practice room.</p>
      {preview ? <div className="mt-7 rounded-[var(--radius-lg)] border border-[rgba(255,69,0,0.3)] bg-[rgba(255,69,0,0.06)] p-5"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">Sample of the week · free preview</p><h2 className="mt-2 text-2xl font-bold">{preview.title}</h2><p className="mt-2 text-sm text-[var(--color-text-muted)]">{preview.typeLabel}{preview.difficulty ? ` · ${preview.difficulty}` : ""}</p><ButtonLink className="mt-5" href={routes.member.content(preview.id)}>Play free sample</ButtonLink></div> : <div className="mt-7 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] p-5"><p className="font-semibold">Sample preview is being prepared.</p><p className="mt-2 text-sm text-[var(--color-text-muted)]">An administrator can designate one Basscally-owned published track as the free preview. Premium audio is not exposed in the meantime.</p></div>}
      <ButtonLink className="mt-7" href={routes.pricing}>Choose a plan</ButtonLink>
    </section>
    <section><div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-wider text-[var(--color-text-dim)]">Library preview</p><h2 className="mt-1 text-2xl font-bold">What is waiting inside</h2></div><Link href={routes.pricing} className="text-sm font-semibold text-[var(--color-brand)]">Activate membership</Link></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.published.map((item) => <article key={item.id} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><p className="text-xs uppercase tracking-wider text-[var(--color-text-dim)]">{item.isFreePreview ? "Free preview" : "Member content"}</p><h3 className="mt-2 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.typeLabel}{item.difficulty ? ` · ${item.difficulty}` : ""}</p>{item.isFreePreview ? <Link className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand)]" href={routes.member.content(item.id)}>Open sample</Link> : <Link className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand)]" href={routes.member.content(item.id)}>Locked · activate membership</Link>}</article>)}</div></section>
  </div>;
}
