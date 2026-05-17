import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex w-full flex-col gap-2">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[length:var(--text-body)] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus-visible:border-[var(--color-brand)] disabled:opacity-50",
            error && "border-[var(--color-danger)]",
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error ? (
          <p
            id={`${inputId}-error`}
            className="text-[length:var(--text-caption)] text-[var(--color-danger)]"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
