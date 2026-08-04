import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/lib/routes";

function loginErrorRedirect(request: NextRequest, message: string) {
  const url = new URL(routes.auth.login, request.url);
  url.searchParams.set("authError", message);
  return NextResponse.redirect(url);
}

/** Email-link callbacks are deliberately fail-closed while password recovery
 * and checkout claims are moved to server-only flows. */
export async function GET(request: NextRequest) {
  const callbackType = request.nextUrl.searchParams.get("type");
  if (callbackType === "recovery") {
    return loginErrorRedirect(request, "Password recovery is temporarily unavailable. Please contact support.");
  }
  return loginErrorRedirect(request, "Email-link sign-in is no longer used. Sign in with your password.");
}
