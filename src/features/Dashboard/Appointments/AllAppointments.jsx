import { useSelector } from 'react-redux'
import RealTimeAppointments from '../DoctorDashboard/RealTimeAppointments'

const AllAppointments = () => {
  const user = useSelector((state) => state.auth.user)

  // Use the real-time appointments component for doctors
  if (user?.role === 'doctor') {
    return <RealTimeAppointments />
  }


  return (
    <div className="min-h-screen bg-bg py-10 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        My Appointments
      </h1>
      <div className="text-center text-muted">
        Patient appointments view - coming soon with real-time updates
      </div>
    </div>
  )
}

export default AllAppointments
