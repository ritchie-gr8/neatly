import { db } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    // อัปเดต booking ที่หมดอายุเป็น CANCELLED แทนการลบ
    const result = await db.booking.updateMany({
      where: {
        bookingStatus: "PENDING",
        createdAt: { lt: fiveMinutesAgo },
        payments: { none: { paymentStatus: "PAID" } }
      },
      data: { bookingStatus: "CANCELLED" }
    });
    return res.status(200).json({ success: true, updated: result.count });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
} 