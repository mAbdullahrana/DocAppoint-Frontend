import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { loginApi } from '../../services/apiAuth'
import { setEmail } from './authSlice'

export function useLogin() {
  const dispatch = useDispatch()

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: (userData) => loginApi(userData),
    onSuccess: (data) => {
      dispatch(setEmail(data.email))
      toast.success('Otp sent to your email')
    },
    onError: (err) => {
      console.log(err.message)
      toast.error(err.message)
    },
  })

  return { login, isPending, error }
}
