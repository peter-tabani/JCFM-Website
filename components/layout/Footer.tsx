import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#050713] py-16 text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 lg:grid-cols-4 lg:px-6">

        {/* Brand */}
        <div>
          <h4 className="mb-1 text-2xl font-bold text-[#c4b5fd]">JCFM</h4>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
            Expanding the Kingdom, One Community at a Time
          </p>
          <p className="mt-4 leading-8 text-white/65">
            Jesus Christ Founder Ministry — a Christ-centered ministry
            headquartered in Nzoia, Bungoma, with branches across Kenya.
          </p>
        </div>

        {/* Ministry */}
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Ministry</h5>
          <div className="space-y-3 text-white/65">
            <p>Sunday Worship Services</p>
            <p>Youth, Women & Children</p>
            <p>Bible Study & Prayer</p>
            <p>Outreach & Evangelism</p>
            <p>Branch Network across Kenya</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Contact</h5>
          <div className="space-y-3 text-white/65">
            <p>Headquarters · Nzoia, Bungoma, Kenya</p>
            <a href="mailto:info@jcfm.org" className="block transition hover:text-[#86efac]">
              info@jcfm.org
            </a>
            <p>Sunday Service: 9:00 AM – 1:00 PM</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Quick Links</h5>
          <div className="space-y-3 text-white/65">
            <p><Link href="/#about" className="transition hover:text-[#c4b5fd]">About JCFM</Link></p>
            <p><Link href="/#branches" className="transition hover:text-[#c4b5fd]">Our Branches</Link></p>
            <p><Link href="/#church" className="transition hover:text-[#c4b5fd]">Church Life</Link></p>
            <p><Link href="/school" className="transition hover:text-[#c4b5fd]">Fountain of Hope Academy</Link></p>
            <p><Link href="/#contact" className="transition hover:text-[#c4b5fd]">Contact</Link></p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 max-w-[1400px] border-t border-white/10 px-4 pt-6 lg:px-6">
        <div className="flex flex-col gap-2 text-sm text-white/40 sm:flex-row sm:justify-between">
          <p> {new Date().getFullYear()} Jesus Christ Founder Ministry. All rights reserved.</p>
          <a
            href="https://wa.me/254708905590?text=Hello%20Frank%2C%20I%20saw%20your%20work%20on%20the%20JCFM%20website%20and%20I%20am%20interested%20in%20working%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#c4b5fd]"
          >
            Developed by PF
          </a>
        </div>
      </div>
    </footer>
  );
}
