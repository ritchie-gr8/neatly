-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "BedType" (
    "bed_type_id" SERIAL NOT NULL,
    "bed_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BedType_pkey" PRIMARY KEY ("bed_type_id")
);

-- CreateTable
CREATE TABLE "AmnietyMaster" (
    "amniety_id" SERIAL NOT NULL,
    "amniety_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AmnietyMaster_pkey" PRIMARY KEY ("amniety_id")
);

-- CreateTable
CREATE TABLE "RoomStatus" (
    "room_status_id" SERIAL NOT NULL,
    "status_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomStatus_pkey" PRIMARY KEY ("room_status_id")
);

-- CreateTable
CREATE TABLE "RoomTypes" (
    "room_type_id" SERIAL NOT NULL,
    "bed_type_id" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "capacity" INTEGER,
    "room_size" INTEGER,
    "price_per_night" DECIMAL(10,2),
    "promotion_price" DECIMAL(10,2),
    "is_promotion" BOOLEAN DEFAULT false,
    "amniety_id" INTEGER,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomTypes_pkey" PRIMARY KEY ("room_type_id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "room_id" SERIAL NOT NULL,
    "room_number" TEXT,
    "room_type_id" INTEGER,
    "room_status_id" INTEGER,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "RoomAmniety" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER,
    "amniety_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomAmniety_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guests" (
    "guest_id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "date_of_birth" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guests_pkey" PRIMARY KEY ("guest_id")
);

-- CreateTable
CREATE TABLE "HotelMaster" (
    "hotel_id" SERIAL NOT NULL,
    "hotel_name" TEXT,
    "hotel_description" TEXT,
    "hotel_logo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HotelMaster_pkey" PRIMARY KEY ("hotel_id")
);

-- CreateTable
CREATE TABLE "RoomImages" (
    "image_id" SERIAL NOT NULL,
    "room_type_id" INTEGER,
    "image_url" TEXT,
    "image_order" INTEGER,
    "image_default" BOOLEAN DEFAULT false,

    CONSTRAINT "RoomImages_pkey" PRIMARY KEY ("image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "RoomTypes" ADD CONSTRAINT "RoomTypes_bed_type_id_fkey" FOREIGN KEY ("bed_type_id") REFERENCES "BedType"("bed_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTypes" ADD CONSTRAINT "RoomTypes_amniety_id_fkey" FOREIGN KEY ("amniety_id") REFERENCES "AmnietyMaster"("amniety_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "RoomTypes"("room_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_room_status_id_fkey" FOREIGN KEY ("room_status_id") REFERENCES "RoomStatus"("room_status_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAmniety" ADD CONSTRAINT "RoomAmniety_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "RoomTypes"("room_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAmniety" ADD CONSTRAINT "RoomAmniety_amniety_id_fkey" FOREIGN KEY ("amniety_id") REFERENCES "AmnietyMaster"("amniety_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomImages" ADD CONSTRAINT "RoomImages_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "RoomTypes"("room_type_id") ON DELETE SET NULL ON UPDATE CASCADE;
