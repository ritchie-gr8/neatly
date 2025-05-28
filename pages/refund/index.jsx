import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, CreditCard, Calendar, DollarSign, Info } from 'lucide-react';

const RefundBookingPage = () => {
  const [formData, setFormData] = useState({
    chargeId: '',
    reason: '',
    bookingId: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/booking/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chargeId: formData.chargeId,
          reason: formData.reason,
          bookingId: formData.bookingId
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Refund processing failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      chargeId: '',
      reason: '',
      bookingId: ''
    });
    setResult(null);
    setError(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Refund Center</h1>
          <p className="text-gray-600">Process refunds for hotel bookings with automatic policy calculation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Refund Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Process Refund
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="chargeId" className="block text-sm font-medium text-gray-700 mb-2">
                    Charge ID *
                  </label>
                  <input
                    type="text"
                    id="chargeId"
                    name="chargeId"
                    value={formData.chargeId}
                    onChange={handleInputChange}
                    required
                    placeholder="chrg_xxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="bookingId" className="block text-sm font-medium text-gray-700 mb-2">
                    Booking ID
                  </label>
                  <input
                    type="text"
                    id="bookingId"
                    name="bookingId"
                    value={formData.bookingId}
                    onChange={handleInputChange}
                    placeholder="Optional booking reference"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Refund Reason
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a reason</option>
                    <option value="Customer requested refund">Customer requested refund</option>
                    <option value="Hotel cancellation">Hotel cancellation</option>
                    <option value="Emergency cancellation">Emergency cancellation</option>
                    <option value="Travel restrictions">Travel restrictions</option>
                    <option value="Medical emergency">Medical emergency</option>
                    <option value="Double booking">Double booking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !formData.chargeId}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Process Refund'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Policy Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Refund Policy
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-700">7+ days before</div>
                    <div className="text-gray-600">95% refund (5% processing fee)</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-yellow-700">3-6 days before</div>
                    <div className="text-gray-600">75% refund</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-orange-700">1-2 days before</div>
                    <div className="text-gray-600">50% refund</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-red-700">Same day or later</div>
                    <div className="text-gray-600">No refund</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="text-red-800 font-medium">Refund Failed</h3>
            </div>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        )}

        {/* Success Result */}
        {result && (
          <div className={`mt-6 border rounded-lg p-6 ${getStatusColor(result.status)}`}>
            <div className="flex items-center mb-4">
              {getStatusIcon(result.status)}
              <h3 className="font-semibold ml-2 text-lg">
                {result.status === 'succeeded' ? 'Refund Processed Successfully' : 'Refund Being Processed'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Refund ID:</div>
                <div className="font-mono text-xs break-all">{result.refundId}</div>
              </div>
              <div>
                <div className="font-medium">Charge ID:</div>
                <div className="font-mono text-xs break-all">{result.chargeId}</div>
              </div>
              <div>
                <div className="font-medium">Refund Amount:</div>
                <div>{result.refundAmount} {result.currency.toUpperCase()}</div>
              </div>
              <div>
                <div className="font-medium">Status:</div>
                <div className="capitalize">{result.status}</div>
              </div>
              {result.bookingId && (
                <div>
                  <div className="font-medium">Booking ID:</div>
                  <div>{result.bookingId}</div>
                </div>
              )}
              <div>
                <div className="font-medium">Processing Time:</div>
                <div>{result.estimatedProcessingTime}</div>
              </div>
            </div>

            {result.refundPolicy && (
              <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                <div className="font-medium mb-2">Applied Refund Policy:</div>
                <div className="text-sm">
                  <div>{result.refundPolicy.policy}</div>
                  <div>Days until check-in: {result.refundPolicy.daysUntilCheckIn}</div>
                  <div>Refund percentage: {(result.refundPolicy.refundPercentage * 100).toFixed(0)}%</div>
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded">
              <p className="text-sm">{result.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundBookingPage;