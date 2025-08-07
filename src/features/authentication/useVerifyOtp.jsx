import { useMutation } from '@tanstack/react-query'
import { verifyOtpApi } from '../../services/apiAuth'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export function useVerifyOtp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutate: verifyOtp, isPending, error } = useMutation({
    mutationFn: (otp) => verifyOtpApi(otp),
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data.user, token: data.token }))
      toast.success('Login successful')
      navigate('/dashboard' , {replace: true})
    },
    onError: (err) => {
      console.log(err.message)
      toast.error(err.message)
    },
  })

  return { verifyOtp, isPending, error }
}