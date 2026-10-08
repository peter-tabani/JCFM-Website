import "server-only";

import { INTASEND_PUBLIC_KEY } from "@/lib/intasend";

type Invoice = {
  invoice_id?: string;
  state?: string;
  api_ref?: string;
  currency?: string;
  value?: number | string;
};

// IntaSend recommends confirming a completed collection against its status
// endpoint before treating the webhook as authoritative. This endpoint accepts
// the publishable key and returns the invoice for that merchant.
export async function confirmIntaSendInvoice(
  invoiceId: string,
  expected: { apiRef: string; amountCents: number; currency: string }
): Promise<boolean> {
  const response = await fetch("https://api.intasend.com/api/v1/payment/status/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-IntaSend-Public-API-Key": INTASEND_PUBLIC_KEY,
    },
    body: JSON.stringify({ invoice_id: invoiceId }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("IntaSend status lookup failed");

  const data = (await response.json()) as { invoice?: Invoice };
  const invoice = data.invoice;
  if (!invoice) return false;
  const value = Number(invoice.value);
  return (
    invoice.invoice_id === invoiceId &&
    invoice.state === "COMPLETE" &&
    invoice.api_ref === expected.apiRef &&
    invoice.currency?.toLowerCase() === expected.currency &&
    Number.isFinite(value) &&
    Math.round(value * 100) === expected.amountCents
  );
}
