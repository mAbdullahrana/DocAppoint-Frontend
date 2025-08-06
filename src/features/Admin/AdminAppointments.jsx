import { useEffect } from 'react'
import RealTimeAppointments from '../Dashboard/DoctorDashboard/RealTimeAppointments'

function AdminAppointments() {
  useEffect(() => {
    console.log('AdminAppointments')
  }, [])
  return <RealTimeAppointments />
}

export default AdminAppointments
