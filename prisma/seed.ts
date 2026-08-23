import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Bootstraps an initial admin account so you can sign in to /admin after the
// database is created. Idempotent, safe to run more than once.
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
          name: "Bishop Nelson Barasa Wanjala",
          role: "General Overseer & Founder",
          tag: "Founder",
          photo: null,
          featured: true,
          sortOrder: 0,
          email: "info@jcfm.online",
          quote: null,
          bio: "Bishop Nelson Barasa Wanjala is the founder and General Overseer of Jesus Christ Founder Ministry, which began in Sitikho Sikalame in 2005 and has grown into a network of branches across Kenya.",
        },
        {
          name: "Pastor Sarah N Wekesa",
          role: "Co-Founder & Pastor",
          tag: "Co-Founder",
          photo: null,
          sortOrder: 1,
          email: "info@jcfm.online",
          quote: null,
          bio: "Pastor Sarah N Wekesa co-founded Jesus Christ Founder Ministry and serves in pastoral leadership alongside Bishop Nelson, with a heart for women's and children's ministry.",
        },
        {
          name: "Pst. Irene M. Wafula",
          role: "Associate Pastor",
          tag: "Pastor",
          photo: null,
          sortOrder: 2,
          email: "info@jcfm.online",
          quote: null,
          bio: "Pastor Irene M. Wafula serves as an associate pastor, supporting worship, discipleship and pastoral care across the ministry.",
        },
        {
          name: "Rael H. Wafula",
          role: "Head Teacher, Fountain of Hope Academy",
          tag: "Head Teacher",
          photo: null,
          sortOrder: 3,
          email: "info@jcfm.online",
          quote: null,
          bio: "Rael H. Wafula is the Head Teacher of Fountain of Hope Academy, leading teaching and learning across the school.",
        },
      ],
    });
    console.log("Seeded leadership/team members.");
  } else {
    console.log(`Team already has ${existingTeam} members, left untouched.`);
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
