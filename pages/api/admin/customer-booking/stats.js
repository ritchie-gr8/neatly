// pages/api/admin/customer-booking/stats.js - Booking statistics API
import { db } from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { dateFrom, dateTo } = req.query

      // Build date filter
      const dateFilter = {}
      if (dateFrom || dateTo) {
        dateFilter.createdAt = {}
        if (dateFrom) dateFilter.createdAt.gte = new Date(dateFrom)
        if (dateTo) dateFilter.createdAt.lte = new Date(dateTo)
      }

      // Get booking statistics
      const [
        totalBookings,
        confirmedBookings,
        pendingBookings,
        cancelledBookings,
        checkedInBookings,
        checkedOutBookings,
        totalRevenue
      ] = await Promise.all([
        db.booking.count({ where: dateFilter }),
        db.booking.count({ where: { ...dateFilter, bookingStatus: 'CONFIRMED' } }),
        db.booking.count({ where: { ...dateFilter, bookingStatus: 'PENDING' } }),
        db.booking.count({ where: { ...dateFilter, bookingStatus: 'CANCELLED' } }),
        db.booking.count({ where: { ...dateFilter, bookingStatus: 'CHECKED_IN' } }),
        db.booking.count({ where: { ...dateFilter, bookingStatus: 'CHECKED_OUT' } }),
        db.booking.aggregate({
          where: {
            ...dateFilter,
            bookingStatus: { not: 'CANCELLED' }
          },
          _sum: {
            totalAmount: true
          }
        })
      ])

      // Get popular room types
      const popularRoomTypes = await db.bookingRoom.groupBy({
        by: ['roomTypeId'],
        _count: {
          roomTypeId: true
        },
        orderBy: {
          _count: {
            roomTypeId: 'desc'
          }
        },
        take: 5
      })

      // Get room type details for popular rooms
      const roomTypeDetails = await db.roomType.findMany({
        where: {
          id: {
            in: popularRoomTypes.map(rt => rt.roomTypeId)
          }
        },
        select: {
          id: true,
          name: true
        }
      })

      const popularRoomTypesWithDetails = popularRoomTypes.map(prt => ({
        roomType: roomTypeDetails.find(rtd => rtd.id === prt.roomTypeId),
        bookingCount: prt._count.roomTypeId
      }))

      res.status(200).json({
        success: true,
        data: {
          overview: {
            totalBookings,
            confirmedBookings,
            pendingBookings,
            cancelledBookings,
            checkedInBookings,
            checkedOutBookings,
            totalRevenue: totalRevenue._sum.totalAmount || 0
          },
          popularRoomTypes: popularRoomTypesWithDetails
        }
      })

    } catch (error) {
      console.error('Error fetching booking statistics:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}