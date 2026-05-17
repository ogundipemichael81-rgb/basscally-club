import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardBase =
  "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 motion-reduce:transition-none [@media(prefers-reduced-motion:no-preference)]:transition-[border,box-shadow,transform] [@media(prefers-reduced-motion:no-preference)]:duration-[var(--motion-default)]";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardBase, className)} {...props} />
  ),
);

Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4 flex flex-col gap-2", className)} {...props} />
));

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-[family-name:var(--font-display)] text-[length:var(--text-h4)] font-semibold",
      className,
    )}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[length:var(--text-body-sm)] text-[var(--color-text-muted)]",
      className,
    )}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";
