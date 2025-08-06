export async function signupApi(userData) {
  try {
    const res = await fetch('http://localhost:3000/api/v1/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const data = await res.json()

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
    const res = await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

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


