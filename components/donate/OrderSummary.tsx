import { Info, Pencil } from "lucide-react";
import { fmtUSD } from "@/lib/donations";

export default function OrderSummary({
  label,
  amountCents,
  image,
  onEdit,
}: {
  label: string;
  amountCents: number;
  image?: string;
  onEdit?: () => void;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0f1626]">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={label} className="h-40 w-full object-cover" />
      )}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
            Your gift
          </p>
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#7c3aed] hover:underline"
            >
              <Pencil size={12} /> Edit
            </button>
          )}
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="min-w-0 truncate text-sm text-white/60">{label}</p>
          <p className="shrink-0 text-2xl font-bold text-white">
            {fmtUSD(amountCents)}
          </p>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/[0.03] p-3 text-[11px] leading-5 text-white/45">
          <Info size={13} className="mt-0.5 shrink-0" />
          Your payment details are handled directly by our payment providers and
          never stored on our servers.
        </div>
      </div>
    </div>
  );
}
