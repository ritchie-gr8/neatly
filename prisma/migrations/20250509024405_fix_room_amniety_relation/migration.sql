/*
  Warnings:

  - You are about to drop the column `room_id` on the `RoomAmniety` table. All the data in the column will be lost.
  - You are about to drop the column `amniety_id` on the `RoomTypes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomAmniety" DROP CONSTRAINT "RoomAmniety_room_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomTypes" DROP CONSTRAINT "RoomTypes_amniety_id_fkey";

-- AlterTable
ALTER TABLE "RoomAmniety" DROP COLUMN "room_id",
ADD COLUMN     "room_type_id" INTEGER;

-- AlterTable
ALTER TABLE "RoomTypes" DROP COLUMN "amniety_id";

-- AddForeignKey
ALTER TABLE "RoomAmniety" ADD CONSTRAINT "RoomAmniety_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "RoomTypes"("room_type_id") ON DELETE SET NULL ON UPDATE CASCADE;
