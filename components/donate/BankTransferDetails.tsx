import { Landmark, Mail } from "lucide-react";
import { siteData } from "@/data/site";

// For donors (often international/US) who'd rather wire money directly than
// pay by card or M-Pesa — no payment processor involved at all. Reads from
// server-only env vars (BANK_*, see .env.example) rather than data/site.ts —
// the account number shouldn't sit in git history even though it ends up
// shown publicly on the site. Falls back to "email the office" until those
// vars are set, so nothing fake or empty ever ships live.
export default function BankTransferDetails() {
  const accountName = process.env.BANK_ACCOUNT_NAME || "";
  const bankName = process.env.BANK_NAME || "";
  const branch = process.env.BANK_BRANCH || "";
  const accountNumber = process.env.BANK_ACCOUNT_NUMBER || "";
  const swiftCode = process.env.BANK_SWIFT_CODE || "";
  const currency = process.env.BANK_CURRENCY || "USD";

  const isConfigured = Boolean(accountName && bankName && accountNumber && swiftCode);

  if (!isConfigured) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-[#fafaf8] p-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#4c1d95]/10 text-[#4c1d95]">
          <Landmark size={20} strokeWidth={1.75} />
        </div>
        <p className="font-semibold text-slate-900">Direct bank wire</p>
        <p className="mt-1 mb-4 text-sm leading-7 text-slate-600">
          Prefer to wire your gift directly to the Ministry's bank account?
          Email the office and we'll send the account number and SWIFT/BIC
          code.
        </p>
        <a
          href={`mailto:${siteData.email}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4c1d95] hover:underline"
        >
          <Mail size={14} />
          Email {siteData.email}
        </a>
      </div>
    );
  }

  const rows = [
    { label: "Account Name", value: accountName },
    { label: "Bank", value: branch ? `${bankName} — ${branch}` : bankName },
    { label: "Account Number", value: accountNumber },
    { label: "SWIFT / BIC Code", value: swiftCode },
    { label: "Currency", value: currency },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#fafaf8] p-6">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#4c1d95]/10 text-[#4c1d95]">
        <Landmark size={20} strokeWidth={1.75} />
      </div>
      <p className="font-semibold text-slate-900">Direct bank wire</p>
      <p className="mt-1 mb-4 text-sm leading-7 text-slate-600">
        For US and other international donors who'd rather wire a gift
        directly — no card or processor needed.
      </p>
      <dl className="space-y-2 rounded-xl border border-slate-200 bg-white p-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
            <dt className="text-slate-500">{row.label}</dt>
            <dd className="text-right font-mono font-semibold text-slate-900">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        International wires may take a few business days and your bank may
        charge its own transfer fee. Questions?{" "}
        <a href={`mailto:${siteData.email}`} className="font-semibold text-[#4c1d95] hover:underline">
          Email {siteData.email}
        </a>
        .
      </p>
    </div>
  );
}
