import { Suspense } from "react";
import { CheckoutSuccess } from "@/components/checkout/checkout-success";
export default function CheckoutSuccessPage(){return <Suspense fallback={<main className="mx-auto flex min-h-screen max-w-lg items-center px-5"><p>Confirming your membership...</p></main>}><CheckoutSuccess/></Suspense>;}
