export async function disconnectCalenderApi(token) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/calender/disconnect-calender`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message)
    }


    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}
