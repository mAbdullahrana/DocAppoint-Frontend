import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signupApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { setCredentials } from './authSlice'
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
    onSuccess: ({newUser , token }) => {
      console.log(newUser)
      toast.success('Account created successfully')
      dispatch(setCredentials({ user: newUser, token }))
      navigate(`/dashboard`)
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    },
  })

  return { signUp, isPending, error }
}
