import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAppointmentsByUserIDApi } from '../../../services/apiAppointment'

import toast from 'react-hot-toast'
import { useSocket } from '../../../SocketContext'

export function useRealTimeAppointments() {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  const queryClient = useQueryClient()
  const socket = useSocket()

  // Fetch appointments using React Query
  const { data, isPending, error } = useQuery({
    queryKey: ['doctorAppointments', user?._id],
    queryFn: () => getAppointmentsByUserIDApi(user?._id, token),
    enabled: !!user?._id && !!token,
  })

  // Listen for real-time updates via socket
  useEffect(() => {
    if (!socket || !user) return

    // Listen for new appointments
    const handleNewAppointment = (newAppointment) => {
      console.log('New appointment received:', newAppointment)

      // Update the appointments list in React Query cache

      queryClient.setQueryData(['doctorAppointments', user._id], (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          appointments: [newAppointment, ...oldData.appointments],
        }
      })

      // Show notification
      toast.success(
        `New appointment from ${newAppointment.patient?.name || 'Patient'}`,
      )
    }

    const handleAppointmentUpdate = (updatedAppointment) => {
      console.log('Appointment updated:', updatedAppointment)

      queryClient.setQueryData(['doctorAppointments', user._id], (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          appointments: oldData.appointments.map((app) =>
            app._id === updatedAppointment._id ? updatedAppointment : app,
          ),
        }
      })

      // Show notification for status changes
      if (
        updatedAppointment.status === 'confirmed' &&
        !user.role === 'doctor'
      ) {
        toast.success(
          `Appointment confirmed for ${updatedAppointment.patient?.name || 'Patient'}`,
        )
      } else if (
        updatedAppointment.status === 'cancelled' &&
        !user.role === 'doctor'
      ) {
        toast.error(
          `Appointment cancelled for ${updatedAppointment.patient?.name || 'Patient'}`,
        )
      }
    }

    socket.on('newAppointment', handleNewAppointment)
    socket.on('appointmentUpdated', handleAppointmentUpdate)

    return () => {
      socket.off('newAppointment', handleNewAppointment)
      socket.off('appointmentUpdated', handleAppointmentUpdate)
    }
  }, [socket, user, queryClient])

  return {
    appointments: data?.appointments || [],
    isPending,
    error,
  }
}
