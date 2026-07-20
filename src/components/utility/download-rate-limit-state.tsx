import { DOWNLOAD_RATE_LIMIT_PER_HOUR } from "@/lib/constants";

type Props = {
  message?: string;
  className?: string;
};

/** Screen 30 — informational only; no retry button. */
export function DownloadRateLimitState({ message, className }: Props) {
  return (
    <div
      className={className}
      role="alert"
      aria-live="polite"
    >
      <div className="rounded-[var(--radius-lg)] border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.08)] p-5">
        <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-warning)]">
          Download blocked
        </p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {message ??
            `You hit the hourly download limit (${DOWNLOAD_RATE_LIMIT_PER_HOUR}/hour). Stream this drop or try again later.`}
        </p>
        <p className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">
          Try again later — no action needed right now
        </p>
      </div>
    </div>
  );
}
