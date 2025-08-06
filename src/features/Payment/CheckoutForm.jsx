import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

function CheckoutForm({ clientSecret }) {
  const user = useSelector((state) => state.auth.user)
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      toast.error('Stripe has not loaded yet. Please try again.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      if (!clientSecret) {
        toast.error('Client secret not found. Please try again.')
        return
      }

      const { error: submitError } = await elements.submit()
      if (submitError) {
        setMessage(submitError.message)
        toast.error(submitError.message)
        setLoading(false)
        return
      }

      const result = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard/payment-success?payment_intent=${clientSecret}   `,
        },
      })

      if (result.error) {
        setMessage(result.error.message)
        toast.error(result.error.message)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setMessage('Payment successful!')
          toast.success('Payment completed successfully!')
          // Reset form
          elements.getElement(PaymentElement).clear()
        }
      }
    } catch (error) {
      console.error('Payment error:', error)
      setMessage('An error occurred. Please try again.')
      toast.error('Payment failed. Please try again.')
    }

    setLoading(false)
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        '::placeholder': {
          color: '#9CA3AF',
        },
        backgroundColor: 'transparent',
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/5 to-primary/10 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            Complete Your Payment
          </h1>
          <p className="text-text-light">Secure payment powered by Stripe</p>
        </div>

        <div className="bg-surface rounded-xl shadow-lg border border-border overflow-hidden">
          {/* Payment Summary */}
          <div className="bg-primary-light/5 px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text mb-3">
              Payment Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-text-light">Consultation Fee</span>
                <span className="font-medium text-text">$5.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-light">Processing Fee</span>
                <span className="font-medium text-text">$0.00</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between items-center">
                <span className="font-semibold text-text">Total Amount</span>
                <span className="font-bold text-lg text-primary">$5.00</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Details */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Card Information
                </label>
                <div className="border border-border rounded-lg p-4 bg-surface">
                  <PaymentElement options={cardElementOptions} />
                </div>
                <p className="text-xs text-text-light mt-2">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* User Info */}
              <div className="bg-primary-light/5 rounded-lg p-4">
                <h3 className="font-medium text-text mb-3">
                  Billing Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-light mb-1">
                      Name
                    </label>
                    <p className="text-sm font-medium text-text">
                      {user?.name || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-text-light mb-1">
                      Email
                    </label>
                    <p className="text-sm font-medium text-text">
                      {user?.email || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!stripe || loading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  !stripe || loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark active:scale-95 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay $5.00`
                )}
              </button>

              {/* Status Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg text-center ${
                    message.includes('successful')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-text-light">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
