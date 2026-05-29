type Props = {
  values: number[];
  variant?: "brand" | "danger";
};

export function AdminMetricSparkline({ values, variant = "brand" }: Props) {
  return (
    <div
      className="mt-5 grid h-[42px] grid-cols-12 items-end gap-1"
      aria-hidden
    >
      {values.map((height, index) => (
        <span
          key={`spark-${index}`}
          className={
            variant === "danger" && height > 70
              ? "rounded-t-sm bg-[var(--color-danger)]"
              : height > 55
                ? "rounded-t-sm bg-[var(--color-brand)] shadow-[0_0_16px_rgba(255,69,0,0.18)]"
                : "rounded-t-sm bg-[rgba(255,255,255,0.08)]"
          }
          style={{ height: `${Math.max(12, height)}%` }}
        />
      ))}
    </div>
  );
}
