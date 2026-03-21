import { ShieldCheck, HeartHandshake, Trophy, Users } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 lg:grid-cols-2 lg:items-center lg:px-6">

        {/* Image Grid */}
        <div className="relative h-[500px] w-full lg:h-[700px]">
          <div className="absolute right-0 top-0 h-[75%] w-[80%] overflow-hidden rounded-3xl shadow-xl">
            <div
              className="h-full w-full bg-slate-200 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
            />
          </div>

          <div className="absolute bottom-[5%] left-0 h-[45%] w-[55%] overflow-hidden rounded-3xl border-8 border-white shadow-2xl">
            <div
              className="h-full w-full bg-slate-300 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
            />
          </div>

          {/* Founded badge */}
          <div className="absolute bottom-[52%] right-[18%] z-10 rounded-2xl bg-[#d97706] px-4 py-3 text-center text-white shadow-lg">
            <p className="text-2xl font-bold">2013</p>
            <p className="text-xs font-semibold uppercase tracking-wide">Founded</p>
          </div>

          <div className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-[#d97706]/20" />
          <div className="absolute left-10 top-10 -z-10 h-20 w-20 rounded-full border-[12px] border-[#fffaf2]" />
        </div>

        {/* Text Content */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
            About KES
          </p>
          <h3 className="hero-title mb-6 text-4xl leading-tight text-slate-900 md:text-5xl">
            A Centre for Academic Growth and Moral Integrity
          </h3>

          <p className="mb-5 text-base leading-8 text-slate-600">
            The Kenya Excellent Centre and School was founded in 2013 as a
            private institution in Likoni–Shelley Beach, Mombasa, with a heart
            for the most vulnerable. It began as a school accommodating a
            charity for orphans and extremely needy children from highly
            disadvantaged families, with a vision to eventually serve 75%
            sponsored learners alongside 25% fee-paying students.
          </p>

          <p className="mb-8 text-base leading-8 text-slate-600">
            Starting with just 25 fee-paying students and 5 needy children, KES
            has grown to over 250 sponsored children and approximately 150
            fee-paying learners — posting highly competitive results in KJSEA
            exams, with alumni gaining entry to national schools such as Maranda
            High, Nyuki School, Kwale High, and Matuga Girls.
          </p>

          {/* Vision & Mission */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="mb-2 font-semibold text-slate-900">Vision</p>
              <p className="text-sm leading-7 text-slate-600">
                To be the best in providing quality education and care to the
                young.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <p className="mb-2 font-semibold text-slate-900">Mission</p>
              <p className="text-sm leading-7 text-slate-600">
                To consolidate resources and partnerships to educate and care
                for both the fortunate and less fortunate, achieving equitable
                human resource development in Kenya.
              </p>
            </div>
          </div>

          {/* Value Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#fffaf2] p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                <ShieldCheck size={22} />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-slate-900">Core Values</h4>
              <p className="text-sm leading-8 text-slate-600">
                High discipline, hard work, integrity, and close social
                relationships among staff and learners define our culture.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fffaf2] p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                <HeartHandshake size={22} />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-slate-900">Personal Attention</h4>
              <p className="text-sm leading-8 text-slate-600">
                Every learner receives individual guidance, encouragement, and
                support — regardless of their background.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fffaf2] p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                <Trophy size={22} />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-slate-900">Achievements</h4>
              <p className="text-sm leading-8 text-slate-600">
                Best in Academics & Scouting at sub-county level. Highly
                competitive in Athletics and Taekwondo.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fffaf2] p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                <Users size={22} />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-slate-900">Community Impact</h4>
              <p className="text-sm leading-8 text-slate-600">
                Over 250 sponsored children from disadvantaged families given a
                quality education they would otherwise never access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}