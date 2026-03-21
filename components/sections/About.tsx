import { ShieldCheck, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 lg:grid-cols-2 lg:items-center lg:px-6">
        
        {/* Left Column (Was Right): Modern Overlapping Image Grid */}
        <div className="relative h-[500px] w-full lg:h-[700px]">
          {/* Main Large Image - Using Your Existing Hero Image as Placeholder */}
          <div className="absolute right-0 top-0 h-[75%] w-[80%] overflow-hidden rounded-3xl shadow-xl">
            <div 
              className="h-full w-full bg-slate-200 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
            />
          </div>
          
          {/* Smaller Overlapping Image - Using Your Existing Hero Image as Placeholder */}
          <div className="absolute bottom-[5%] left-0 h-[45%] w-[55%] overflow-hidden rounded-3xl border-8 border-white shadow-2xl">
            <div 
              className="h-full w-full bg-slate-300 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
            />
          </div>

          {/* Decorative Accents */}
          <div className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-[#d97706]/20" />
          <div className="absolute left-10 top-10 -z-10 h-20 w-20 rounded-full border-[12px] border-[#fffaf2]" />
        </div>

        {/* Right Column (Was Left): Your Text Content */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#d97706]">
            About KES
          </p>
          <h3 className="hero-title mb-6 text-4xl leading-tight text-slate-900 md:text-5xl">
            A Centre for Academic Growth and Moral Integrity
          </h3>
          <p className="mb-5 text-base leading-8 text-slate-600">
            The Kenya Excellent Centre and School is a private educational
            institution in Likoni, Mombasa, serving learners from early
            childhood through junior secondary. We provide a supportive
            environment where students are guided to grow in knowledge,
            confidence, discipline, and character.
          </p>
          <p className="mb-8 text-base leading-8 text-slate-600">
            Our approach combines strong academic foundations with personal
            attention, Christian values, and practical support for learners at
            different stages of development.
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="mb-2 font-semibold text-slate-900">Vision</p>
              <p className="text-sm leading-7 text-slate-600">
                To be a centre for excellence in academic and moral integrity.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <p className="mb-2 font-semibold text-slate-900">Environment</p>
              <p className="text-sm leading-7 text-slate-600">
                Nurturing, disciplined, learner-focused, and supportive.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#fffaf2] p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                <ShieldCheck size={22} />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-slate-900">
                Core Values
              </h4>
              <p className="text-sm leading-8 text-slate-600">
                Discipline, honesty, professionalism, love, respect, and
                excellence are at the centre of the KES learning culture.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fffaf2] p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                <HeartHandshake size={22} />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-slate-900">
                Personal Attention
              </h4>
              <p className="text-sm leading-8 text-slate-600">
                We are committed to helping learners who need extra guidance by
                giving them special attention and encouragement.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}