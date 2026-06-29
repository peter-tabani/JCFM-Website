-- CreateEnum
CREATE TYPE "SermonStatus" AS ENUM ('published', 'draft', 'scheduled');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('active', 'visitor', 'inactive');

-- CreateTable
CREATE TABLE "Sermon" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "series" TEXT,
    "preacher" TEXT NOT NULL,
    "branch" TEXT,
    "date" TIMESTAMP(3),
    "status" "SermonStatus" NOT NULL DEFAULT 'published',
    "mediaUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sermon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Member',
    "phone" TEXT,
    "email" TEXT,
    "status" "MemberStatus" NOT NULL DEFAULT 'active',
    "joinedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "date" TIMESTAMP(3),
    "imageUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sermon_status_date_idx" ON "Sermon"("status", "date");

-- CreateIndex
CREATE INDEX "Member_branch_idx" ON "Member"("branch");

-- CreateIndex
CREATE INDEX "Event_published_date_idx" ON "Event"("published", "date");
