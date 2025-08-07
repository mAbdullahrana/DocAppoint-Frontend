import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForgotPassword } from './useForgotPassword'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const { forgotPassword, isPending } = useForgotPassword()

  const handleSubmit = async (e) => {
    e.preventDefault()

    forgotPassword(email)

    // TODO: Add forgot password functionality here
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md bg-surface border border-border">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Forgot Password</h2>
          <p className="text-sm text-muted mt-2">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-sm text-center text-muted">
          Remember your password?{' '}
          <Link to="/login" className="hover:underline text-primary">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
