import { useQuery } from '@tanstack/react-query'
import { getNotificationsApi } from '../../services/apiNotification'
import { useSelector } from 'react-redux'

export function useGetAllNotification() {
  const token = useSelector((state) => state.auth.token)
  const { data, isPending, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotificationsApi(token),
  })
  return { data, isPending, error }
}
