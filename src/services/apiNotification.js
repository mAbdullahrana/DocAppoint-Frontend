import { BACKEND_URL } from "../../constants/environment"


export async function getNotificationsApi(token) {
  const response = await fetch(
    `${BACKEND_URL}api/v1/notification/get-notifications`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch notifications')
  }
  return data
}
