"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgpvqgb";

const donationTypes = [
  "Sponsor a Child (Monthly)",
  "One-Time Donation",
  "Donate School Supplies",
  "Corporate / Organisation Partnership",
  "General Enquiry",
];

type FormState = {
  donor_name: string;
  donor_email: string;
  donor_country: string;
  donor_organisation: string;
  donation_type: string;
  donation_amount: string;
  message: string;
};

const initial: FormState = {
  donor_name: "",
  donor_email: "",
  donor_country: "",
  donor_organisation: "",
  donation_type: "",
  donation_amount: "",
  message: "",
};

export default function DonorContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Donor Name": form.donor_name,
          "Donor Email": form.donor_email,
          "Country": form.donor_country,
          "Organisation (if any)": form.donor_organisation,
          "Donation Type": form.donation_type,
          "Donation Amount / Budget": form.donation_amount,
          "Message": form.message,
          "_subject": `New Donor Enquiry from ${form.donor_name} (${form.donor_country})`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm(initial);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="hero-title mb-3 text-3xl text-slate-900">Thank You!</h3>
        <p className="max-w-md text-base leading-8 text-slate-600">
          Director Mr. Noah Mweruphe has received your message and will
          respond to{" "}
          <span className="font-semibold text-slate-800">{form.donor_email}</span>{" "}
          within 48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full bg-[#7c3aed] px-8 py-3 font-semibold text-white hover:bg-[#6d28d9]"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
      <h3 className="hero-title mb-6 text-2xl text-slate-900">Send a Message</h3>

      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label">Your Full Name *</label>
            <input
              required
              name="donor_name"
              value={form.donor_name}
              onChange={handle}
              placeholder="e.g. James Mitchell"
              className="input"
            />
          </div>
          <div>
            <label className="label">Email Address *</label>
            <input
              required
              name="donor_email"
              value={form.donor_email}
              onChange={handle}
              placeholder="your@email.com"
              className="input"
              type="email"
            />
          </div>
          <div>
            <label className="label">Country *</label>
            <input
              required
              name="donor_country"
              value={form.donor_country}
              onChange={handle}
              placeholder="e.g. United Kingdom"
              className="input"
            />
          </div>
          <div>
            <label className="label">Organisation (if applicable)</label>
            <input
              name="donor_organisation"
              value={form.donor_organisation}
              onChange={handle}
              placeholder="Company or charity name"
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">Type of Support *</label>
          <select
            required
            name="donation_type"
            value={form.donation_type}
            onChange={handle}
            className="input"
          >
            <option value="">Select one</option>
            {donationTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Donation Amount / Budget (optional)</label>
          <input
            name="donation_amount"
            value={form.donation_amount}
            onChange={handle}
            placeholder="e.g. $50/month or $500 one-time"
            className="input"
          />
        </div>

        <div>
          <label className="label">Your Message *</label>
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handle}
            rows={5}
            placeholder="Tell us how you'd like to help, any questions you have, or anything you'd like the director to know..."
            className="input resize-none"
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700">
            <AlertCircle size={18} />
            <p className="text-sm">
              Something went wrong. Please email us directly at excellentkenya@gmail.com
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#7c3aed] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#6d28d9] disabled:opacity-60"
        >
          {status === "sending" ? (
            <><Loader2 size={18} className="animate-spin" /> Sending...</>
          ) : (
            <><Send size={18} /> Send to Director</>
          )}
        </button>

        <p className="text-center text-xs text-slate-400">
          Your message goes directly to Director Mr. Noah Mweruphe.
          We respond within 48 hours.
        </p>
      </form>
    </div>
  );
}
