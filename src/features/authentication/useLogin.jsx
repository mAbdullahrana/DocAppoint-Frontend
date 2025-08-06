import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../../services/apiAuth'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'

export function useLogin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: (userData) => loginApi(userData),
    onSuccess: (data) => {
      console.log(data)
      dispatch(setCredentials({ user: data.user, token: data.token }))
      navigate(`/dashboard`)
      toast.success('Login successful')
    },
    onError: (err) => {
      console.log(err.message)
      toast.error(err.message)
    },
  })

  return { login, isPending, error }
}
