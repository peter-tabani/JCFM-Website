import { ChevronDown, MessageCircleQuestion, User } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    // Hidden completely on mobile — these links move into the hamburger menu
    <section className="hidden bg-[#0f172a] text-white lg:block">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 text-sm lg:px-6">
        <div className="flex items-center gap-7">
          <Link href="/donors/portal" className="flex items-center gap-1.5 hover:text-orange-300">
            Donors <ChevronDown size={15} />
          </Link>
          <Link href="/login/staff" className="hover:text-orange-300">Staff</Link>
          <Link href="/login/alumni" className="hover:text-orange-300">Alumni</Link>
          <Link href="/login/parents" className="hover:text-orange-300">Parents</Link>
          <Link href="/login/community" className="hover:text-orange-300">Community</Link>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/login/staff" className="flex items-center gap-2 hover:text-orange-300">
            <User size={15} />
            Login / Register
          </Link>
          <span className="text-white/40">|</span>
          <a href="#contact" className="flex items-center gap-2 hover:text-orange-300">
            <MessageCircleQuestion size={15} />
            FAQ
          </a>
        </div>
      </div>
    </section>
  );
}