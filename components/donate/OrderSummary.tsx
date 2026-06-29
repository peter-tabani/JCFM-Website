import { Info, Pencil } from "lucide-react";
import { fmtUSD } from "@/lib/donations";

export default function OrderSummary({
  label,
  amountCents,
  onEdit,
}: {
  label: string;
  amountCents: number;
  onEdit?: () => void;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          Your gift
        </p>
        {onEdit && (
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#d97706] hover:underline"
          >
            <Pencil size={12} /> Edit
          </button>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-600">{label}</p>
          <p className="text-[11px] text-slate-400">One-time gift</p>
        </div>
        <p className="shrink-0 text-2xl font-bold text-slate-900">
          {fmtUSD(amountCents)}
        </p>
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-[11px] leading-5 text-slate-500">
        <Info size={13} className="mt-0.5 shrink-0" />
        Your card or payment details are handled directly by our payment
        providers and never stored on our servers.
      </div>
    </div>
  );
}
