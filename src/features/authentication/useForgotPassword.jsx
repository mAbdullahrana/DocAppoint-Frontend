import { useMutation } from '@tanstack/react-query'
import { forgotPasswordApi } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useForgotPassword = () => {
  const navigate = useNavigate()
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (email) => forgotPasswordApi(email),
    onSuccess: () => {
      toast.success('Reset password email sent')
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { forgotPassword, isPending }
}
