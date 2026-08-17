import { redirect } from "next/navigation";
import { PaywallView } from "@/components/paywall/paywall-view";
import { getMemberSession } from "@/lib/subscriptions/member-session";
export default async function PaywallPage(){const session=await getMemberSession();if(session)redirect("/dashboard");return <PaywallView/>}