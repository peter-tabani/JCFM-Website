"use client";

import { useState } from "react";
import {
  Send,
  Mail,
  CheckCircle2,
  Loader2,
  AlertCircle,
  User,
  BookOpen,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgpvqgb";

const levels = [
  "ECDE - PP1",
  "ECDE - PP2",
  "Primary - Grade 1",
  "Primary - Grade 2",
  "Primary - Grade 3",
  "Primary - Grade 4",
  "Primary - Grade 5",
  "Primary - Grade 6",
  "Junior Secondary - Grade 7",
  "Junior Secondary - Grade 8",
  "Junior Secondary - Grade 9",
];

const hearOptions = [
  "Friend / Family referral",
  "Social media",
  "Passed by the school",
  "Google / Internet",
  "Community notice board",
  "Other",
];

const steps = [
  { num: "1", title: "Enquire", desc: "Email us or fill the form below." },
  { num: "2", title: "Get Fee Structure", desc: "Visit our office on Shelleybeach Road, Likoni." },
  { num: "3", title: "Submit Documents", desc: "Bring all required documents for your child's level." },
  { num: "4", title: "Assessment (JSS only)", desc: "Grade 7-9 applicants without KPSEA sit an entry test." },
  { num: "5", title: "Confirm & Join", desc: "Pay fees and receive your reporting date. Welcome to Fountain of Hope Academy!" },
];

type FormState = {
  parent_name: string;
  parent_phone: string;
  parent_email: string;
  child_name: string;
  child_dob: string;
  child_gender: string;
  applying_level: string;
  current_school: string;
  special_needs: string;
  how_heard: string;
  message: string;
};

const initial: FormState = {
  parent_name: "",
  parent_phone: "",
  parent_email: "",
  child_name: "",
  child_dob: "",
  child_gender: "",
  applying_level: "",
  current_school: "",
  special_needs: "",
  how_heard: "",
  message: "",
};

export default function AdmissionsForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [stepsOpen, setStepsOpen] = useState(false);

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
          "Parent Name": form.parent_name,
          "Parent Phone": form.parent_phone,
          "Parent Email": form.parent_email,
          "Child Name": form.child_name,
          "Date of Birth": form.child_dob,
          "Gender": form.child_gender,
          "Applying For": form.applying_level,
          "Current School": form.current_school,
          "Special Needs": form.special_needs,
          "How They Heard": form.how_heard,
          "Message": form.message,
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

  return (
    <>
      {/* ── MOBILE: Quick Contact Buttons (shown FIRST, above form) ── */}
      <div className="mb-8 lg:hidden">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">
          Quickest Ways to Reach Us
        </p>
        <div className="grid grid-cols-1 gap-3">
          <a
            href="mailto:excellentkenya@gmail.com?subject=Admissions Enquiry - Fountain of Hope Academy"
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-[#f5f3ff] py-4 font-semibold text-slate-800 shadow-sm active:scale-95"
          >
            <Mail size={20} className="text-[#7c3aed]" />
            Email: excellentkenya@gmail.com
          </a>
        </div>

        {/* Collapsible How to Join steps, mobile only */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <button
            onClick={() => setStepsOpen((o) => !o)}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-slate-900"
          >
            <span>How to Join Fountain of Hope Academy, 5 Steps</span>
            {stepsOpen ? <ChevronUp size={18} className="text-[#7c3aed]" /> : <ChevronDown size={18} className="text-[#7c3aed]" />}
          </button>
          {stepsOpen && (
            <ol className="divide-y divide-slate-100 border-t border-slate-100">
              {steps.map((s) => (
                <li key={s.num} className="flex items-start gap-4 px-5 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-sm font-bold text-white">
                    {s.num}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{s.title}</p>
                    <p className="mt-0.5 text-sm leading-6 text-slate-500">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          or fill in the full application form below.</p>
      </div>

      {/* ── Main Layout ── */}
      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

        {/* ── Form ── */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="hero-title mb-3 text-3xl text-slate-900">
                Application Submitted!
              </h3>
              <p className="max-w-md text-base leading-8 text-slate-600">
                Thank you! The Fountain of Hope Academy admissions team will contact you within 1-2
                business days on{" "}
                <span className="font-semibold text-slate-800">
                  {form.parent_phone || "your phone"}
                </span>.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 rounded-full bg-[#7c3aed] px-8 py-3 font-semibold text-white hover:bg-[#6d28d9]"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8">

              {/* Parent / Guardian */}
              <fieldset>
                <legend className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#7c3aed]">
                  <User size={15} /> Parent / Guardian Details
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label">Full Name *</label>
                    <input
                      required
                      name="parent_name"
                      value={form.parent_name}
                      onChange={handle}
                      placeholder="e.g. Fatuma Hassan"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Phone Number *</label>
                    <input
                      required
                      name="parent_phone"
                      value={form.parent_phone}
                      onChange={handle}
                      placeholder="+254 7XX XXX XXX"
                      className="input"
                      type="tel"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Email Address (optional)</label>
                    <input
                      name="parent_email"
                      value={form.parent_email}
                      onChange={handle}
                      placeholder="your@email.com"
                      className="input"
                      type="email"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Child Details */}
              <fieldset>
                <legend className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#7c3aed]">
                  <BookOpen size={15} /> Child / Learner Details
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label">Child's Full Name *</label>
                    <input
                      required
                      name="child_name"
                      value={form.child_name}
                      onChange={handle}
                      placeholder="e.g. Omar Hassan"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Date of Birth *</label>
                    <input
                      required
                      name="child_dob"
                      value={form.child_dob}
                      onChange={handle}
                      className="input"
                      type="date"
                    />
                  </div>
                  <div>
                    <label className="label">Gender *</label>
                    <select
                      required
                      name="child_gender"
                      value={form.child_gender}
                      onChange={handle}
                      className="input"
                    >
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Applying for Level *</label>
                    <select
                      required
                      name="applying_level"
                      value={form.applying_level}
                      onChange={handle}
                      className="input"
                    >
                      <option value="">Select level</option>
                      {levels.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Current / Previous School (if any)</label>
                    <input
                      name="current_school"
                      value={form.current_school}
                      onChange={handle}
                      placeholder="Name of school or 'N/A'"
                      className="input"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Additional Info */}
              <fieldset>
                <legend className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#7c3aed]">
                  <FileText size={15} /> Additional Information
                </legend>
                <div className="grid gap-5">
                  <div>
                    <label className="label">Any special needs or medical conditions?</label>
                    <input
                      name="special_needs"
                      value={form.special_needs}
                      onChange={handle}
                      placeholder="e.g. Asthma, or 'None'"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">How did you hear about Fountain of Hope Academy?</label>
                    <select
                      name="how_heard"
                      value={form.how_heard}
                      onChange={handle}
                      className="input"
                    >
                      <option value="">Select one</option>
                      {hearOptions.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">Any questions or message for the school?</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      rows={4}
                      placeholder="Any questions or additional information..."
                      className="input resize-none"
                    />
                  </div>
                </div>
              </fieldset>

              {status === "error" && (
                <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700">
                  <AlertCircle size={18} />
                  <p className="text-sm">
                    Something went wrong. Please email us directly.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#7c3aed] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#6d28d9] disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Submit Application
                  </>
                )}
              </button>

              
            </form>
          )}
        </div>

        {/* ── Desktop Sidebar (hidden on mobile) ── */}
        <div className="hidden lg:flex lg:flex-col lg:gap-5">
          <a
            href="mailto:excellentkenya@gmail.com?subject=Admissions Enquiry - Fountain of Hope Academy"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#f5f3ff] p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/10 text-[#7c3aed]">
              <Mail size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Send an Email</p>
              <p className="text-sm text-slate-500">We reply within 1-2 days</p>
              <p className="mt-1 text-sm font-semibold text-[#7c3aed]">excellentkenya@gmail.com</p>
            </div>
          </a>

          {/* Desktop: How to Join steps (always visible) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              How to Join Fountain of Hope Academy, 5 Steps
            </p>
            <ol className="space-y-4">
              {steps.map((s) => (
                <li key={s.num} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-xs font-bold text-white">
                    {s.num}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                    <p className="text-xs leading-5 text-slate-500">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              Visit Our Office
            </p>
            <p className="text-sm leading-7 text-slate-700">
              Along Approved-Shelleybeach Road,<br />
              Likoni - Shelley Beach,<br />
              Mombasa County
            </p>
            <p className="mt-3 text-sm text-slate-700">
              <span className="font-semibold">Hours:</span> 6:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* ── STICKY BOTTOM BAR, mobile only ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-200 bg-white shadow-2xl lg:hidden">
        <a
          href="mailto:excellentkenya@gmail.com?subject=Admissions Enquiry - Fountain of Hope Academy"
          className="flex flex-1 flex-col items-center justify-center gap-1 bg-[#7c3aed] py-3 text-white active:opacity-80"
        >
          <Mail size={22} />
          <span className="text-xs font-bold">Email Us</span>
        </a>
      </div>

      {/* Bottom padding so sticky bar doesn't cover content on mobile */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
