import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useResetPassword } from './useResetPassword'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { token } = useParams()
  const { resetPassword, isPending } = useResetPassword()

  const handleSubmit = async (e) => {
    e.preventDefault()
    resetPassword({ newPassword: password, confirmNewPassword: confirmPassword , resetPasswordToken: token })

   
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md bg-surface border border-border">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Reset Password</h2>
          <p className="text-sm text-muted mt-2">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-primary mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword
