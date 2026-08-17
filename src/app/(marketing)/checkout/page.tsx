import { redirect } from "next/navigation";
import { getMemberSession } from "@/lib/subscriptions/member-session";
export default async function CheckoutPage() { const session = await getMemberSession(); redirect(session ? "/dashboard" : "/join"); }