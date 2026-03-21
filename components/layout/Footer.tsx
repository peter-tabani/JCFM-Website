import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0f172a] py-16 text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 lg:grid-cols-4 lg:px-6">

        {/* Brand */}
        <div>
          <h4 className="mb-1 text-2xl font-bold text-[#d97706]">KES</h4>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
            Natuwe Mbele Daima
          </p>
          <p className="mt-4 leading-8 text-white/65">
            The Kenya Excellent Centre and School — committed to raising
            learners in excellence, discipline, and integrity since 2013.
          </p>
        </div>

        {/* Programs */}
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Programs</h5>
          <div className="space-y-3 text-white/65">
            <p>ECDE (PP1 – PP2)</p>
            <p>Primary School (Grade 1–6)</p>
            <p>Junior Secondary (Grade 7–9)</p>
            <p>Islamic Curriculum (Madrasa)</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Contact</h5>
          <div className="space-y-3 text-white/65">
            <p>Along Approved-Shelleybeach Road,<br />Likoni, Mombasa</p>
            <a href="tel:+254722916174" className="block hover:text-[#d97706]">
              +254 722 916174
            </a>
            <a href="mailto:excellentkenya@gmail.com" className="block hover:text-[#d97706]">
              excellentkenya@gmail.com
            </a>
            <p>School Hours: 6:00 AM – 6:00 PM</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Quick Links</h5>
          <div className="space-y-3 text-white/65">
            <p><Link href="#about" className="hover:text-[#d97706]">About Us</Link></p>
            <p><Link href="#admissions" className="hover:text-[#d97706]">Admissions</Link></p>
            <p><Link href="#why-kecs" className="hover:text-[#d97706]">School Life</Link></p>
            <p><Link href="#contact" className="hover:text-[#d97706]">Contact</Link></p>
            <p><Link href="/login/donors" className="hover:text-[#d97706]">Donors</Link></p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 max-w-[1400px] border-t border-white/10 px-4 pt-6 lg:px-6">
        <div className="flex flex-col gap-2 text-sm text-white/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} The Kenya Excellent Centre and School. All rights reserved.</p>
          <p>Likoni – Shelley Beach, Mombasa County, Kenya</p>
        </div>
      </div>
    </footer>
  );
}