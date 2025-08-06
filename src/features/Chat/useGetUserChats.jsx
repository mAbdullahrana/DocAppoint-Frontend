import { useQuery } from '@tanstack/react-query'
import { getUserChats } from '../../services/apiChat'
import { useSelector } from 'react-redux'

export function useGetUserChats() {
  const token = useSelector((state) => state.auth.token)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userChats'],
    queryFn: () => getUserChats(token),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!token,
  })

  return {
    chats: data?.chats || [],
    isLoading,
    error,
    refetch,
  }
}
