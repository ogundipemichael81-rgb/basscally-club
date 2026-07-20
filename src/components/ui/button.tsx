import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 min-w-[44px] items-center justify-center gap-2 rounded-[var(--radius-lg)] font-semibold text-[length:var(--text-body)] transition-[background,border,transform,box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,69,0,0.3)] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] hover:shadow-[var(--shadow-brand-glow)]",
        secondary:
          "border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text)] hover:border-[var(--color-text-muted)] hover:bg-[var(--color-surface-raised)]",
        ghost:
          "bg-transparent px-3 py-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]",
      },
      size: {
        default: "px-6 py-3",
        sm: "min-h-11 min-w-[44px] px-4 py-2 text-[length:var(--text-body-sm)]",
        lg: "min-h-11 px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export { buttonVariants };
