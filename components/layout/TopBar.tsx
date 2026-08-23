import { Mail, User, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <>
      {/* Accent stripe */}
      <div className="hidden h-[3px] w-full bg-[#15803d] lg:block" />

      {/* Utility bar */}
      <section className="hidden border-b border-slate-200 bg-white text-slate-700 lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-[12px] tracking-wide">
          {/* Left: Official label + contact */}
          <div className="flex items-center divide-x divide-slate-200">
            <span className="pr-5 font-semibold uppercase tracking-[0.18em] text-[#4c1d95]">
              Official Website
            </span>
            <a
              href="mailto:info@jcfm.online"
              className="flex items-center gap-2 px-5 text-slate-600 transition hover:text-[#15803d]"
            >
              <Mail size={12} strokeWidth={2.25} />
              info@jcfm.online
            </a>
          </div>

          {/* Right: Portal links */}
          <div className="flex items-center divide-x divide-slate-200">
            <Link href="/members" className="px-4 text-slate-600 transition hover:text-[#4c1d95]">
              Members
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 text-slate-600 transition hover:text-[#4c1d95]"
            >
              <User size={12} strokeWidth={2.25} />
              Sign In
            </Link>
            <a
              href="#contact"
              className="flex items-center gap-1.5 pl-4 text-slate-600 transition hover:text-[#15803d]"
            >
              <HelpCircle size={12} strokeWidth={2.25} />
              Help
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
