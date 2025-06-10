import React, { useState } from 'react';
import { 
  RefreshCw, 
  FileText, 
  Copy, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Loader2,
  CreditCard,
  DollarSign
} from 'lucide-react';

const RefundApiTester = () => {
  const [apiUrl, setApiUrl] = useState('localhost:3000');
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const exampleBookings = [
    { id: 1001, type: 'Active Booking', description: 'Standard active booking' },
    { id: 1002, type: 'Credit Card', description: 'Credit card payment' },
    { id: 1003, type: 'Cash Payment', description: 'Cash payment booking' },
    { id: 1004, type: 'Already Cancelled', description: 'Test error case' }
  ];

  const setExampleBookingId = (id) => {
    setBookingId(id.toString());
  };

  const copyResponse = async () => {
    if (response) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(response, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy response:', err);
      }
    }
  };

  const getStatusBadge = () => {
    if (!status) return null;
    
    if (status >= 200 && status < 300) {
      return (
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          {status} Success
        </div>
      );
    } else if (status >= 400 && status < 500) {
      return (
        <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          <XCircle className="w-4 h-4" />
          {status} Client Error
        </div>
      );
    } else if (status >= 500) {
      return (
        <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          <AlertCircle className="w-4 h-4" />
          {status} Server Error
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
        <AlertCircle className="w-4 h-4" />
        {status}
      </div>
    );
  };

  const handleSubmit = async () => {
    if (!apiUrl.trim() || !bookingId.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setResponse(null);
    setStatus(null);

    try {
      const protocol = apiUrl.startsWith('localhost') ? 'http://' : 'https://';
      const fullUrl = `${protocol}${apiUrl}/api/refund`;

      const res = await fetch(`http://localhost:3000/api/booking/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: parseInt(bookingId)
        })
      });

      const data = await res.json();
      setResponse(data);
      setStatus(res.status);

    } catch (error) {
      console.error('Request failed:', error);
      setResponse({
        error: 'Network Error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
      setStatus(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - API Tester */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Refund API Tester</h1>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">API Endpoint:</p>
                  <p className="font-mono">POST /api/refund</p>
                  <p className="font-medium mt-2">Required:</p>
                  <p>bookingId in request body</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="apiUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                  API Base URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">https://</span>
                  </div>
                  <input
                    type="text"
                    id="apiUrl"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="your-domain.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bookingId" className="block text-sm font-semibold text-gray-700 mb-2">
                  Booking ID
                </label>
                <input
                  type="number"
                  id="bookingId"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter booking ID"
                  min="1"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Example Booking IDs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {exampleBookings.map((booking) => (
                    <button
                      key={booking.id}
                      type="button"
                      onClick={() => setExampleBookingId(booking.id)}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-colors text-left"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{booking.type}</div>
                        <div className="text-xs text-gray-500">{booking.description}</div>
                      </div>
                      <div className="text-indigo-600 font-mono font-medium">{booking.id}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    Process Refund
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Response */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">API Response</h2>
              </div>
              {response && (
                <button
                  onClick={copyResponse}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>

            {response ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {getStatusBadge()}
                  <div className="text-sm text-gray-500">
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>

                {/* Response Summary for Success */}
                {response.success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="font-semibold text-green-800">Refund Processed Successfully</h4>
                        <div className="text-sm text-green-700 space-y-1">
                          <p><strong>Booking ID:</strong> {response.data?.bookingId}</p>
                          <p><strong>Refund ID:</strong> {response.data?.refundId}</p>
                          <p><strong>Amount:</strong> ฿{response.data?.amount}</p>
                          <p><strong>Status:</strong> {response.data?.status}</p>
                          {response.data?.booking?.guest && (
                            <p><strong>Guest:</strong> {response.data.booking.guest.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Summary */}
                {response.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800">Error Occurred</h4>
                        <p className="text-sm text-red-700 mt-1">{response.error}</p>
                        {response.message && (
                          <p className="text-sm text-red-600 mt-1">{response.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Response Yet</h3>
                <p className="text-center text-gray-500">
                  Send a request to see the API response here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundApiTester;