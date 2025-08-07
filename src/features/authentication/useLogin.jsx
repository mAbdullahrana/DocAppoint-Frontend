import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { loginApi } from '../../services/apiAuth'
import { setCredentials, setEmail } from './authSlice'
import { useNavigate } from 'react-router-dom'


export function useLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()  
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: (userData) => loginApi(userData),
    onSuccess: (data) => {
 if(data.token) {
  dispatch(setCredentials({ user: data.user, token: data.token }))
  toast.success('Login successful')
  navigate('/dashboard' , {replace: true})
 }
 else{
  dispatch(setEmail(data.email))
  toast.success('Otp sent to your email')
 }
    },
    onError: (err) => {
      console.log(err.message)
      toast.error(err.message)
    },
  })

  return { login, isPending, error }
}
