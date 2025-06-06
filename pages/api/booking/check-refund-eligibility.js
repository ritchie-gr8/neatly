// pages/api/booking/check-refund-eligibility.js

import omise from 'omise';

const omiseClient = omise({
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { chargeId } = req.body;

  if (!chargeId) {
    return res.status(400).json({ success: false, error: 'Missing chargeId' });
  }

  try {
    const charge = await omiseClient.charges.retrieve(chargeId);

    const chargeCreatedAt = new Date(charge.created * 1000);
    const now = new Date();
    const diffHours = (now - chargeCreatedAt) / (1000 * 60 * 60);

    const eligible = diffHours <= 24;

    return res.status(200).json({
      success: true,
      eligible,
      maxRefund: eligible ? charge.amount : 0,
      originalAmount: charge.amount,
      message: eligible
        ? 'Refund is eligible within 24 hours after payment.'
        : 'Refund not allowed. More than 24 hours have passed.',
    });

  } catch (error) {
    console.error('Error checking refund eligibility:', error);
    return res.status(500).json({ success: false, error: 'Failed to verify refund eligibility' });
  }
}
