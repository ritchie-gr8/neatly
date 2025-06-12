/*
  Warnings:

  - You are about to drop the column `amniety_id` on the `RoomAmniety` table. All the data in the column will be lost.
  - You are about to drop the `AmnietyMaster` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `RoomAmniety` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoomAmniety" DROP CONSTRAINT "RoomAmniety_amniety_id_fkey";

-- AlterTable
ALTER TABLE "RoomAmniety" DROP COLUMN "amniety_id",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RoomImages" ADD COLUMN     "image_public_id" TEXT;

-- DropTable
DROP TABLE "AmnietyMaster";
