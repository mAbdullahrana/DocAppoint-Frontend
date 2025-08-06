import {
  AlertCircle,
  CheckCircle,
  Clock,
  Info,
  MessageSquare,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../../constants/environment'

const getNotificationIcon = (type) => {
  switch (type) {
    case 'appointment':
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case 'message':
      return <MessageSquare className="w-5 h-5 text-blue-500" />
    case 'reminder':
      return <Clock className="w-5 h-5 text-yellow-500" />
    case 'alert':
      return <AlertCircle className="w-5 h-5 text-red-500" />
    default:
      return <Info className="w-5 h-5 text-gray-500" />
  }
}

function NotificationCard({
  notification,
  setIsOpen,

  setNotifications,
}) {
  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()
  async function handleNotificationUpdate() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/notification/update-notification/${notification._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!response.ok) {
        throw new Error('Failed to update notification')
      }
      const data = await response.json()

      setNotifications((prev) =>
        prev.map((item) =>
          item._id == notification._id ? { ...item, read: true } : item,
        ),
      )
      // setUnreadCount((prev) => prev - 1)

      setIsOpen(false)
      navigate('/dashboard/appointments')
      console.log('data', data)
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <div
      onClick={handleNotificationUpdate}
      className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
        !notification.read ? 'bg-blue-50/50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Notification Icon */}
        <div className="flex-shrink-0 mt-1">
          {getNotificationIcon(notification.type)}
        </div>

        {/* Notification Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                }`}
              >
                {notification.title}
              </p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Unread Indicator */}
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
