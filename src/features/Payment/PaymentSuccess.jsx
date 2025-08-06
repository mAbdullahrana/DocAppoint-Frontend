import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

function PaymentSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = useSelector((state) => state.auth.token)
  const paymentIntentId = searchParams.get('payment_intent')
  const status = searchParams.get('redirect_status')
  const hasUpdatedStatus = useRef(false)

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!paymentIntentId || hasUpdatedStatus.current) {
        return
      }

      try {
        hasUpdatedStatus.current = true

        const res = await fetch(
          `http://localhost:3000/api/v1/transactions/update-payment-status`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              paymentIntentId,
              status: status || 'succeeded',
            }),
          },
        )

        if (res.ok) {
          toast.success('Payment completed successfully!')
        } else {
          const errorData = await res.json()
          console.error('Payment status update failed:', errorData)
          toast.error('Payment completed but status update failed')
        }
      } catch (error) {
        console.error('Error updating payment status:', error)
        toast.error('Payment completed but status update failed')
      }
    }

    updatePaymentStatus()
  }, []) // Empty dependency array - only run once on mount

  const handleViewAppointments = () => {
    navigate('/dashboard/appointments', { replace: true })
  }

  const handleGoHome = () => {
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden">
        {/* Success Icon */}
        <div className="bg-green-500 px-6 py-8 text-center">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-green-100">Your appointment has been confirmed</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Thank you for your payment
            </h2>
            <p className="text-gray-600 text-sm">
              Your appointment has been successfully booked and confirmed. You
              will receive a confirmation email shortly.
            </p>
          </div>

          {/* Payment Details */}
          {paymentIntentId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Payment Details
              </h3>
              <div className="text-xs text-gray-600">
                <p>Transaction ID: {paymentIntentId}</p>
                <p>Amount: $5.00</p>
                <p>Status: Completed</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleViewAppointments}
              className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              View My Appointments
            </button>

            <button
              onClick={handleGoHome}
              className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secure payment processed by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
