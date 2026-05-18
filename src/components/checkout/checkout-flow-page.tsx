import { CheckoutMeter } from "@/components/checkout/checkout-meter";
import { MotionDiv } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function CheckoutFlowPage({ children }: { children: ReactNode }) {
  return (
    <div className="basscally-checkout-page mx-auto max-w-[1180px] px-5 py-8 pb-12 lg:px-6 lg:py-10">
      {children}
    </div>
  );
}

export function CheckoutHeroGrid({ children }: { children: ReactNode }) {
  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
      {children}
    </section>
  );
}

export function CheckoutEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="checkout-eyebrow checkout-rise inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
      {children}
    </p>
  );
}

export function CheckoutHeadline({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <h1
      id={id}
      className="checkout-rise checkout-rise-delay-1 mt-3 max-w-[730px] font-[family-name:var(--font-display)] text-[clamp(48px,8vw,104px)] font-black leading-[0.9] tracking-[-0.052em]"
    >
      {children}
    </h1>
  );
}

export function CheckoutLede({ children }: { children: ReactNode }) {
  return (
    <p className="checkout-rise checkout-rise-delay-2 mt-5 max-w-[560px] text-[length:var(--text-body-lg)] leading-[1.55] text-[var(--color-text-muted)]">
      {children}
    </p>
  );
}

export function CheckoutCtaRow({ children }: { children: ReactNode }) {
  return (
    <div className="checkout-rise checkout-rise-delay-3 mt-6 flex flex-wrap gap-3 max-[680px]:flex-col">
      {children}
    </div>
  );
}

export function CheckoutFinePrint({ children }: { children: ReactNode }) {
  return (
    <p className="checkout-rise checkout-rise-delay-3 mt-4 text-sm text-[var(--color-text-dim)]">
      {children}
    </p>
  );
}

export function CheckoutPassCard({
  children,
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <aside
      aria-label={ariaLabel}
      className={cn(
        "checkout-rise checkout-rise-delay-2 basscally-panel-card relative overflow-hidden rounded-[var(--radius-xl)] border p-6 lg:p-8",
        className,
      )}
    >
      {children}
    </aside>
  );
}

export function CheckoutStepCards({
  items,
}: {
  items: { label: string; title: string; body: string }[];
}) {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-3" aria-label="Steps">
      {items.map((item, index) => (
        <MotionDiv
          key={item.label}
          delayMs={240 + index * 50}
          className="basscally-depth-card rounded-[var(--radius-lg)] p-5 transition-[transform,border-color] duration-[var(--motion-default)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)] motion-reduce:hover:translate-y-0"
        >
          <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-brand)]">
            {item.label}
          </span>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-black tracking-[-0.02em]">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-[1.55] text-[var(--color-text-muted)]">
            {item.body}
          </p>
        </MotionDiv>
      ))}
    </section>
  );
}

export function CheckoutControlRoom({
  items,
  "aria-label": ariaLabel,
}: {
  items: { title: string; body: string }[];
  "aria-label"?: string;
}) {
  return (
    <section
      className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <MotionDiv
          key={item.title}
          delayMs={300 + index * 50}
          className="min-h-[150px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[rgba(20,20,22,0.8)] p-5 transition-[transform,border-color] duration-[var(--motion-default)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] motion-reduce:hover:translate-y-0"
        >
          <h3 className="font-[family-name:var(--font-display)] text-xl font-black tracking-[-0.02em]">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-[1.55] text-[var(--color-text-muted)]">
            {item.body}
          </p>
          <CheckoutMeter />
        </MotionDiv>
      ))}
    </section>
  );
}

export function CheckoutStateGrid({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <section
      className="mt-8 grid gap-4 md:grid-cols-3"
      aria-label="Help"
    >
      {items.map((item, index) => (
        <MotionDiv
          key={item.title}
          delayMs={380 + index * 40}
          className="basscally-depth-card rounded-[var(--radius-lg)] p-4 opacity-95"
        >
          <strong className="block text-sm text-[var(--color-text)]">{item.title}</strong>
          <span className="mt-1 block text-[13px] leading-[1.45] text-[var(--color-text-muted)]">
            {item.body}
          </span>
        </MotionDiv>
      ))}
    </section>
  );
}

export function CheckoutFooterNote({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div className="checkout-rise checkout-rise-delay-5 mt-10 flex flex-col justify-between gap-4 border-t border-[var(--color-border)] pt-5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.04em] text-[var(--color-text-dim)] sm:flex-row">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}
