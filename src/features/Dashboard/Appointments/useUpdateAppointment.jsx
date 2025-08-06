import { useMutation } from '@tanstack/react-query'
import { updateAppointmentApi } from '../../../services/apiAppointment'
import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useUpdateAppointment() {
  const token = useSelector((state) => state.auth.token)
  const queryClient = useQueryClient()
  

  const {
    mutate: updateAppointment,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ appointmentID, appointment }) => {
      return updateAppointmentApi(appointmentID, appointment, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctorAppointments'] })
      toast.success('Appointment updated successfully')
    },
    onError: (error) => {
      console.error('Update appointment error:', error)
      toast.error('Update appointment failed')
    },
  })
  return { updateAppointment, isPending, error }
}
