import { db } from "@/lib/prisma";

//Server-side price calculation function
async function calculateBookingTotal(bookingId, specialRequests = []) {
  try {
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        bookingRooms: {
          include: {
            roomType: true,
          },
        },
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    let totalAmount = 0;

    // Calculate room costs
    for (const bookingRoom of booking.bookingRooms) {
      const roomType = bookingRoom.roomType;
      // Use promotion price if available
      const dailyRate =
        roomType.isPromotion && roomType.promotionPrice
          ? Number(roomType.promotionPrice)
          : Number(roomType.pricePerNight);
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

      // Room total = daily rate × nights
      const roomTotal = dailyRate * nights;
      totalAmount += roomTotal;

      console.log(
        `Room calculation: ${dailyRate} × ${nights} nights = ${roomTotal}`
      );
    }

    // Calculate special requests/addons cost
    if (specialRequests && specialRequests.length > 0) {
      const addonTotal = specialRequests.reduce((sum, request) => {
        return sum + Number(request.price || 0);
      }, 0);
      totalAmount += addonTotal;
      console.log(`Addon total: ${addonTotal}`);
    }

    console.log(`Final calculated total: ${totalAmount}`);
    return totalAmount;
  } catch (error) {
    console.error("Price calculation error:", error);
    throw error;
  }
}

