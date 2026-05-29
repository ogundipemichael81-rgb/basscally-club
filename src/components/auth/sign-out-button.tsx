"use client";

import { createClient } from "@/lib/supabase/client";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(routes.home);
    router.refresh();
  };

  return (
    <Button type="button" variant="ghost" className="w-full justify-start px-4" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
