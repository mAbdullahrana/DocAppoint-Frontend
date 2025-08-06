import { Bell, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSocket } from '../../SocketContext'
import NotificationCard from './NotificationCard'
import { useGetAllNotification } from './useGetAllNotification'

function Notification() {
  const [isOpen, setIsOpen] = useState(false)
  const socket = useSocket()
  const [notifications, setNotifications] = useState([])
  const { data, isPending, error } = useGetAllNotification()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (data) {
      setNotifications(data.notifications)
    }
  }, [data])
  useEffect(() => {
    socket.on('newNotification', (notification) => {
      console.log('newNotification', notification)
      setNotifications((prev) => [notification, ...prev])
    })
    return () => {
      socket.off('newNotification')
    }
  }, [socket])

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications, unreadCount])



  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-primary-light/20 transition cursor-pointer"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
    
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {/* <button className="text-sm text-blue-600 hover:text-blue-800">
                Mark all as read
              </button> */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification._id}
                    setIsOpen={setIsOpen}
                    setNotifications={setNotifications}
                    notification={notification}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {/* {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all notifications
              </button>
            </div>
          )} */}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}

export default Notification
