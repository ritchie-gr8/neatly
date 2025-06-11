import React, { useState, useEffect, useRef } from 'react'
import { Search, ArrowLeft, Calendar, Users, Bed, MapPin, CreditCard, X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "@/layouts/admin.layout";
import CustomPagination from "@/components/ui/custom-pagination";
import { useDebouce } from "@/hooks/useDebounce";
import { RiH4 } from 'react-icons/ri';

const CustomerBookingPage = () => {
  // State management
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const debouncedSearchTerm = useDebouce(searchTerm, 500)
  const itemsPerPage = 10

  // Fetch bookings from API
  const fetchBookings = async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchTerm.trim(),
        ...params
      }).toString()
      
      const response = await fetch(`/api/admin/customer-booking/customer-booking?${queryParams}`)
      const data = await response.json()
      
      if (data.success) {
        setBookings(data.data || [])
        setTotalPages(data.pagination?.totalPages || 0)
      } else {
        setError(data.message || 'Failed to fetch bookings')
        setBookings([])
        setTotalPages(0)
      }
    } catch (err) {
      setError('Failed to fetch bookings')
      setBookings([])
      setTotalPages(0)
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch single booking details
  const fetchBookingDetails = async (bookingId) => {
    try {
      const response = await fetch(`/api/admin/customer-booking/${bookingId}`)
      const data = await response.json()
      
      if (data.success) {
        setSelectedBooking(data.data)
      } else {
        setError(data.message || 'Failed to fetch booking details')
      }
    } catch (err) {
      setError('Failed to fetch booking details')
      console.error('Error fetching booking details:', err)
    }
  }

  // Fetch bookings when dependencies change
  useEffect(() => {
    if (!isInitialLoad) {
      fetchBookings();
    }

    // Mark initial load as complete after first run
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [currentPage, debouncedSearchTerm, isInitialLoad]);

  // Initial load
  useEffect(() => {
    fetchBookings()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const calculateStayDuration = (checkIn, checkOut) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleBookingClick = (booking) => {
    fetchBookingDetails(booking.id)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (e) => {
    setCurrentPage(1)
    setSearchTerm(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setCurrentPage(1)
  }

  // Booking detail view
  if (selectedBooking) {
    const stayDuration = calculateStayDuration(selectedBooking.checkInDate, selectedBooking.checkOutDate)
    const roomDetails = selectedBooking.roomDetails?.[0] || {}
    const roomPrice = roomDetails.pricePerNight || 0
    const addonPrice = selectedBooking.addons?.reduce((sum, addon) => sum + Number(addon.price), 0) || 0

    return (
      <AdminLayout>
        <div className="flex justify-between items-center py-6 mb-6 border-b border-brown-300 px-16 bg-white">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-gray-900 hover:text-gray-600 cursor-pointer"
              onClick={() => setSelectedBooking(null)}
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </Button>
            <h4 className="text-h5 font-semibold text-gray-900">
              {selectedBooking.guest.firstName} {selectedBooking.guest.lastName}
            </h4>
            <h4 className="text-h5 text-gray-900">
              {roomDetails.roomType?.name}
            </h4>
          </div>
        </div>

        <Card className="mx-16 px-20 rounded-none">
          <CardContent className="p-0 ">
            <div className="grid grid-cols-1 gap-8 ">
              <div className="space-y-6 pr-20 py-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Customer name</h3>
                  <p className="text-gray-900">{selectedBooking.guest.firstName} {selectedBooking.guest.lastName}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Guest(s)</h3>
                  <p className="text-gray-900">{selectedBooking.adults}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Room type</h3>
                  <p className="text-gray-900">{roomDetails.roomType?.name} Room</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Amount</h3>
                  <p className="text-gray-900">{selectedBooking.roomDetails?.length || 1} room{selectedBooking.roomDetails?.length > 1 ? 's' : ''}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Bed type</h3>
                  <p className="text-gray-900">{roomDetails.roomType?.bedType?.bedDescription}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Check-in</h3>
                  <p className="text-gray-900">{formatDate(selectedBooking.checkInDate)}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Check-out</h3>
                  <p className="text-gray-900">{formatDate(selectedBooking.checkOutDate)}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Stay (total)</h3>
                  <p className="text-gray-900">{stayDuration} night{stayDuration > 1 ? 's' : ''}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Booking date</h3>
                  <p className="text-gray-900">{formatDate(selectedBooking.createdAt)}</p>
                </div>
                </div>
              </div>
            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              {selectedBooking.payments?.[0] && (
                <div className="flex items-center justify-end space-x-2 text-sm text-gray-500 mb-4">
                  <span>Payment success via</span>
                  <CreditCard className="w-4 h-4" />
                  <span>{selectedBooking.payments[0].paymentMethod.replace('_', ' ')} - {selectedBooking.payments[0].transactionId}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{roomDetails.roomType?.name} Room</span>
                    <span className="text-gray-900">{Number(roomPrice || 0).toFixed(2)}</span>
                  </div>
                  
                  {selectedBooking.addons?.map((addon, index) => (
                    <div key={addon.id || index} className="flex justify-between items-center">
                      <span className="text-gray-700">{addon.addonName}</span>
                      <span className="text-gray-900">{Number(addon.price).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{formatCurrency(selectedBooking.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Requests */}
              {selectedBooking.additionalRequests && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Additional Request</h3>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-gray-700 text-sm">{selectedBooking.additionalRequests}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-4 bg-white">
        <h5 className="text-h5 font-semibold text-gray-900">
          Customer Booking
        </h5>
        <div className="flex items-center gap-4">
          <form className="relative w-[320px] text-gray-900 text-b1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={16}
            />
            <Input
              className="pl-10 pr-10 bg-white placeholder:text-gray-600"
              placeholder="Search customer name..."
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search bookings"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>
      </div>

      <Card className="mx-16 p-0 overflow-visible rounded-none">
        <CardContent className="p-0">
          {error && (
            <div className="p-4 text-red-500 text-center bg-red-50">
              {error}
            </div>
          )}
          
          <table className="w-full">
            <thead>
              <tr className="h-[42px]">
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300 pl-4">
                  Customer name
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Guest(s)
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Room type
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Amount
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Bed Type
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Check-in
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300 pr-4">
                  Check-out
                </th>
              </tr>
            </thead>
            <tbody className="text-util-black">
              {loading ? (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr
                      key={index}
                      className="py-6 h-[60px] border-b border-gray-300"
                    >
                      {Array.from({ length: 7 }).map((_, colIndex) => (
                        <td key={colIndex} className={`${colIndex === 0 ? "pl-4" : ""} ${colIndex === 6 ? "pr-4" : ""}`}>
                          <Skeleton className="h-4 w-20 rounded-xl" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : !Array.isArray(bookings) || bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    {searchTerm ? (
                      <>No bookings found matching "{searchTerm}"</>
                    ) : (
                      "No bookings found."
                    )}
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr 
                    key={booking.id}
                    onClick={() => handleBookingClick(booking)}
                    className="py-6 h-[60px] border-b hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="pl-4">
                      {booking.guest.firstName} {booking.guest.lastName}
                    </td>
                    <td>
                      {booking.adults}
                    </td>
                    <td>
                      {booking.roomType?.name || 'N/A'}
                    </td>
                    <td>
                      {booking.bookingRooms?.length || 1}
                    </td>
                    <td>
                      {booking.roomType?.bedType?.bedDescription || 'N/A'}
                    </td>
                    <td>
                      {formatDate(booking.checkInDate)}
                    </td>
                    <td className="pr-4">
                      {formatDate(booking.checkOutDate)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center py-4 mt-8">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </AdminLayout>
  )
}

export default CustomerBookingPage