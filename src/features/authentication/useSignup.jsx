import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signupApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { setEmail } from './authSlice'
import { useDispatch } from 'react-redux'

export function useSignup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: (newUser) => signupApi(newUser),
    onSuccess: ({ email }) => {
      toast.success('Otp sent to your email to verify your account')

      dispatch(setEmail(email))
      navigate(`/verify-otp`)
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    },
  })

  return { signUp, isPending, error }
}
