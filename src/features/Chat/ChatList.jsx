import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserChats } from './useGetUserChats'
import { MessageCircle } from 'lucide-react'

function ChatList() {
  const { chats, isLoading, error } = useGetUserChats()
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const handleChatClick = (chatId) => {
    navigate(`/dashboard/chat/${chatId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="text-center text-lg">Loading chats...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="text-center text-danger">Error: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg py-10 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Messages
      </h1>

      <div className="max-w-2xl mx-auto">
        {chats.length === 0 ? (
          <div className="bg-surface border border-border rounded-lg shadow p-8 text-center">
            <MessageCircle size={64} className="mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold text-primary mb-2">
              No conversations yet
            </h2>
            {user?.role !== 'doctor' && (
              <div>
                <p className="text-muted mb-4">
                  Start chatting with doctors from the doctors page
                </p>

                <button
                  onClick={() => navigate('/dashboard/doctors')}
                  className="px-6 py-2 bg-primary text-surface rounded-lg hover:bg-primary-light transition"
                >
                  Find Doctors
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-lg shadow">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-primary">
                Your Conversations ({chats.length})
              </h2>
            </div>
            <div className="divide-y divide-border">
              {chats.map((chat) => {
                const otherUser =
                  chat.sender._id === user._id ? chat.receiver : chat.sender

                return (
                  <div
                    key={chat._id}
                    onClick={() => handleChatClick(chat._id)}
                    className="p-4 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-surface text-lg font-bold">
                        {otherUser.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary">
                          {otherUser.name}
                        </h3>
                        <p className="text-sm text-muted">{otherUser.email}</p>
                        {chat.lastMessage && (
                          <p className="text-sm text-muted mt-1 truncate">
                            {chat.lastMessage}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-muted text-right">
                        <div>
                          {new Date(chat.createdAt).toLocaleDateString()}
                        </div>
                        {chat.lastMessage && (
                          <div className="mt-1">
                            {new Date(
                              chat.updatedAt || chat.createdAt,
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatList
