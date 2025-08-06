import { useEffect, useState } from 'react'
import { useSocket } from '../../../SocketContext'
import { useSelector } from 'react-redux'

function SocketTest() {
  const user = useSelector((state) => state.auth.user)
  const socket = useSocket()
  const [connectionStatus, setConnectionStatus] = useState('Disconnected')
  const [lastEvent, setLastEvent] = useState('No events yet')

  useEffect(() => {
    if (!socket) return

    const handleConnect = () => {
      setConnectionStatus('Connected')
      console.log('Socket connected:', socket.id)
    }

    const handleDisconnect = () => {
      setConnectionStatus('Disconnected')
      console.log('Socket disconnected')
    }

    const handleNewAppointment = (appointment) => {
      setLastEvent(
        `New appointment from ${appointment.patient?.name || 'Unknown'}`,
      )
      console.log('New appointment received:', appointment)
    }

    const handleAppointmentUpdate = (appointment) => {
      setLastEvent(
        `Appointment updated: ${appointment.patient?.name || 'Unknown'}`,
      )
      console.log('Appointment updated:', appointment)
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('newAppointment', handleNewAppointment)
    socket.on('appointmentUpdated', handleAppointmentUpdate)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('newAppointment', handleNewAppointment)
      socket.off('appointmentUpdated', handleAppointmentUpdate)
    }
  }, [socket])

  if (user?.role !== 'doctor') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-surface border border-border rounded-lg shadow-lg p-4 max-w-sm">
      <h3 className="text-sm font-semibold text-primary mb-2">Socket Status</h3>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
          <span className="text-muted">Status: {connectionStatus}</span>
        </div>
        <div className="text-muted">Last Event: {lastEvent}</div>
        {socket && (
          <div className="text-muted">
            Socket ID: {socket.id?.slice(0, 8)}...
          </div>
        )}
      </div>
    </div>
  )
}

export default SocketTest
