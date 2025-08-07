export async function signupApi(userData) {
  try {
    console.log('Sending signup data:', userData)

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      },
    )

    const data = await res.json()
    console.log('signupApi response:', data)
    if (!res.ok) {
      throw new Error(data.message || 'Signup failed')
    }

    return data
  } catch (err) {
    console.error('Signup API error:', err)
    throw err
  }
}
export async function loginApi(userData) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      },
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Login failed')
    }

    return data
  } catch (err) {
    console.error('Signup API error:', err)
    throw err
  }
}

export async function verifyOtpApi(otp) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/verify-otp`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      },
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Verify OTP failed')
    }

    return data
  } catch (err) {
    console.error('Verify OTP API error:', err)
    throw err
  }
}

export async function resendOtpApi(email) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/resend-otp`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      },
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Resend OTP failed')
    }

    return data
  } catch (err) {
    console.error('Resend OTP API error:', err)
    throw err
  }
}
