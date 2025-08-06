import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getUserByIdApi } from '../../../services/apiUsers'

export function useGetUserByID(userID) {
 
  const token = useSelector((state) => state.auth.token)

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userID, token],
    queryFn: () => getUserByIdApi(userID),
    enabled: !!userID && !!token,
  })
console.log(data)
  return { data: data?.data, isLoading, error }
}
