-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'CASH');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'CANCELLED', 'FAILED');

-- CreateTable
CREATE TABLE "Bookings" (
    "booking_id" SERIAL NOT NULL,
    "booking_number" TEXT NOT NULL,
    "guest_id" INTEGER NOT NULL,
    "check_in_date" DATE NOT NULL,
    "check_out_date" DATE NOT NULL,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "additional_requests" TEXT,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "booking_status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "BookingRooms" (
    "booking_room_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    "room_type_id" INTEGER NOT NULL,
    "price_per_night" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingRooms_pkey" PRIMARY KEY ("booking_room_id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "payment_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transaction_id" TEXT,
    "omise_charge_id" TEXT,
    "payment_date" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "BookingAddons" (
    "booking_addon_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "addon_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingAddons_pkey" PRIMARY KEY ("booking_addon_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_booking_number_key" ON "Bookings"("booking_number");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "Guests"("guest_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRooms" ADD CONSTRAINT "BookingRooms_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRooms" ADD CONSTRAINT "BookingRooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRooms" ADD CONSTRAINT "BookingRooms_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "RoomTypes"("room_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingAddons" ADD CONSTRAINT "BookingAddons_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;
