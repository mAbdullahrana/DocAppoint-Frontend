export async function createReviewApi(review, token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create review')
    }
    return data
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

export async function getReviewApi(appointmentID, token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/reviews/${appointmentID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })    
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to get review')
    }
    return data
  } catch (error) {
    console.error('Error getting review:', error)
    throw error
  }
} 