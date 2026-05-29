import { Suspense } from "react";
import { CallbackContent } from "@/components/auth/callback-content";

/** Screen 13 */
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackLoadingFallback />}>
      <CallbackContent />
    </Suspense>
  );
}

function CallbackLoadingFallback() {
  return (
    <main className="basscally-callback-page flex min-h-[calc(100vh-65px)] items-center justify-center py-12 lg:py-16">
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
        Verifying magic link...
      </p>
    </main>
  );
}
