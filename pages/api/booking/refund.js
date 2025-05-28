// pages/api/refund-booking.js
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
    const { chargeId, reason, bookingId } = req.body;

    // Validate required fields
    if (!chargeId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Charge ID is required for refund' 
      });
    }

    // Step 1: Get the original charge to verify it exists and get details
    console.log('Retrieving original charge:', chargeId);
    const originalCharge = await omise.charges.retrieve(chargeId);

    if (!originalCharge) {
      return res.status(404).json({
        success: false,
        error: 'Charge not found'
      });
    }

    if (originalCharge.status !== 'successful') {
      return res.status(400).json({
        success: false,
        error: 'Cannot refund unsuccessful charge'
      });
    }

    // Always refund the full amount
    const fullRefundAmount = originalCharge.amount;

    // Step 2: Create the refund for full amount
    console.log('Creating full refund for charge:', chargeId, 'Amount:', fullRefundAmount);
    const refund = await omise.charges.createRefund(chargeId, {
      amount: fullRefundAmount, // Full amount (already in smallest currency unit)
      reason: reason || 'Customer requested refund',
      metadata: {
        booking_id: bookingId,
        refund_reason: reason,
        refund_date: new Date().toISOString(),
        refund_type: 'full_refund',
        original_amount: originalCharge.amount,
      }
    });

    console.log('Refund created:', refund.id, 'Status:', refund.status);

    // Step 3: Check refund status
    if (refund.status === 'succeeded') {
      // Here you would typically:
      // 1. Update booking status in database
      // 2. Send refund confirmation email
      // 3. Update room availability if needed
      // 4. Log the refund for accounting

      console.log('Full refund successful!', {
        refundId: refund.id,
        chargeId: chargeId,
        refundAmount: refund.amount / 100,
        currency: refund.currency,
        bookingId: bookingId,
      });

      return res.status(200).json({
        success: true,
        refundId: refund.id,
        chargeId: chargeId,
        refundAmount: refund.amount / 100,
        currency: refund.currency,
        status: refund.status,
        bookingId: bookingId,
        refundType: 'full_refund',
        originalAmount: originalCharge.amount / 100,
        message: 'Full refund processed successfully',
        estimatedProcessingTime: '3-5 business days'
      });

    } else if (refund.status === 'pending') {
      return res.status(200).json({
        success: true,
        refundId: refund.id,
        chargeId: chargeId,
        refundAmount: refund.amount / 100,
        currency: refund.currency,
        status: refund.status,
        bookingId: bookingId,
        refundType: 'full_refund',
        originalAmount: originalCharge.amount / 100,
        message: 'Full refund is being processed',
        estimatedProcessingTime: '3-5 business days'
      });

    } else {
      console.log('Refund failed:', refund.failure_code, refund.failure_message);
      
      return res.status(400).json({
        success: false,
        error: refund.failure_message || 'Refund failed',
        failureCode: refund.failure_code,
        refundId: refund.id
      });
    }

  } catch (error) {
    console.error('Refund processing error:', error);
    
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
        message: process.env.NODE_ENV === 'development' ? error.message : 'Refund processing failed',
      });
    }
  }
}

// Helper function to get refund status
export async function getRefundStatus(chargeId, refundId) {
  try {
    const refund = await omise.charges.retrieveRefund(chargeId, refundId);
    return {
      success: true,
      refund: refund
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}