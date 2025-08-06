export async function updateMeApi(userData, token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/updateMe`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser will set it automatically with boundary
      },
      body: userData,
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Update failed')
    }

    return data
  } catch (err) {
    console.error('UpdateMe API error:', err)
    throw err
  }
}

export async function getDoctorsApi(token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/doctor`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Get users failed')
    }

    return data
  } catch (err) {
    console.error('Get users API error:', err)
    throw err
  }
}

export async function getUserByIdApi(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Get user failed')
    }
    return data
  } catch (err) {
    console.error('Get user API error:', err)
    throw err
  }
}
