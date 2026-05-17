import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex w-full flex-col gap-2">
        {label ? (
          <label
            htmlFor={textareaId}
            className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-[120px] w-full resize-y rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[length:var(--text-body)] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus-visible:border-[var(--color-brand)] disabled:opacity-50",
            error && "border-[var(--color-danger)]",
            className,
          )}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error ? (
          <p className="text-[length:var(--text-caption)] text-[var(--color-danger)]" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
