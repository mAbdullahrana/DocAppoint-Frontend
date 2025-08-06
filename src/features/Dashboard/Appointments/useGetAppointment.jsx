import { useQuery } from '@tanstack/react-query'
import { getAppointmentApi } from '../../../services/apiAppointment'
import { useSelector } from 'react-redux'

export function useGetAppointment(appointmentID) {
  const token = useSelector((state) => state.auth.token)
  const { data, isPending, error } = useQuery({
    queryKey: ['appointment', appointmentID],
    queryFn: () => getAppointmentApi(appointmentID, token),
  })
  return { appointment: data, isPending, error }
}
