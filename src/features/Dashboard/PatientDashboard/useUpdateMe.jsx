import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { updateMeApi } from '../../../services/apiUsers'
import { setCredentials } from '../../authentication/authSlice'
import toast from 'react-hot-toast'

export function useUpdateMe() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const { mutateAsync: updateMe, isPending } = useMutation({
    mutationFn: async (data) => {
      return await updateMeApi(data, token)
    },
    onSuccess: (res) => {
      dispatch(setCredentials({ user: res.data, token }))
      toast.success('Profile updated successfully')
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update profile')
    },
  })

  return { updateMe, isPending }
}
