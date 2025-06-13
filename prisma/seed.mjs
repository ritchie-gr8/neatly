import { PrismaClient } from "../lib/generated/prisma/index.js";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const ROOM_TYPES = [
  "Superior Garden View",
  "Deluxe",
  "Superior",
  "Supreme",
  "Premier Sea View",
  "Suite",
];
const PAYMENT_METHODS = ["CASH", "CREDIT_CARD"];
const BOOKING_STATUSES = ["CONFIRMED", "CHECKED_IN"];

async function main() {
  console.log("Seeding data...");

  // Load existing room types into a map for quick lookup
  const foundRoomTypes = await prisma.roomType.findMany();
  const roomTypes = {};
  for (const rt of foundRoomTypes) {
    roomTypes[rt.name] = rt;
  }

  // Load rooms with roomTypeId set, group by roomTypeId
  const allRooms = await prisma.room.findMany({
    where: { roomTypeId: { not: null } },
  });
  const roomsByType = {};
  for (const room of allRooms) {
    if (!roomsByType[room.roomTypeId]) {
      roomsByType[room.roomTypeId] = [];
    }
    roomsByType[room.roomTypeId].push(room);
  }

  // Counters
  let userCount = 0;
  let bookingCount = 0;
  let bookingRoomCount = 0;
  let paymentCount = 0;

  // Create Users
  const users = [];
  for (let i = 0; i < 100; i++) {
    const user = await prisma.user.create({
      data: {
        email: `${faker.internet.username()}_${i}@example.com`,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        passwordHash: faker.internet.password(),
        country: faker.location.country(),
      },
    });
    users.push(user);
    userCount++;
  }

  // Create Bookings + related data in one transaction per booking
  for (let i = 0; i < 100; i++) {
    try {
      await prisma.$transaction(async (prismaTx) => {
        const user = faker.helpers.arrayElement(users);
        const createdAt = faker.date.between({
          from: "2024-01-01",
          to: "2025-05-30",
        });
        const checkIn = faker.date.between({ from: createdAt, to: "2025-05-30" });
        const checkOut = faker.date.soon({
          days: faker.number.int({ min: 1, max: 5 }),
          refDate: checkIn,
        });

        // Create guest
        const guest = await prismaTx.guest.create({
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: faker.phone.number(),
            country: user.country,
            dateOfBirth: faker.date.birthdate({ min: 18, max: 70, mode: "age" }),
          },
        });

        // Create booking
        const booking = await prismaTx.booking.create({
          data: {
            createdAt,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            bookingStatus: faker.helpers.arrayElement(BOOKING_STATUSES),
            bookingNumber: faker.string.uuid(),
            totalAmount: faker.number.int({ min: 2500, max: 5000 }),
            userId: user.id,
            guest: { connect: { id: guest.id } },
          },
        });
        bookingCount++;

        // Create BookingRooms
        const numRooms = faker.number.int({ min: 1, max: 3 });
        for (let j = 0; j < numRooms; j++) {
          const roomTypeName = faker.helpers.arrayElement(ROOM_TYPES);
          const roomType = roomTypes[roomTypeName];
          if (!roomType) {
            console.warn(`RoomType "${roomTypeName}" not found. Skipping room.`);
            continue;
          }
          const roomsForType = roomsByType[roomType.id];
          if (!roomsForType || roomsForType.length === 0) {
            console.warn(`No rooms found for roomType "${roomTypeName}". Skipping room.`);
            continue;
          }
          const room = faker.helpers.arrayElement(roomsForType);

          await prismaTx.bookingRoom.create({
            data: {
              bookingId: booking.id,
              roomTypeId: roomType.id,
              roomId: room.id,
              pricePerNight: faker.number.float({ min: 1000, max: 5000, precision: 0.01 }),
            },
          });
          bookingRoomCount++;
        }

        // Create Payments
        const numPayments = faker.number.int({ min: 1, max: 2 });
        for (let j = 0; j < numPayments; j++) {
          await prismaTx.payment.create({
            data: {
              bookingId: booking.id,
              amount: faker.number.int({ min: 2500, max: 5000 }),
              paymentMethod: faker.helpers.arrayElement(PAYMENT_METHODS),
            },
          });
          paymentCount++;
        }
      });
    } catch (err) {
      console.error(`Error on iteration ${i + 1}, transaction rolled back:`, err);
      // No partial data created for this booking
    }

    // Throttle every 20 bookings
    if (i > 0 && i % 20 === 0) {
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  console.log("Seeding complete!");
  console.log(`Users created: ${userCount}`);
  console.log(`Bookings created: ${bookingCount}`);
  console.log(`BookingRooms created: ${bookingRoomCount}`);
  console.log(`Payments created: ${paymentCount}`);
}

main()
  .catch((e) => {
    console.error("Fatal error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());