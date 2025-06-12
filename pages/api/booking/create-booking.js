import { db } from "@/lib/prisma";
import { number } from "zod";

const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log(req.body);
    // Using context way - expect data from getOmisePayload()
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

    // Step 1: Create a token from card information
    let charge;

    if (payment.method === "credit") {
      // Step 1: Create a token from card information
      console.log("Creating token...");
      const token = await omise.tokens.create({
        card: {
          name: payment.card.name,
          number: payment.card.number,
          expiration_month: parseInt(payment.card.expiration_month),
          expiration_year: parseInt(payment.card.expiration_year),
          security_code: payment.card.security_code,
        },
      });

      console.log("Token created:", token.id);

      // Step 2: Create a charge using the token
      console.log("Creating charge...");
      charge = await omise.charges.create({
        amount: payment.totalAmount * 100, // Already in satang from context
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
        },
      });
    } else {
      // For cash payment, no Omise processing needed
      console.log(
        "Cash payment selected - booking will be confirmed, payment pending"
      );
      charge = {
        status: "pending", // Changed from 'successful' to 'pending'
        amount: payment.totalAmount,
        currency: "thb",
      };
    }
    console.log("Charge created:", charge.id, "Status:", charge.status);

    // Check if charge was successful OR if it's a pending cash payment
    if (charge.status === "successful" || charge.status === "pending") {
      console.log("Processing booking - Payment status:", charge.status);

      // Step 3: Save booking data to database using context data
      const result = await db.$transaction(async (tx) => {
        // 3.1: Create or find Guest
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
        // 3.2: Update Booking
        const newBooking = await tx.booking.update({
          where: { id: booking.id },
          data: {
            updatedAt: new Date(),
            totalAmount: payment.totalAmount,
            bookingStatus: "CONFIRMED",
            additionalRequests: booking.additionalRequests || null,
          },
        });

        // 3.4: Update Payment record
        let paymentFromDb = await tx.payment.findFirst({
          where: {
            bookingId: newBooking.id,
          },
        });

        const paymentRecord = await tx.payment.update({
          where: { id: paymentFromDb.id },
          data: {
            amount: payment.totalAmount,
            paymentMethod: payment.method === "credit" ? "CREDIT_CARD" : "CASH",
            paymentStatus: payment.method === "credit" ? "PAID" : "PENDING", // CHANGED: Cash = PENDING
            omiseChargeId: payment.method === "credit" ? charge.id : null, // CHANGED: Cash = null
            paymentDate: payment.method === "credit" ? new Date() : null, // CHANGED: Cash = null (not paid yet)
            notes:
              payment.method === "credit"
                ? `Omise charge: ${charge.id}, Card holder: ${payment.card.name}`
                : "Cash payment - to be collected at hotel", // CHANGED: Different note for cash
          },
        });
        // 3.5: Create BookingAddons for special requests
        if (specialRequests && specialRequests.length > 0) {
          // was booking.specialRequests
          const addonPromises = specialRequests.map(
            (
              request // was booking.specialRequests
            ) =>
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
          amount: charge.amount / 100,
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
            totalAmount: result.booking.totalAmount,
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
      // General error (including database errors)
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