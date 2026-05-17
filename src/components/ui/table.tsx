import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Table = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]">
    <table
      ref={ref}
      className={cn("w-full min-w-[640px] border-collapse text-left text-[length:var(--text-body-sm)]", className)}
      {...props}
    />
  </div>
));

Table.displayName = "Table";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("border-b border-[var(--color-border)] bg-[var(--color-surface-raised)]", className)}
    {...props}
  />
));

TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("divide-y divide-[var(--color-border)]", className)} {...props} />
));

TableBody.displayName = "TableBody";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("hover:bg-[var(--color-surface-raised)] motion-reduce:transition-none", className)}
    {...props}
  />
));

TableRow.displayName = "TableRow";

export const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-4 py-3 font-semibold text-[var(--color-text-muted)]",
      className,
    )}
    {...props}
  />
));

TableHead.displayName = "TableHead";

export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("px-4 py-3 text-[var(--color-text)]", className)} {...props} />
));

TableCell.displayName = "TableCell";
