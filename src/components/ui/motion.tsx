"use client";

import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

type MotionDivProps = HTMLAttributes<HTMLDivElement> & {
  delayMs?: number;
};

/** CSS-only entrance — reduced motion handled in globals.css. */
export function MotionDiv({
  children,
  className,
  delayMs = 0,
  style,
  ...props
}: MotionDivProps) {
  return (
    <div
      className={cn(
        "opacity-100 motion-reduce:opacity-100 [@media(prefers-reduced-motion:no-preference)]:animate-[fade-rise_0.4s_var(--ease-out)_both]",
        className,
      )}
      style={{ ...style, animationDelay: delayMs ? `${delayMs}ms` : undefined }}
      {...props}
    >
      {children}
    </div>
  );
}
