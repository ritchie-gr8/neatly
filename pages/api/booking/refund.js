import { db } from "@/lib/prisma";

const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingId } = req.body;

    // Validate required fields
    if (!bookingId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Booking ID is required' 
      });
    }

    console.log(`Processing refund for booking ID: ${bookingId}`);

    // Step 1: Get booking and payment information
    const bookingData = await db.booking.findUnique({
      where: { id: parseInt(bookingId) },
      include: {
        guest: true,
        bookingRooms: {
          include: {
            room: true
          }
        },
        bookingAddons: true,
        payments: {
          where: {
            paymentStatus: 'PAID'
          }
        }
      }
    });

    if (!bookingData) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (bookingData.bookingStatus === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        error: 'Booking is already cancelled'
      });
    }

    const payment = bookingData.payments[0];
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'No paid payment found for this booking'
      });
    }

    let refund = null;

    // Step 2: Process refund based on payment method using chargeId from payment data
if (payment.paymentMethod === 'CREDIT_CARD' && payment.omiseChargeId && !payment.omiseChargeId.startsWith('cash_')) {
  console.log('Processing Omise refund with chargeId:', payment.omiseChargeId);
  
  try {
    // Create refund through Omise using chargeId from payment data
    refund = await omise.charges.createRefund(payment.omiseChargeId, {
      amount: payment.amount * 100, // Convert to satang (Thai currency smallest unit)
      reason: 'Customer requested refund',
      metadata: {
        booking_id: bookingId,
        refund_reason: 'User requested refund',
        refund_date: new Date().toISOString(),
        refund_type: 'full_refund',
        original_amount: payment.amount * 100,
      }
    });

    console.log('Omise refund created:', refund.id, 'Status:', refund.status);
  } catch (omiseError) {
    console.error('Omise refund error:', omiseError);
    return res.status(400).json({
      success: false,
      error: 'Failed to process refund through payment gateway',
      details: omiseError.message
    });
  }
} else {
  console.log('Cash payment - no gateway refund needed');
  // For cash payments, create a mock refund object
  refund = {
    id: `cash_refund_${Date.now()}`,
    status: 'succeeded',
    amount: payment.amount * 100
  };
}

    // Step 3: Update database in transaction - delete related data and update statuses
    const result = await db.$transaction(async (tx) => {
      // 3.1: Delete BookingAddons (similar to create-booking process)
      if (bookingData.bookingAddons.length > 0) {
        await tx.bookingAddon.deleteMany({
          where: {
            bookingId: parseInt(bookingId)
          }
        });
        console.log(`Deleted ${bookingData.bookingAddons.length} booking addons`);
      }

      // 3.2: Delete BookingRooms (similar to create-booking process)
      if (bookingData.bookingRooms.length > 0) {
        await tx.bookingRoom.deleteMany({
          where: {
            bookingId: parseInt(bookingId)
          }
        });
        console.log(`Deleted ${bookingData.bookingRooms.length} booking rooms`);
      }

      // 3.3: Update Payment record to REFUNDED status (keep the record for audit)
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: {
          paymentStatus: 'REFUNDED',
          notes: `${payment.notes || ''} | Refunded: ${refund.id} | User requested refund`,
          updatedAt: new Date()
        }
      });

      // 3.4: Update Booking status to CANCELLED (not delete, just update status)
      const updatedBooking = await tx.booking.update({
        where: { id: parseInt(bookingId) },
        data: {
          bookingStatus: 'CANCELLED',
          updatedAt: new Date()
        }
      });

      return {
        booking: updatedBooking,
        payment: updatedPayment,
        refund: refund
      };
    });

    console.log('Refund processed successfully:', {
      bookingId: result.booking.id,
      paymentId: result.payment.id,
      refundId: refund.id,
      status: refund.status
    });

    return res.status(200).json({
      success: true,
      data: {
        bookingId: result.booking.id,
        refundId: refund.id,
        amount: refund.amount / 100,
        currency: 'thb',
        status: refund.status,
        message: 'Booking cancelled and refund processed successfully',
        booking: {
          bookingNumber: result.booking.bookingNumber,
          status: result.booking.bookingStatus,
          guest: {
            name: `${bookingData.guest.firstName} ${bookingData.guest.lastName}`,
            email: bookingData.guest.email
          }
        }
      }
    });

  } catch (error) {
    console.error('Refund processing error:', error.message);
    
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
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Refund processing failed',
      });
    }
  }
}

// Optional: Add a webhook handler for refund status updates
export async function handleRefundWebhook(req, res) {
  try {
    const event = req.body;
    
    console.log('Received refund webhook:', event.key, event.data.object);
    
    // Handle different event types
    switch (event.key) {
      case 'refund.create':
        console.log('Refund created:', event.data.id);
        
        // Update payment notes with refund confirmation
        await db.payment.updateMany({
          where: {
            omiseChargeId: event.data.charge
          },
          data: {
            notes: db.raw(`CONCAT(COALESCE(notes, ''), ' | Refund webhook confirmed: ${event.data.id}')`)
          }
        });
        break;
        
      default:
        console.log('Unhandled refund event type:', event.key);
    }
    
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Refund webhook error:', error);
    return res.status(500).json({ error: 'Refund webhook processing failed' });
  }
}