export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 block font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
      {"// "}
      {children}
    </span>
  );
}
