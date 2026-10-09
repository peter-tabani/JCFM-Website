"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { KeyRound, Loader2 } from "lucide-react";

export default function ChangePinPage() {
  const router = useRouter();
  const { update } = useSession();
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (newPin !== confirmPin) {
      setError("The new PINs do not match.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/staff/change-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPin, newPin }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not change your PIN.");
      await update();
      router.replace("/staff/uploads");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change your PIN.");
    } finally {
      setSaving(false);
    }
  }

  return <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-lg items-center px-5 py-10">
    <section className="w-full rounded-xl border border-white/15 bg-white/[0.04] p-6 sm:p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black"><KeyRound size={22} /></span>
      <h1 className="mt-5 text-2xl font-semibold">Set your private PIN</h1>
      <p className="mt-2 text-sm leading-6 text-white/60">Change the temporary PIN your administrator gave you. Keep your new 8-digit PIN private.</p>
      {error && <p role="alert" className="mt-4 rounded-lg border border-red-400/30 bg-red-950/50 p-3 text-sm text-red-200">{error}</p>}
      <form onSubmit={submit} className="mt-5 space-y-4">
        <PinField label="Temporary PIN" value={currentPin} onChange={setCurrentPin} autoComplete="one-time-code" />
        <PinField label="New 8-digit PIN" value={newPin} onChange={setNewPin} autoComplete="new-password" />
        <PinField label="Confirm new PIN" value={confirmPin} onChange={setConfirmPin} autoComplete="new-password" />
        <button disabled={saving} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 font-semibold text-black hover:bg-neutral-200 disabled:opacity-60">
          {saving && <Loader2 size={16} className="animate-spin" />} Save PIN
        </button>
      </form>
    </section>
  </main>;
}

function PinField({ label, value, onChange, autoComplete }: { label: string; value: string; onChange: (value: string) => void; autoComplete: string }) {
  return <label className="block text-sm font-medium">{label}
    <input type="password" inputMode="numeric" pattern="[0-9]{8}" minLength={8} maxLength={8} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value.replace(/\D/g, "").slice(0, 8))} required className="mt-1.5 min-h-12 w-full rounded-lg border border-white/20 bg-black px-3 text-base tracking-[0.25em] text-white outline-none focus:border-white/70" />
  </label>;
}
