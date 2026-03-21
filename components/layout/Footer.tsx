export default function Footer() {
  return (
    <footer id="contact" className="bg-[#fffaf2] py-16">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 lg:grid-cols-4 lg:px-6">
        <div>
          <h4 className="mb-4 text-2xl font-bold text-[#d97706]">KES</h4>
          <p className="leading-8 text-slate-600">
            Kenya Excellent Centre and School is committed to raising learners
            in excellence, discipline, and integrity.
          </p>
        </div>

        <div>
          <h5 className="mb-4 text-lg font-semibold text-slate-900">Programs</h5>
          <div className="space-y-3 text-slate-600">
            <p>Pre-Primary</p>
            <p>Primary School</p>
            <p> Secondary</p>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-lg font-semibold text-slate-900">Contact</h5>
          <div className="space-y-3 text-slate-600">
            <p>Likoni, Mombasa</p>
            <p>+254 722 916174</p>
            <p>School Hours: 6:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-lg font-semibold text-slate-900">Quick Links</h5>
          <div className="space-y-3 text-slate-600">
            <p>About Us</p>
            <p>Admissions</p>
            <p>School Life</p>
            <p>Contact</p>
          </div>
        </div>
      </div>
    </footer>
  );
}