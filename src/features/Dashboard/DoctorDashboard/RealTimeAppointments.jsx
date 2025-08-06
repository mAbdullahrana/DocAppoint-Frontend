import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { useUpdateAppointment } from '../Appointments/useUpdateAppointment'
import { useRealTimeAppointments } from './useRealTimeAppointments'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSocket } from '../../../SocketContext'

const statusOptions = [
  {
    value: 'pending',
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'confirmed',
    label: 'Confirmed',
    color: 'bg-green-100 text-green-800',
  },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  {
    value: 'completed',
    label: 'Completed',
    color: 'bg-blue-100 text-blue-800',
  },
]

const paymentStatusOptions = [
  {
    value: 'pending',
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'succeeded',
    label: 'Paid',
    color: 'bg-green-100 text-green-800',
  },
  {
    value: 'failed',
    label: 'Failed',
    color: 'bg-red-100 text-red-800',
  },
  {
    value: 'refunded',
    label: 'Refunded',
    color: 'bg-gray-100 text-gray-800',
  },
]

function RealTimeAppointments() {
  const user = useSelector((state) => state.auth.user)
  const { appointments, isPending, error } = useRealTimeAppointments()
  const { updateAppointment, isPending: isUpdating } = useUpdateAppointment()
  const queryClient = useQueryClient()
  const socket = useSocket()

  console.log('socket id', socket?.id)
  useEffect(() => {
    console.log('socket', socket)
    if (!socket) return
    const handleAppointmentUpdate = (updatedAppointment) => {
      queryClient.setQueryData(['doctorAppointments', user._id], (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          appointments: oldData.appointments.map((app) =>
            app._id === updatedAppointment._id ? updatedAppointment : app,
          ),
        }
      })
    }
    socket.on('appointmentUpdated', handleAppointmentUpdate)
    return () => {
      socket.off('appointmentUpdated', handleAppointmentUpdate)
    }
  }, [socket, user, queryClient])

  const handleStatusUpdate = (appointmentId, newStatus, verified = false) => {
    updateAppointment({
      appointmentID: appointmentId,
      appointment: { status: newStatus, verified: verified },
    })
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="text-center text-lg text-primary">
          Loading appointments...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="text-danger text-center">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Real-Time Appointments
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted">Live Updates Active</span>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted text-lg">No appointments found.</div>
            <div className="text-sm text-muted mt-2">
              New appointments will appear here in real-time.
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-border bg-surface">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-primary-light/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-border">
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-primary-light/5 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-text font-semibold">
                          {appointment.patient?.name || 'Unknown Patient'}
                        </div>
                        <div className="text-sm text-muted">
                          {appointment.patient?.email || 'No email'}
                        </div>
                        <div className="text-sm text-muted">
                          {appointment.patient?.phone || 'No phone'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text">
                      {format(new Date(appointment.date), 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-text">
                      {appointment.slotStart} - {appointment.slotEnd}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusOptions.find(
                            (opt) => opt.value === appointment.status,
                          )?.color || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {statusOptions.find(
                          (opt) => opt.value === appointment.status,
                        )?.label || appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            paymentStatusOptions.find(
                              (opt) =>
                                opt.value ===
                                (appointment.paymentStatus || 'pending'),
                            )?.color || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {paymentStatusOptions.find(
                            (opt) =>
                              opt.value ===
                              (appointment.paymentStatus || 'pending'),
                          )?.label || 'Pending'}
                        </span>
                        <span className="text-xs text-muted">$50.00</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === 'doctor' && (
                        <select
                          className={`px-3 py-1 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-bg text-text ${
                            appointment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : appointment.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                          value={appointment.status}
                          onChange={(e) =>
                            handleStatusUpdate(appointment._id, e.target.value)
                          }
                          disabled={isUpdating}
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}
                      {user.role === 'patient' &&
                        !appointment.verified &&
                        appointment.status === 'completed' && (
                          <div className="flex items-center gap-2">
                            <label htmlFor="verified"> Verified</label>
                            <input
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleStatusUpdate(
                                    appointment._id,
                                    'completed',
                                    true,
                                  )
                                } else {
                                  handleStatusUpdate(
                                    appointment._id,
                                    'completed',
                                    false,
                                  )
                                }
                              }}
                              type="checkbox"
                              id="verified"
                              defaultChecked={appointment.verified}
                            />
                          </div>
                        )}
                      {user.role === 'patient' && appointment.verified && (
                        <div className="flex items-center gap-2">
                          <button className="bg-primary text-white px-4 py-2 rounded-md">
                            <Link to={`/dashboard/review/${appointment._id}`}>
                              Review
                            </Link>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default RealTimeAppointments
