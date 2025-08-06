import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getTransactionsApi } from '../../services/apiTransaction'

export function useGetAllTransactions() {
  const token = useSelector((state) => state.auth.token)

  const {
    data: transactions = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactionsApi(token),
  })

  return { transactions, isPending, error }
}
