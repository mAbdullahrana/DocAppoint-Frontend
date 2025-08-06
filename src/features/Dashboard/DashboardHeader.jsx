import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logout from '../../ui/Logout'
import Notification from '../Notification/Notification'

function DashboardHeader() {
  const { user } = useSelector((state) => state.auth)
  return (
    <header className="flex items-center justify-between bg-surface border-b border-border px-8 py-4 shadow-sm">
      <div className="flex items-center gap-4 ">
        <img
          src={`http://localhost:3000/public/img/users/${user?.profilePicture}`}
          alt="User"
          className="w-10 h-10 rounded-full border border-border object-cover"
        />
        <span className="text-lg font-semibold text-text">
          Welcome, {user?.name}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <Notification />
        {user?.role !== "admin" && <Link
          to="settings"
          className="p-2 rounded-full hover:bg-primary-light/20 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-settings-icon lucide-settings"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Link>}
        <Logout />
      </div>
    </header>
  )
}

export default DashboardHeader
