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
            "min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-text)] [color-scheme:dark] placeholder:text-[var(--color-text-dim)] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-text)] [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_var(--color-surface)_inset] focus-visible:border-[var(--color-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,69,0,0.4)] disabled:opacity-50",
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
            className="text-[length:var(--text-caption)] text-[var(--color-danger)] field__error"
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
