import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createChatGroup } from '../../services/apiChat'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export function useCreateChat() {
  const queryClient = useQueryClient()
  const token = useSelector((state) => state.auth.token)

  const {
    mutate: createChat,
    isPending,
    data,
  } = useMutation({
    mutationFn: (receiverId) => createChatGroup(receiverId, token),
    onSuccess: () => {
      toast.success('Chat created successfully!')
      // Invalidate and refetch user chats
      queryClient.invalidateQueries({ queryKey: ['userChats'] })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create chat')
    },
  })

  return { createChat, isPending, chatData: data }
}
