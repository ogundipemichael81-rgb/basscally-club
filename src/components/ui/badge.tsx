import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-full)] px-2 py-1 text-[length:var(--text-caption)] font-semibold uppercase tracking-wider",
  {
    variants: {
      variant: {
        brand: "bg-[var(--color-brand-muted)] text-[var(--color-brand)]",
        beginner: "bg-[rgba(96,165,250,0.15)] text-[var(--color-info)]",
        intermediate: "bg-[rgba(251,191,36,0.15)] text-[var(--color-warning)]",
        advanced: "bg-[rgba(248,113,113,0.15)] text-[var(--color-danger)]",
        active: "bg-[rgba(52,211,153,0.15)] text-[var(--color-success)]",
        default:
          "border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
