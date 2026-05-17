import type { ReactNode } from "react";

/** Pass-through — child routes define their own layout shells */
export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return children;
}
