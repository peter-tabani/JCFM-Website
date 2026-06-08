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
    <section className="border-b border-white/10 bg-gradient-to-b from-[#080b16] to-[#0f172a]">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl border border-white/10 bg-white/[0.04] p-7 text-center shadow-[0_22px_55px_rgba(0,0,0,0.35)] sm:p-10">
          <h2 className="mt-4 font-serif text-2xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-3xl md:text-4xl">
            Get JCFM & School Updates
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/65">
            Stay connected with the latest news from Jesus Christ Foundation Ministries, updates from Fountain of Hope Academy, and upcoming events and gatherings.
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 text-[13px] text-white/50">
            <Bell size={14} className="text-[#fbbf24]" strokeWidth={2} />
            <span>You will be notified for every upcoming event</span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-0"
          >
            <div className="relative flex-1 sm:max-w-sm">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                strokeWidth={1.5}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full border border-white/15 bg-black/25 py-3.5 pl-11 pr-4 text-[14px] text-white placeholder:text-white/35 focus:border-[#7c3aed] focus:outline-none focus:ring-1 focus:ring-[#7c3aed] sm:rounded-l-sm"
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="flex items-center justify-center gap-2 bg-[#7c3aed] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6d28d9] disabled:cursor-default disabled:bg-[#15803d] sm:rounded-r-sm"
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
