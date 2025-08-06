import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAppointmentApi } from '../../../services/apiAppointment'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export function useCreateAppointment() {
  const queryClient = useQueryClient()
  const token = useSelector((state) => state.auth.token)
  const {
    mutate: createAppointment,
    isPending,
    error,
  } = useMutation({
    mutationFn: (newAppointment) => createAppointmentApi(newAppointment, token),
    onSuccess: (data, variables, context) => {
      toast.success('Appointment created successfully')
      // Invalidate available slots queries to refresh the slots list
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] })
      // Invalidate doctor appointments to refresh the real-time list
      queryClient.invalidateQueries({ queryKey: ['doctorAppointments'] })

      // Call the custom onSuccess callback if provided
      if (context?.onSuccess) {
        context.onSuccess(data)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return {
    createAppointment,
    isPending,
    error,
  }
}
