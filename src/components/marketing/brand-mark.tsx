import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-7 w-7 rounded-[7px] text-sm",
    md: "h-[26px] w-[26px] rounded-[7px] text-sm",
    lg: "h-11 w-11 rounded-[11px] text-[22px]",
  };

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center bg-[var(--color-brand)] font-[family-name:var(--font-display)] font-extrabold text-white",
        sizes[size],
        className,
      )}
    >
      B
    </span>
  );
}
