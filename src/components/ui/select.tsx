import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex w-full flex-col gap-2">
        {label ? (
          <label
            htmlFor={selectId}
            className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[length:var(--text-body)] text-[var(--color-text)] focus-visible:border-[var(--color-brand)] disabled:opacity-50",
            error && "border-[var(--color-danger)]",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error ? (
          <p className="text-[length:var(--text-caption)] text-[var(--color-danger)]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
