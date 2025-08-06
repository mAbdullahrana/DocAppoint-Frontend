export async function getAdminDashboardDataApi(token) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/admin/dashboard/stats`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error)
    throw error
  }
}
