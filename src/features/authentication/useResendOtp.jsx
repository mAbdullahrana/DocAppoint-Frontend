import { useMutation } from '@tanstack/react-query'
import { resendOtpApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useResendOtp() { 
  const { mutate: resendOtp, isPending, error } = useMutation({
    mutationFn: (email) => resendOtpApi(email),
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { resendOtp, isPending, error } 
}