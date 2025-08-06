import { useQuery } from '@tanstack/react-query'
import { getDoctorsApi } from '../../../services/apiUsers'
import { useSelector } from 'react-redux'

export function useGetDoctors() {
  const token = useSelector((state) => state.auth.token)

  const { data, isLoading, error } = useQuery({
    queryKey: ['doctors', token],
    queryFn: () => getDoctorsApi(token),
  })

  return { data, isLoading, error }
}