const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      guest: customer,
      booking,
      bookingRoom,
      specialRequests,
      payment,
    } = req.body;
    // Validate required fields
    if (!customer || !payment || !booking) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }
    //Calculate the REAL total amount on server-side
    const calculatedTotal = await calculateBookingTotal(
      booking.id,
      specialRequests
    );
    // SECURITY CHECK: Compare with frontend amount (optional warning)
    const frontendTotal = Number(payment.totalAmount);
    if (Math.abs(calculatedTotal - frontendTotal) > 0.01) {
      // Allow for small rounding differences
      return res.status(400).json({
        success: false,
        error: "Payment processing failed. Please try again.",
        code: "PAYMENT_ERROR",
      });
    }

    // Use the calculated total instead of frontend total
    const secureAmount = calculatedTotal;

    // Charge section for Omise
    let charge;
    if (payment.method === "credit") {
      const token = await omise.tokens.create({
        card: {
          name: payment.card.name,
          number: payment.card.number,
          expiration_month: parseInt(payment.card.expiration_month),
          expiration_year: parseInt(payment.card.expiration_year),
          security_code: payment.card.security_code,
        },
      });
      charge = await omise.charges.create({
        amount: secureAmount * 100,
        currency: "thb",
        card: token.id,
        description: `Hotel Booking - Room ${bookingRoom.roomId}`,
        metadata: {
          customer_name: `${customer.firstName} ${customer.lastName}`,
          customer_email: customer.email,
          customer_phone: customer.phone,
          check_in: booking.checkInDate,
          check_out: booking.checkOutDate,
          room_type: `Room ${bookingRoom.roomId}`,
          guests: booking.adults.toString(),
          calculated_amount: secureAmount.toString(),
          frontend_amount: frontendTotal.toString(),
        },
      });
    } else {
      // For cash payment
      charge = {
        status: "pending", // Changed from 'successful' to 'pending'
        amount: secureAmount, // Use calculated amount
        currency: "thb",
      };
    }

    // Check if charge was successful OR if it's a pending cash payment
    if (charge.status === "successful" || charge.status === "pending") {
      //Save booking data to database
      const result = await db.$transaction(async (tx) => {
        let guest = await tx.guest.findFirst({
          where: {
            id: parseInt(customer?.id || -1, 10),
          },
        });

        if (guest) {
          guest = await tx.guest.update({
            where: {
              id: guest.id,
            },
            data: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              phone: customer.phone,
              country: customer.country,
              dateOfBirth: customer.dateOfBirth
                ? new Date(customer.dateOfBirth)
                : null,
            },
          });
        } else {
          guest = await tx.guest.create({
            data: {
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              phone: customer.phone,
              country: customer.country,
              dateOfBirth: customer.dateOfBirth
                ? new Date(customer.dateOfBirth)
                : null,
            },
          });
        }
        //Update Booking
        const newBooking = await tx.booking.update({
          where: { id: booking.id },
          data: {
            updatedAt: new Date(),
            totalAmount: secureAmount,
            bookingStatus: "CONFIRMED",
            additionalRequests: booking.additionalRequests || null,
          },
        });

        //Update Payment record
        let paymentFromDb = await tx.payment.findFirst({
          where: {
            bookingId: newBooking.id,
          },
        });

        const paymentRecord = await tx.payment.update({
          where: { id: paymentFromDb.id },
          data: {
            amount: secureAmount,
            paymentMethod: payment.method === "credit" ? "CREDIT_CARD" : "CASH",
            paymentStatus: payment.method === "credit" ? "PAID" : "PENDING",
            omiseChargeId: payment.method === "credit" ? charge.id : null,
            paymentDate: payment.method === "credit" ? new Date() : null,
            notes:
              payment.method === "credit"
                ? `Omise charge: ${charge.id}, Card holder: ${payment.card.name}`
                : "Cash payment - to be collected at hotel",
          },
        });
        //Create BookingAddons for special requests
        if (specialRequests && specialRequests.length > 0) {
          const addonPromises = specialRequests.map((request) =>
            tx.bookingAddon.create({
              data: {
                bookingId: newBooking.id,
                addonName: request.displayName,
                quantity: 1,
                price: request.price,
              },
            })
          );
          await Promise.all(addonPromises);
        }

        return {
          booking: newBooking,
          guest: guest,
          bookingRoom: bookingRoom,
          payment: paymentRecord,
        };
      });

      console.log("Booking saved successfully:", {
        bookingId: result.booking.id,
        guestId: result.guest.id,
        chargeId: charge.id,
      });

      return res.status(200).json({
        success: true,
        data: {
          chargeId: payment.method === "credit" ? charge.id : null,
          bookingId: result.booking.id,
          amount: secureAmount,
          currency: charge.currency,
          status: charge.status,
          message:
            payment.method === "credit"
              ? "Payment processed and booking confirmed successfully"
              : "Booking confirmed - payment will be collected at hotel",
          booking: {
            bookingNumber: result.booking.bookingNumber,
            id: result.booking.id,
            checkIn: result.booking.checkIn,
            checkOut: result.booking.checkOut,
            totalAmount: secureAmount,
            guest: {
              name: `${result.guest.firstName} ${result.guest.lastName}`,
              email: result.guest.email,
            },
          },
        },
      });
    } else {
      console.log(
        "Payment failed:",
        charge.failure_code,
        charge.failure_message
      );

      return res.status(400).json({
        success: false,
        error: charge.failure_message || "Payment failed",
        failureCode: charge.failure_code,
      });
    }
  } catch (error) {
    console.error("Payment/Booking processing error:", error.message);

    // Handle different types of errors
    if (error.code) {
      // Omise API error
      return res.status(400).json({
        success: false,
        error: error.message,
        code: error.code,
      });
    } else {
      // General error
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Payment/Booking processing failed",
      });
    }
  }
}

// Optional: Add a webhook handler for payment status updates
export async function handleWebhook(req, res) {
  try {
    const event = req.body;

    console.log("Received webhook:", event.key, event.data.object);

    // Handle different event types
    switch (event.key) {
      case "charge.complete":
        console.log("Charge completed:", event.data.id);

        // Update payment status in database
        await db.payment.updateMany({
          where: {
            omiseChargeId: event.data.id,
          },
          data: {
            paymentStatus: "COMPLETED",
            paymentDate: new Date(),
            notes: `Webhook confirmation: ${event.data.id}`,
          },
        });
        break;

      case "charge.create":
        console.log("Charge created:", event.data.id);
        break;

      default:
        console.log("Unhandled event type:", event.key);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
