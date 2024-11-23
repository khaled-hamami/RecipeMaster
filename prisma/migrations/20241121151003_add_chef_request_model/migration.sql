/*
  Warnings:

  - You are about to drop the column `cv` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `diplomas` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cv",
DROP COLUMN "diplomas";

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "diplomas" BYTEA NOT NULL,
    "cv" BYTEA NOT NULL,
    "state" "State" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);
