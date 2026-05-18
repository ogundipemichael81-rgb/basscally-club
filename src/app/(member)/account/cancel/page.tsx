import { AccountCancelContent } from "@/components/account/account-cancel-content";
import { PageShell } from "@/components/layout/page-shell";

export default function AccountCancelPage() {
  return (
    <PageShell
      title="Cancel membership"
      description="Understand how cancellation works before you change your plan. You stay in control — cancel anytime."
    >
      <AccountCancelContent />
    </PageShell>
  );
}
