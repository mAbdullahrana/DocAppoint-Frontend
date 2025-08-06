export async function getTransactionsApi(
  token,
  { status, search, page, limit },
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/transactions/get-transactions?status=${status}&search=${search}&page=${page}&limit=${limit}`,
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
    throw new Error(data.message || 'Failed to fetch transactions')
  }

  return data
}
