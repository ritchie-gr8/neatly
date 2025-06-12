// pages/api/admin/customer-booking/customer-booking/[id].js - Individual booking details API
import { db } from '@/lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const booking = await db.booking.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
          guest: true,
          bookingRooms: {
            include: {
              room: {
                include: {
                  roomStatus: true
                }
              },
              roomType: {
                include: {
                  bedType: true,
                  roomImages: {
                    where: {
                      imageDefault: true
                    }
                  }
                }
              }
            }
          },
          payments: {
            orderBy: {
              createdAt: 'desc'
            }
          },
          bookingAddons: true
        }
      })

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        })
      }

      // Format detailed booking response
      const formattedBooking = {
        id: booking.id,
        bookingNumber: booking.bookingNumber,
        guest: {
          id: booking.guest.id,
          firstName: booking.guest.firstName,
          lastName: booking.guest.lastName,
          email: booking.guest.email,
          phone: booking.guest.phone,
          country: booking.guest.country,
          dateOfBirth: booking.guest.dateOfBirth
        },
        adults: booking.adults,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        totalAmount: booking.totalAmount,
        bookingStatus: booking.bookingStatus,
        additionalRequests: booking.additionalRequests,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        userId: booking.userId,
        roomDetails: booking.bookingRooms.map(br => ({
          id: br.id,
          room: {
            id: br.room.id,
            roomNumber: br.room.roomNumber,
            status: br.room.roomStatus?.statusName
          },
          roomType: {
            id: br.roomType.id,
            name: br.roomType.name,
            description: br.roomType.description,
            capacity: br.roomType.capacity,
            roomSize: br.roomType.roomSize,
            pricePerNight: br.roomType.pricePerNight?.toNumber(),
            promotionPrice: br.roomType.promotionPrice,
            isPromotion: br.roomType.isPromotion,
            bedType: {
              id: br.roomType.bedType?.id,
              bedDescription: br.roomType.bedType?.bedDescription
            },
            imageUrl: br.roomType.roomImages[0]?.imageUrl || br.roomType.imageUrl
          },
          pricePerNight: br.pricePerNight
        })),
        payments: booking.payments.map(payment => ({
          id: payment.id,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          paymentStatus: payment.paymentStatus,
          transactionId: payment.transactionId,
          omiseChargeId: payment.omiseChargeId,
          paymentDate: payment.paymentDate,
          notes: payment.notes
        })),
        addons: booking.bookingAddons.map(addon => ({
          id: addon.id,
          addonName: addon.addonName,
          quantity: addon.quantity,
          price: addon.price,
          notes: addon.notes
        }))
      }

      res.status(200).json({
        success: true,
        data: formattedBooking
      })

    } catch (error) {
      console.error('Error fetching booking details:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      })
    }
  } else if (req.method === 'PUT') {
    // Update booking status
    try {
      const { bookingStatus, additionalRequests } = req.body

      const updatedBooking = await db.booking.update({
        where: {
          id: parseInt(id)
        },
        data: {
          ...(bookingStatus && { bookingStatus }),
          ...(additionalRequests !== undefined && { additionalRequests }),
          updatedAt: new Date()
        },
        include: {
          guest: true,
          bookingRooms: {
            include: {
              roomType: {
                include: {
                  bedType: true
                }
              }
            }
          }
        }
      })

      res.status(200).json({
        success: true,
        message: 'Booking updated successfully',
        data: updatedBooking
      })

    } catch (error) {
      console.error('Error updating booking:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}