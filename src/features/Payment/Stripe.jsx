import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
)

function Stripe() {
  const token = useSelector((state) => state.auth.token)
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const hasCalledAPI = useRef(false)
  const [searchParams] = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const doctorID = searchParams.get('doctorID')

  useEffect(() => {
    const fetchClientSecret = async () => {
      // Check for missing parameters first
      if (!appointmentID || !doctorID) {
        setError('Missing appointment or doctor information')
        setLoading(false)
        return
      }

      // Prevent multiple API calls
      if (hasCalledAPI.current || !token) {
        return
      }

      try {
        setLoading(true)
        setError(null)
        hasCalledAPI.current = true

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/transactions/create-payment-intent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              appointmentID: appointmentID,
              doctorID: doctorID,
            }),
          },
        )

        if (!res.ok) {
          throw new Error('Failed to create payment intent')
        }

        const { clientSecret } = await res.json()
        setClientSecret(clientSecret)
      } catch (err) {
        setError(err.message)
        console.error('Payment intent error:', err)
        hasCalledAPI.current = false // Reset flag on error to allow retry
      } finally {
        setLoading(false)
      }
    }

    fetchClientSecret()
  }, [token, appointmentID, doctorID])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text">Setting up payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-text">No payment information available</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Stripe
