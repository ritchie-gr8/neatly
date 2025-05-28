// pages/api/create-payment.js
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
    const { amount, currency, booking, payment, description } = req.body;

    // Validate required fields
    if (!amount || !currency || !booking || !payment) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Step 1: Create a token from card information
    console.log('Creating token...');
    const token = await omise.tokens.create({
      card: {
        name: payment.holderName,
        number: payment.cardNumber,
        expiration_month: parseInt(payment.expiryMonth),
        expiration_year: parseInt(payment.expiryYear),
        security_code: payment.cvv,
      },
    });

    console.log('Token created:', token.id);

    // Step 2: Create a charge using the token
    console.log('Creating charge...');
    const charge = await omise.charges.create({
      amount: amount * 100, // Convert to smallest currency unit (satang for THB)
      currency: currency,
      card: token.id,
      description: description,
      metadata: {
        booking_id: `booking_${Date.now()}`,
        customer_name: booking.customerName,
        customer_email: booking.customerEmail,
        customer_phone: booking.customerPhone,
        check_in: booking.checkIn,
        check_out: booking.checkOut,
        room_type: booking.roomType,
        guests: booking.guests.toString(),
      },
    });

    console.log('Charge created:', charge.id, 'Status:', charge.status);

    // Check if charge was successful
    if (charge.status === 'successful') {
      // Here you would typically:
      // 1. Save booking to database
      // 2. Send confirmation email
      // 3. Update room availability
      
      console.log('Payment successful! Booking details:', {
        chargeId: charge.id,
        amount: charge.amount / 100,
        currency: charge.currency,
        customer: booking.customerName,
        room: booking.roomType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      });

      return res.status(200).json({
        success: true,
        chargeId: charge.id,
        amount: charge.amount / 100,
        currency: charge.currency,
        status: charge.status,
        bookingId: charge.metadata.booking_id,
        message: 'Payment processed successfully',
      });
    } else {
      console.log('Payment failed:', charge.failure_code, charge.failure_message);
      
      return res.status(400).json({
        success: false,
        error: charge.failure_message || 'Payment failed',
        failureCode: charge.failure_code,
      });
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    
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
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Payment processing failed',
      });
    }
  }
}

// Optional: Add a webhook handler for payment status updates
export async function handleWebhook(req, res) {
  // This would be a separate endpoint like /api/omise-webhook
  try {
    const event = req.body;
    
    console.log('Received webhook:', event.key, event.data.object);
    
    // Handle different event types
    switch (event.key) {
      case 'charge.complete':
        // Handle successful payment
        console.log('Charge completed:', event.data.id);
        // Update booking status in database
        break;
        
      case 'charge.create':
        // Handle charge creation
        console.log('Charge created:', event.data.id);
        break;
        
      default:
        console.log('Unhandled event type:', event.key);
    }
    
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}