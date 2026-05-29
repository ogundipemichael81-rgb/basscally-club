export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8 pb-24 lg:pb-6" aria-busy="true" aria-label="Loading dashboard">
      <div className="space-y-3">
        <div className="h-3 w-32 rounded bg-[var(--color-surface-raised)]" />
        <div className="h-10 w-2/3 max-w-md rounded bg-[var(--color-surface-raised)]" />
        <div className="h-4 w-full max-w-lg rounded bg-[var(--color-surface-raised)]" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <div className="h-72 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-20 rounded-[var(--radius-full)] bg-[var(--color-surface-raised)]"
              />
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]"
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-48 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
          <div className="h-40 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
        </div>
      </div>
    </div>
  );
}
