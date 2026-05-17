"use client";

import { MotionProvider } from "@/components/ui/motion";
import { ToastProvider } from "@/components/ui/toast";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <MotionProvider>{children}</MotionProvider>
    </ToastProvider>
  );
}
