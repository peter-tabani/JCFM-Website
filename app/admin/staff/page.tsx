"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, KeyRound, Loader2, UserPlus, UserRoundX, UserRoundCheck } from "lucide-react";
import { PageHeader } from "@/components/admin/ui";

type Staff = {
  id: string;
  name: string | null;
  loginPhone: string | null;
  createdAt: string;
  disabledAt: string | null;
};

export default function StaffAccessPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [issued, setIssued] = useState<{ name: string; phone: string; pin: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/staff", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load staff accounts.");
      setStaff(data.staff ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load staff accounts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setIssued(null);
    try {
      const response = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not create the staff account.");
      setIssued({ name: data.staff.name, phone: data.staff.loginPhone, pin: data.temporaryPin });
      setName("");
      setPhone("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the staff account.");
    } finally {
      setSaving(false);
    }
  }

  async function action(member: Staff, actionName: "reset-pin" | "deactivate" | "activate") {
    setError("");
    if (actionName === "deactivate" && !window.confirm(`Deactivate ${member.name}'s account?`)) return;
    try {
      const response = await fetch(`/api/admin/staff/${member.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update the account.");
      if (data.temporaryPin) {
        setIssued({ name: member.name || "Staff", phone: member.loginPhone || "", pin: data.temporaryPin });
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update the account.");
    }
  }

  async function copyCredentials() {
    if (!issued) return;
    await navigator.clipboard.writeText(`JCFM staff sign-in\nPhone: ${issued.phone}\nTemporary PIN: ${issued.pin}\nSign in at: ${window.location.origin}/login`);
    setCopied(true);
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <PageHeader kicker="System" title="Staff access" description="Create photo uploader accounts for trusted staff." />
      <div className="mx-auto grid max-w-5xl gap-6 px-5 py-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="h-fit rounded-xl border border-white/15 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold">Add a staff member</h2>
          <p className="mt-1 text-sm text-white/60">They can upload photos to the website. They cannot access other admin tools.</p>
          <form onSubmit={create} className="mt-5 space-y-4">
            <label className="block text-sm font-medium">Name
              <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} autoComplete="name" className="mt-1.5 min-h-12 w-full rounded-lg border border-white/20 bg-black px-3 text-base text-white outline-none focus:border-white/70" />
            </label>
            <label className="block text-sm font-medium">Phone number
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" autoComplete="tel" placeholder="+254 712 345 678" className="mt-1.5 min-h-12 w-full rounded-lg border border-white/20 bg-black px-3 text-base text-white outline-none focus:border-white/70" />
            </label>
            <button disabled={saving} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 font-semibold text-black hover:bg-neutral-200 disabled:opacity-60">
              {saving ? <Loader2 size={17} className="animate-spin" /> : <UserPlus size={17} />}
              Create account
            </button>
          </form>
        </section>

        <section className="rounded-xl border border-white/15 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold">Staff accounts</h2>
          {error && <p role="alert" className="mt-3 rounded-lg border border-red-400/30 bg-red-950/50 p-3 text-sm text-red-200">{error}</p>}
          {issued && <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-950/40 p-4">
            <p className="font-semibold text-emerald-100">Temporary sign-in details for {issued.name}</p>
            <p className="mt-2 text-sm text-white/75">Phone: <span className="font-mono text-white">{issued.phone}</span></p>
            <p className="mt-1 text-sm text-white/75">PIN: <span className="font-mono text-lg font-bold tracking-[0.2em] text-white">{issued.pin}</span></p>
            <p className="mt-2 text-xs leading-5 text-white/55">Give these details directly to the staff member. The temporary PIN is shown only now and must be changed at first sign-in.</p>
            <button onClick={copyCredentials} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md border border-white/20 px-3 text-sm hover:bg-white/10">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Copied" : "Copy details"}</button>
          </div>}
          {loading ? <div className="flex justify-center py-12 text-white/60"><Loader2 className="animate-spin" /></div> : staff.length === 0 ? <p className="mt-5 rounded-lg border border-dashed border-white/15 p-6 text-center text-sm text-white/55">No staff accounts yet.</p> : <ul className="mt-4 divide-y divide-white/10">
            {staff.map((member) => <li key={member.id} className="flex flex-wrap items-center gap-3 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10"><KeyRound size={17} /></div>
              <div className="min-w-0 flex-1"><p className="truncate font-semibold">{member.name}</p><p className="text-sm text-white/60">{member.loginPhone} · {member.disabledAt ? "Deactivated" : "Photo uploader"}</p></div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => void action(member, "reset-pin")} className="min-h-10 rounded-md border border-white/20 px-3 text-xs font-medium hover:bg-white/10">Reset PIN</button>
                <button onClick={() => void action(member, member.disabledAt ? "activate" : "deactivate")} className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-white/20 px-3 text-xs font-medium hover:bg-white/10">
                  {member.disabledAt ? <><UserRoundCheck size={14} /> Activate</> : <><UserRoundX size={14} /> Deactivate</>}
                </button>
              </div>
            </li>)}
          </ul>}
        </section>
      </div>
    </div>
  );
}
