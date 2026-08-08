import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Bootstraps an initial admin account so you can sign in to /admin after the
// database is created. Idempotent — safe to run more than once.
//
// Run with:  npx prisma db seed
// Override the defaults with env vars:
//   SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.SEED_ADMIN_EMAIL || "admin@jcfm.org").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const name = process.env.SEED_ADMIN_NAME || "JCFM Administrator";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { role: "admin" },
    create: { email, name, passwordHash, role: "admin" },
  });

  console.log(`Seeded admin account: ${email}`);
  console.log(
    "If this was a fresh create, sign in with the password from " +
      "SEED_ADMIN_PASSWORD (default: ChangeMe123!) and change it."
  );

  // Seed the public Leadership/Team list from the original 5 leaders, but only
  // if the table is empty (so we never overwrite admin edits).
  const existingTeam = await prisma.teamMember.count();
  if (existingTeam === 0) {
    await prisma.teamMember.createMany({
      data: [
        {
          name: "Rev. Noah Mweruphe",
          role: "Senior Pastor & Founder",
          tag: "Founder & Pastor",
          photo: "/images/staff/director.png",
          featured: true,
          sortOrder: 0,
          email: "info@jcfm.org",
          quote: "Our calling is to build lives through Christ — in the church, in the classroom, and in the community.",
          bio: "Rev. Noah Mweruphe is the visionary founder and senior pastor of Jesus Christ Founder Ministry. Since establishing JCFM in 2005, he has led a mission to build lives through Christ — nurturing souls through worship and educating minds from early childhood through junior secondary.",
        },
        {
          name: "Mr. Julius Mwaro",
          role: "Head of Institution — Primary School",
          tag: "Primary School",
          photo: "/images/staff/mwaro.png",
          sortOrder: 1,
          email: "info@jcfm.org",
          quote: "A strong primary foundation rooted in faith is the launchpad for everything a child will achieve in life.",
          bio: "Mr. Julius Mwaro leads the Primary School (Grade 1–6), overseeing the Competency-Based Curriculum (CBC) and ensuring every learner achieves their full potential, with academic excellence and strong Biblical character going hand in hand.",
        },
        {
          name: "Mr. Idd Amani",
          role: "Head of Institution — Junior Secondary",
          tag: "Junior Secondary",
          photo: "/images/staff/idd.png",
          sortOrder: 2,
          email: "info@jcfm.org",
          quote: "Junior secondary is where young people discover who they are in Christ.",
          bio: "Mr. Idd Amani leads the Junior Secondary School (Grade 7–9), preparing learners for the KJSEA. His focus is developing critical thinkers and responsible young adults grounded in Christian values.",
        },
        {
          name: "Md. Phoebe N. Mulama",
          role: "Head of Institution — Early Years",
          tag: "ECDE",
          photo: "/images/staff/pheobe.png",
          sortOrder: 3,
          email: "info@jcfm.org",
          quote: "The early years shape everything. Every smile, every discovery, every small step in faith matters deeply.",
          bio: "Md. Phoebe N. Mulama leads the Early Years (ECDE) department, nurturing children from age 3 through PP1 and PP2 in a warm, Christ-centered environment.",
        },
        {
          name: "Mr. Mazera Dena",
          role: "Academic Master",
          tag: "Academics",
          photo: "/images/staff/mazera.png",
          sortOrder: 4,
          email: "info@jcfm.org",
          quote: "Academic excellence rooted in faith is about building a culture where every learner believes they can achieve.",
          bio: "Mr. Mazera Dena serves as Academic Master, overseeing academic programmes across all levels, coordinating curriculum delivery and monitoring learner performance.",
        },
      ],
    });
    console.log("Seeded 5 leadership/team members.");
  } else {
    console.log(`Team already has ${existingTeam} members — left untouched.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
