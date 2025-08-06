import { useQuery } from '@tanstack/react-query'
import { getAvailableSlotsApi } from '../../../services/apiAppointment'

export function useGetAvailableSlots(doctorID, date) {
  const { data, isPending, error } = useQuery({
    queryKey: ['availableSlots', doctorID, date],
    queryFn: () => getAvailableSlotsApi(doctorID, date),
 
  })
 
  return { 
    slots: data?.slots || [], 
    isPending, 
    error 
  }
} 