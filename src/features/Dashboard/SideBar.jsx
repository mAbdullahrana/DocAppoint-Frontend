import { useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { Link } from 'react-router-dom'
import ChatLink from '../Chat/ChatLink'

function SideBar() {
  const user = useSelector((state) => state.auth.user)

  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col py-8 px-6 shadow-lg">
      <div className="mb-10 flex items-center gap-3">
        <span className="text-2xl font-bold text-primary tracking-tight">
          MedAppoint
        </span>
      </div>
      <nav className="flex flex-col gap-4 mt-8">
        <Link
          to="/dashboard"
          className="text-text font-medium py-2 px-3 rounded hover:bg-primary-light/10 transition"
        >
          Dashboard
        </Link>
        {(user?.role === 'patient' ||
          user?.role === 'doctor' ||
          user?.role === 'admin') && (
          <Link
            to="appointments"
            className="text-text font-medium py-2 px-3 rounded hover:bg-primary-light/10 transition"
          >
            Appointments
          </Link>
        )}
        {
          user?.role === 'admin' && (
            <Link
              to="transactions"
              className="text-text font-medium py-2 px-3 rounded hover:bg-primary-light/10 transition"
            >
              Transactions
            </Link>
          )
        }

        {(user?.role === 'patient' || user?.role === 'admin') && (
          <Link
            to="doctors"
            className="text-text font-medium py-2 px-3 rounded hover:bg-primary-light/10 transition"
          >
            Doctors
          </Link>
        )}
        {user?.role === 'admin' && (
          <Link
            to="patients"
            className="text-text font-medium py-2 px-3 rounded hover:bg-primary-light/10 transition"
          >
            Patients
          </Link>
        )}

        {(user?.role === 'patient' || user?.role === 'doctor') && <ChatLink />}
      </nav>
    </aside>
  )
}

export default SideBar
