import { useQuery } from '@tanstack/react-query'
import { getAppointmentsByUserIDApi } from '../../../services/apiAppointment'
import { useSelector } from 'react-redux'

export function useGetAppointmentsByUserID(userID) {
  const token = useSelector((state) => state.auth.token)  
  const { data, isPending, error } = useQuery({
    queryKey: ['doctorAppointments', userID],
    queryFn: () => getAppointmentsByUserIDApi(userID, token),
  })
 
  return { appointments: data?.appointments || [], isPending, error }
}
