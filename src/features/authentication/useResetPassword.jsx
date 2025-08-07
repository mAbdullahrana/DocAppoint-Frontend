import { useMutation } from '@tanstack/react-query'
import { resetPasswordApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useResetPassword() {
  const navigate = useNavigate()
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (data) => resetPasswordApi(data),
    onSuccess: () => {
      toast.success('Password reset successfully')
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { resetPassword, isPending }
}