-- AlterTable
ALTER TABLE "ChatbotResponses" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RoomTypeResponses" ADD COLUMN     "reply_title" TEXT NOT NULL DEFAULT '';
