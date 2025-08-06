import { useSelector } from 'react-redux'
import { getAdminDashboardDataApi } from '../../services/apiAdminDashboard'
import { useQuery } from '@tanstack/react-query'

export function useAdminDashboardData() {
  const token = useSelector((state) => state.auth.token)

  const { data, isPending, error } = useQuery({
    queryKey: ['adminDashboardData'],
    queryFn: () => getAdminDashboardDataApi(token),
  })

  return { data, isPending, error }
}
