import { Link } from 'react-router-dom'
import RealTimeAppointments from './RealTimeAppointments'
import SocketTest from './SocketTest'
import ChatLink from '../../Chat/ChatLink'

function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-bg py-10 px-4 flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
          Welcome, Doctor!
        </h1>
        <p className="text-lg text-muted mb-4">
          Here's a quick overview of your day and actions you can take.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">5</span>
          <span className="text-muted mt-1">Today's Appointments</span>
        </div>
        <div className="bg-surface border border-border rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">20</span>
          <span className="text-muted mt-1">Total Patients</span>
        </div>
        <div className="bg-surface border border-border rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-primary">3</span>
          <span className="text-muted mt-1">Pending Requests</span>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Manage Availability
          </h2>
          <p className="text-muted mb-4 text-center">
            Update your available timings and appointment slots.
          </p>
          <Link to="settings">
            <button className="px-6 py-2 rounded bg-primary text-surface font-bold shadow hover:bg-primary-light transition">
              Go to Settings
            </button>
          </Link>
        </div>
        <div className="bg-surface border border-border rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-primary mb-2">
            View Real-Time Appointments
          </h2>
          <p className="text-muted mb-4 text-center">
            See your upcoming and past appointments with live updates.
          </p>
          <Link to="appointments">
            <button className="px-6 py-2 rounded bg-primary text-surface font-bold shadow hover:bg-primary-light transition">
              View Appointments
            </button>
          </Link>
        </div>
        <div className="bg-surface border border-border rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Patient Messages
          </h2>
          <p className="text-muted mb-4 text-center">
            Chat with your patients and respond to their inquiries.
          </p>
          <ChatLink />
        </div>
      </div>

      {/* Real-Time Appointments Preview */}
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-surface border border-border rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary">
              Recent Appointments (Live)
            </h2>
            <Link to="appointments" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <RealTimeAppointments />
        </div>
      </div>

      {/* Socket Test Component for Debugging */}
      {/* <SocketTest /> */}
    </div>
  )
}

export default DoctorDashboard
