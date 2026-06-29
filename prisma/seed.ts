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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
