"use client";

import { useState } from "react";
import { Mail, Bell, CheckCircle, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="border-b border-slate-200 bg-[#f8f9fb]">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-4 font-serif text-2xl font-semibold uppercase leading-tight tracking-wide text-[#4c1d95] sm:text-3xl md:text-4xl">
            Get JCFM & School Updates
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-600">
            Stay connected with the latest news from Jesus Christ Foundation Ministries, updates from Fountain of Hope Academy, and upcoming events and gatherings.
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 text-[13px] text-slate-500">
            <Bell size={14} className="text-[#dc2626]" strokeWidth={2} />
            <span>You will be notified for every upcoming event</span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-0"
          >
            <div className="relative flex-1 sm:max-w-sm">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                strokeWidth={1.5}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-[14px] text-slate-800 placeholder:text-slate-400 focus:border-[#4c1d95] focus:outline-none focus:ring-1 focus:ring-[#4c1d95] sm:rounded-l-sm"
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="flex items-center justify-center gap-2 bg-[#4c1d95] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#3b0f80] disabled:cursor-default disabled:bg-[#15803d] sm:rounded-r-sm"
            >
              {submitted ? (
                <>
                  <CheckCircle size={16} strokeWidth={2} />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe <ArrowRight size={14} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
