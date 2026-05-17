import { MemberShell } from "@/components/layout/member-shell";
import type { ReactNode } from "react";

export default function MemberLayout({ children }: { children: ReactNode }) {
  return <MemberShell>{children}</MemberShell>;
}
