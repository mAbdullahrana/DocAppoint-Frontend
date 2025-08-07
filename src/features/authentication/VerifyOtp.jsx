import React, { useEffect, useRef, useState } from 'react'
import { useVerifyOtp } from './useVerifyOtp'
import { useSelector } from 'react-redux'
import { useResendOtp } from './useResendOtp'
import { useNavigate } from 'react-router-dom'

function VerifyOtp() {
  const navigate = useNavigate()
  const { verifyOtp, isPending } = useVerifyOtp()
  const { resendOtp, isPending: isResendOtpPending } = useResendOtp()
  const email = useSelector((state) => state.auth.email)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputsRef = useRef([])

  let resendOtpTime = 60
  const [resendOtpTimeRemaining, setResendOtpTimeRemaining] =
    useState(resendOtpTime)

  useEffect(() => {
    if (resendOtpTimeRemaining > 0) {
      setTimeout(() => {
        setResendOtpTimeRemaining(resendOtpTimeRemaining - 1)
      }, 1000)
    }
  }, [resendOtpTimeRemaining])

  if (!email) navigate('/login', { replace: true })

  const handleChange = (e, idx) => {
    const value = e.target.value
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[idx] = value
    setOtp(newOtp)
    if (value && idx < 5) {
      inputsRef.current[idx + 1].focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6)
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      inputsRef.current[5].focus()
    }
  }

  const handleResendOtp = () => {
    resendOtp(email)
    setResendOtpTimeRemaining(resendOtpTime)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(otp.join(''))
    verifyOtp(otp.join(''), {
      onError: () => {
        setOtp(['', '', '', '', '', ''])
      },
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="bg-surface p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Verify OTP
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-12 h-12 text-center text-xl border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary transition shadow-sm bg-bg"
                placeholder="-"
                autoComplete="off"
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                ref={(el) => (inputsRef.current[idx] = el)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold rounded transition bg-primary text-surface cursor-pointer hover:bg-primary/90 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? 'Verifying...' : 'Verify'}
          </button>
          {resendOtpTimeRemaining > 0 && (
            <p className="text-sm text-center text-gray-500">
              Resend OTP in {resendOtpTimeRemaining} seconds
            </p>
          )}
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              className={`text-primary hover:text-primary-light transition text-sm cursor-pointer ${
                isResendOtpPending || resendOtpTimeRemaining > 0
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={isResendOtpPending || resendOtpTimeRemaining > 0}
            >
              {isResendOtpPending ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyOtp
