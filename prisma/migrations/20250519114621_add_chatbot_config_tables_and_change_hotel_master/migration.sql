/*
  Warnings:

  - You are about to drop the column `hotel_logo` on the `HotelMaster` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReplyFormat" AS ENUM ('MESSAGE', 'ROOMTYPES', 'OPTIONS');

-- CreateEnum
CREATE TYPE "MessageSender" AS ENUM ('USER', 'BOT', 'ADMIN');

-- AlterTable
ALTER TABLE "HotelMaster" DROP COLUMN "hotel_logo",
ADD COLUMN     "hotel_url" TEXT,
ADD COLUMN     "hotel_url_public_id" TEXT;

-- CreateTable
CREATE TABLE "ChatbotConfig" (
    "chatbot_config_id" SERIAL NOT NULL,
    "greeting_message" TEXT NOT NULL,
    "auto_reply_message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatbotConfig_pkey" PRIMARY KEY ("chatbot_config_id")
);

-- CreateTable
CREATE TABLE "ChatbotResponses" (
    "chatbot_response_id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "reply_format" "ReplyFormat" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatbotResponses_pkey" PRIMARY KEY ("chatbot_response_id")
);

-- CreateTable
CREATE TABLE "MessageResponses" (
    "message_response_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "response_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageResponses_pkey" PRIMARY KEY ("message_response_id")
);

-- CreateTable
CREATE TABLE "RoomTypeResponses" (
    "room_type_response_id" SERIAL NOT NULL,
    "button_name" TEXT NOT NULL,
    "response_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomTypeResponses_pkey" PRIMARY KEY ("room_type_response_id")
);

-- CreateTable
CREATE TABLE "RoomTypeOnResponses" (
    "room_type_on_response_id" SERIAL NOT NULL,
    "room_type_id" INTEGER NOT NULL,
    "room_type_response_id" INTEGER NOT NULL,

    CONSTRAINT "RoomTypeOnResponses_pkey" PRIMARY KEY ("room_type_on_response_id")
);

-- CreateTable
CREATE TABLE "OptionsResponses" (
    "options_response_id" SERIAL NOT NULL,
    "reply_title" TEXT NOT NULL,
    "response_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OptionsResponses_pkey" PRIMARY KEY ("options_response_id")
);

-- CreateTable
CREATE TABLE "Options" (
    "option_id" SERIAL NOT NULL,
    "option_text" TEXT NOT NULL,
    "details_text" TEXT NOT NULL,
    "options_response_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "ChatSessions" (
    "chat_session_id" SERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "user_id" INTEGER,
    "title" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "needs_handoff" BOOLEAN NOT NULL DEFAULT false,
    "handoff_reason" TEXT,
    "admin_joined" BOOLEAN NOT NULL DEFAULT false,
    "admin_id" INTEGER,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_message_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatSessions_pkey" PRIMARY KEY ("chat_session_id")
);

-- CreateTable
CREATE TABLE "ChatMessages" (
    "chat_message_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "sender" "MessageSender" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" INTEGER NOT NULL,
    "admin_id" INTEGER,

    CONSTRAINT "ChatMessages_pkey" PRIMARY KEY ("chat_message_id")
);

-- CreateTable
CREATE TABLE "AdminChatNotifications" (
    "admin_notification_id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "assigned_to_admin" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminChatNotifications_pkey" PRIMARY KEY ("admin_notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageResponses_response_id_key" ON "MessageResponses"("response_id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomTypeResponses_response_id_key" ON "RoomTypeResponses"("response_id");

-- CreateIndex
CREATE UNIQUE INDEX "OptionsResponses_response_id_key" ON "OptionsResponses"("response_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatSessions_session_id_key" ON "ChatSessions"("session_id");

-- CreateIndex
CREATE INDEX "ChatSessions_user_id_last_message_at_idx" ON "ChatSessions"("user_id", "last_message_at" DESC);

-- CreateIndex
CREATE INDEX "ChatMessages_session_id_timestamp_idx" ON "ChatMessages"("session_id", "timestamp" DESC);

-- CreateIndex
CREATE INDEX "AdminChatNotifications_is_read_created_at_idx" ON "AdminChatNotifications"("is_read", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "MessageResponses" ADD CONSTRAINT "MessageResponses_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "ChatbotResponses"("chatbot_response_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTypeResponses" ADD CONSTRAINT "RoomTypeResponses_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "ChatbotResponses"("chatbot_response_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTypeOnResponses" ADD CONSTRAINT "RoomTypeOnResponses_room_type_response_id_fkey" FOREIGN KEY ("room_type_response_id") REFERENCES "RoomTypeResponses"("room_type_response_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionsResponses" ADD CONSTRAINT "OptionsResponses_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "ChatbotResponses"("chatbot_response_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_options_response_id_fkey" FOREIGN KEY ("options_response_id") REFERENCES "OptionsResponses"("options_response_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessages" ADD CONSTRAINT "ChatMessages_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "ChatSessions"("chat_session_id") ON DELETE CASCADE ON UPDATE CASCADE;
