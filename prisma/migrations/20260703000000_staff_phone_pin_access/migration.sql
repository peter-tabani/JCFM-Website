-- Add staff accounts for photo uploads. Existing user rows and credentials remain intact.
ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'staff';

ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;
ALTER TABLE "User" ADD COLUMN "loginPhone" TEXT;
ALTER TABLE "User" ADD COLUMN "pinHash" TEXT;
ALTER TABLE "User" ADD COLUMN "pinFailedAttempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "pinLockedUntil" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "mustChangePin" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "disabledAt" TIMESTAMP(3);

CREATE UNIQUE INDEX "User_loginPhone_key" ON "User"("loginPhone");
