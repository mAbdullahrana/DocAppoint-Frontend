import { Link } from 'react-router-dom'
import ChatLink from '../../Chat/ChatLink'

function PatientDashboard() {
  return (
    <div className="min-h-screen bg-bg py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Patient Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/dashboard/doctors"
            className="bg-surface border border-border rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">
              Find Doctors
            </h2>
            <p className="text-muted">
              Browse and connect with our medical professionals
            </p>
          </Link>

          <Link
            to="/dashboard/appointments"
            className="bg-surface border border-border rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">
              My Appointments
            </h2>
            <p className="text-muted">
              View and manage your scheduled appointments
            </p>
          </Link>

          <div className="bg-surface border border-border rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Messages
            </h2>
            <p className="text-muted mb-4">Chat with your doctors</p>
            <ChatLink />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
