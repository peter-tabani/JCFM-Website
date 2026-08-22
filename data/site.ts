export const siteData = {
  orgName: "Jesus Christ Founder Ministry",
  shortName: "JCFM",
  mission:
    "To expand the Kingdom of God by establishing socially and economically empowered communities.",
  motto: "Expanding the Kingdom, One Community at a Time",
  tagline: "A Christ-centered ministry rooted in Kenya",
  location: "Miritini, Mombasa",
  address: "Miritini, Mombasa County, Kenya",
  // Google Maps deep link for the current HQ — reused by Header, Footer & Contact.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Miritini%2C+Mombasa%2C+Kenya",
  formerLocation: "Nzoia, Bungoma",
  hqLabel: "Headquarters",
  founded: "2013",
  heroImage: "/images/hero/jcfm-hero.webp",
  generalOverseer: "Bishop Nelson Barasa Wanjala",
  coLeader: "Pastor Sarah N Wekesa",
  leadership: "Bishop Nelson Barasa Wanjala & Pastor Sarah N Wekesa",
  schoolName: "Fountain of Hope Academy",
  schoolHref: "/school",
  contacts: {
    bishop: { name: "Bishop Nelson Barasa Wanjala", role: "General Overseer" },
    coordinator: { name: "Pastor Sarah N Wekesa", role: "Co-Founder & Pastor" },
    associate: { name: "Pst. Irene M. Wafula", role: "Associate Pastor" },
  },
  email: "info@jcfm.online",
  hours: "Sundays · 9:00 AM – 1:00 PM",
  // Bank wire details for international donors live in server-only env
  // vars (BANK_*, see .env.example), not here — data/site.ts is checked
  // into git, and the account number shouldn't sit in version-control
  // history even though it's shown publicly on the site. See
  // components/donate/BankTransferDetails.tsx.
  // TODO: replace with JCFM's real profile URLs. Set any platform to ""
  // (empty string) to hide that icon instead of linking to a placeholder.
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    whatsapp: "",
  },
  branches: [
    { name: "Mombasa (HQ)", pastor: "Bishop Nelson Barasa Wanjala & Pastor Sarah N Wekesa", location: "Miritini, Mombasa", isHq: true },
    { name: "Tembelela", pastor: "Rev. Hosea Mabonga Simiyu", location: "Tembelela" },
    { name: "Siloam Mang'ana", pastor: "Wycliffe Simiyu Musawa Wekesa", location: "Mang'ana" },
    { name: "Sitikho Sikalame", pastor: "Pastor Joseph Simiyu", location: "East Sang'alo" },
    { name: "Chesamisi", pastor: "Pastor Isaiah Juyuba", location: "Chesamisi" },
    { name: "Makhonge Mayanja", pastor: "Pastor Mary N. Wamachari", location: "Mayanja (B) Location" },
    { name: "Chelekei", pastor: "Pastor Evans Nyongesa", location: "Chelekei" },
    { name: "Kimilili Rural", pastor: "Pastor Elizabeth", location: "Kimilili Ng'oli" },
    { name: "Mombasa (Jomvu)", pastor: "Pastor Festas Wafula Soita", location: "Jomvu, Mombasa" },
    // Appended (not inserted in the middle) so admin/branches' positional
    // FAKE[] seed-data mapping for the original 9 branches stays aligned.
    { name: "Nzoia (Former HQ)", pastor: "Bishop Nelson Barasa Wanjala & Pastor Sarah N Wekesa", location: "Nzoia, Bungoma", isHq: false },
  ],
  // Real routes (not hash anchors) so header/footer can stay mounted
  // ("frozen") across navigation instead of relying on same-page scrolling.
  // "Sermons" is folded into "Church Life" (/church) — there's no separate
  // sermons archive/content yet, so a standalone tab would be a dead end.
  // "Academy" is intentionally NOT a top-level tab — it's reached via the
  // "Our Academy School" link in the Footer's Contact column, which sends
  // visitors straight to /school (admissions/application & details).
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Journey", href: "/journey" },
    { label: "Mission Trips", href: "/mission-trips" },
    { label: "Branches", href: "/branches" },
    { label: "Church Life", href: "/church" },
    { label: "Contact", href: "/contact" },
    { label: "Donate", href: "/donate" },
  ],
  eventPosters: [
    {
      label: "Add Poster",
      note: "Drop the latest conference art",
      image: "/images/events/event1.jpeg",
    },
    {
      label: "Add Poster",
      note: "Youth, crusade or branch event",
      image: "/images/events/event2.jpeg",
    },
    {
      label: "Add Poster",
      note: "Academy or ministry highlight",
      image: "/images/events/event3.jpeg",
    },
  ],
  school: {
    name: "Fountain of Hope Academy",
    shortName: "Fountain of Hope",
    parent: "Jesus Christ Founder Ministry",
    motto: "Integrity, Courage, Excellence",
    tagline: "We are led by the design established by God (God first)",
    founded: "2014",
    location: "Nzoia, Bungoma County",
    type: "Day School · CBC Curriculum",
    levels: "Playgroup · ECDE · Primary · Junior School",
    motoVerse: {
      text: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
      ref: "Proverbs 22:6",
    },
    head: {
      name: "Mr. Patrick W. Wanyama",
      role: "Head Teacher",
      photo: "/images/staff/director.png",
    },
    contacts: {
      email: "info@fountainofhope.ac.ke",
    },
    schoolNav: [
      { label: "Home", href: "/school" },
      { label: "About", href: "/school#about" },
      { label: "Programs", href: "/school#programs" },
      { label: "Why Us", href: "/school#why" },
      { label: "School Life", href: "/school#life" },
      { label: "Faculty", href: "/school#faculty" },
      { label: "Admissions", href: "/school#admissions" },
      { label: "Gallery", href: "/school#gallery" },
      { label: "Contact", href: "/school#contact" },
    ],
    programs: [
      {
        code: "PG",
        name: "Playgroup & Pre-Primary",
        ages: "Ages 3 – 5",
        grades: "PP1 · PP2",
        desc: "A gentle, play-rich introduction to learning where little ones are loved, sung over and gradually prepared for Grade 1.",
        highlights: ["Phonics & numeracy", "Bible stories & songs", "Creative play & art", "Daily nap & snack"],
      },
      {
        code: "LP",
        name: "Lower Primary",
        ages: "Ages 6 – 8",
        grades: "Grade 1 · 2 · 3",
        desc: "The foundation years. We build strong reading, writing, mathematics and Christian character through the CBC framework.",
        highlights: ["English & Kiswahili literacy", "Mathematical Activities", "Environmental Activities", "CRE & Life Skills"],
      },
      {
        code: "UP",
        name: "Upper Primary",
        ages: "Ages 9 – 11",
        grades: "Grade 4 · 5 · 6",
        desc: "Pupils sharpen core competencies and discover talents in agriculture, science, creative arts and pre-tech studies.",
        highlights: ["Science & Technology", "Agriculture", "Creative Arts", "Home Science"],
      },
      {
        code: "JSS",
        name: "Junior School",
        ages: "Ages 12 – 14",
        grades: "Grade 7 · 8 · 9",
        desc: "Junior School (CBC) deepens learning across pre-tech, social studies, integrated science and prepares learners for senior school pathways.",
        highlights: ["Integrated Science", "Pre-Technical Studies", "Business Studies", "Computer Science"],
      },
    ],
    pillars: [
      {
        n: "01",
        title: "Faith at the Centre",
        desc: "Daily devotion, weekly chapel and biblical character formation are part of the school day &mdash; not extras.",
      },
      {
        n: "02",
        title: "Strong Academics",
        desc: "Full Competency-Based Curriculum (CBC) delivered by qualified, registered teachers with consistent assessment.",
      },
      {
        n: "03",
        title: "Affordable Excellence",
        desc: "We deliberately keep fees among the most reasonable in the region without cutting corners on quality.",
      },
      {
        n: "04",
        title: "Safe & Caring Home",
        desc: "Small classes, attentive staff and a security team help every learner feel safe, known and cared for.",
      },
      {
        n: "05",
        title: "Talent Discovery",
        desc: "Music, sports, drama, agriculture, ICT and creative arts &mdash; every learner is helped to find their gift.",
      },
      {
        n: "06",
        title: "Community & Service",
        desc: "Pupils serve their neighbours through outreach, gardening, Bible clubs and peer mentorship.",
      },
    ],
    schedule: [
      { time: "7:30 AM", activity: "Assembly · Devotion · Pledge" },
      { time: "8:00 AM", activity: "First learning block" },
      { time: "10:30 AM", activity: "Short break · Porridge" },
      { time: "10:50 AM", activity: "Second learning block" },
      { time: "1:00 PM", activity: "Lunch & rest" },
      { time: "2:00 PM", activity: "Afternoon learning block" },
      { time: "4:00 PM", activity: "Games · Clubs · Co-curricular" },
      { time: "5:00 PM", activity: "Dismissal" },
    ],
    coCurricular: [
      "Football & Athletics",
      "Music & Choir",
      "Drama & Public Speaking",
      "Scouts & Brigades",
      "ICT Club",
      "Bible Club",
      "Agriculture Club",
      "Creative Arts",
    ],
    faculty: [
      { name: "Mr. Patrick W. Wanyama", role: "Head Teacher", subject: "School Administration · CRE", photo: "/images/staff/director.png" },
      { name: "Madam Janet Nasimiyu", role: "Deputy Head Teacher", subject: "English · Literature", photo: "/images/staff/teacher-female.png" },
      { name: "Mr. Brian Wekesa", role: "Senior Teacher", subject: "Mathematics · Sciences", photo: "/images/staff/teacher-male.png" },
      { name: "Madam Faith Nekesa", role: "Director of Studies", subject: "Kiswahili · Social Studies", photo: "/images/staff/teacher-female.png" },
      { name: "Mr. Kevin Wafula", role: "Games Master", subject: "Physical Education · Agriculture", photo: "/images/staff/teacher-male.png" },
      { name: "Madam Phoebe Mulama", role: "ECDE Coordinator", subject: "Pre-Primary · Children's Ministry", photo: "/images/staff/teacher-female.png" },
    ],
    admissionSteps: [
      { n: "Step 1", title: "Enquire", desc: "Call or visit the school office to request an information pack and confirm vacancy in the desired class." },
      { n: "Step 2", title: "Fill the form", desc: "Collect and complete the admission form (also downloadable as PDF). Bring it with the required documents." },
      { n: "Step 3", title: "Interview & assessment", desc: "A short, friendly conversation with the learner and parents, plus a placement assessment for Grade 1 and above." },
      { n: "Step 4", title: "Pay & report", desc: "Pay the admission and term fees, collect the booklist, and report on the opening day." },
    ],
    requirements: [
      "Original & copy of birth certificate",
      "Most recent school report (Grade 1 and above)",
      "Two passport-size photos",
      "Copy of parent/guardian National ID",
      "Immunisation / health record",
      "NEMIS / UPI number (if previously enrolled)",
    ],
    fees: [
      { level: "Playgroup / PP1 / PP2", day: "KSh 6,500" },
      { level: "Grade 1 – 3 (Lower Primary)", day: "KSh 8,000" },
      { level: "Grade 4 – 6 (Upper Primary)", day: "KSh 9,000" },
      { level: "Grade 7 – 9 (Junior School)", day: "KSh 10,500" },
    ],
    calendar: [
      { term: "Term 1", dates: "Jan – Apr", note: "Opening service · Sports day" },
      { term: "Term 2", dates: "May – Aug", note: "Cultural week · Mid-year exam" },
      { term: "Term 3", dates: "Sep – Nov", note: "Prize-giving · Carol service" },
    ],
    testimonials: [
      {
        quote: "My daughter came home reciting Bible verses and reading whole sentences within one term. Fountain of Hope has truly become her second home.",
        name: "Mrs. Nasambu",
        role: "Parent · Grade 2",
      },
      {
        quote: "I love that I can play football, sing in the choir and still be top of my class. The teachers really care about us.",
        name: "Brenda C.",
        role: "Pupil · Grade 6",
      },
      {
        quote: "As a parent, the fees are honest, the food is good and my son is becoming a young man of faith. That is everything.",
        name: "Mr. Simiyu",
        role: "Parent · Grade 7 (JSS)",
      },
    ],
  },
};