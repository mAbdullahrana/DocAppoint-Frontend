import { useQuery } from '@tanstack/react-query'
import { getReviewApi } from '../../../services/apiReviews'
import { useSelector } from 'react-redux'

export function useGetReviewByAppointmentID(appointmentID) {
  const token = useSelector((state) => state.auth.token)
  const { data, isPending, error } = useQuery({ 
    queryKey: ['review', appointmentID],
    queryFn: () => getReviewApi(appointmentID, token),
    
  })
  return { review: data, isPending, error }
}
