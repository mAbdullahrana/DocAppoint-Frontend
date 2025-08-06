import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSocket } from '../../SocketContext'
import { Send, ArrowLeft, MessageCircle, Paperclip, X } from 'lucide-react'
import { getChatById, getMessagesByChatGroup } from '../../services/apiChat'

function SingleChat() {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const socket = useSocket()
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)

  const [chat, setChat] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attachment, setAttachment] = useState(null)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const fetchChatAndMessages = async () => {
      try {
        setIsLoading(true)

        const chatResponse = await getChatById(chatId, token)
        // console.log('Chat response:', chatResponse.chat)
        setChat(chatResponse.chat)

        const messagesResponse = await getMessagesByChatGroup(chatId, token)
        console.log('Messages response:', messagesResponse)
        const formattedMessages = messagesResponse.messages.map((msg) => ({
          _id: msg._id,
          text: msg.text,
          sender: msg.sender._id,
          timestamp: new Date(msg.createdAt),
          senderName: msg.sender.name,
          attachments: msg.attachments,
        }))
        setMessages(formattedMessages)
        // Scroll to bottom after messages are loaded
        setTimeout(() => {
          scrollToBottom()
        }, 100)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (chatId && token) {
      fetchChatAndMessages()
    }
  }, [chatId, token])

  useEffect(() => {
    if (!socket || !chatId) return

    socket.emit('joinChatRoom', chatId)

    const handleReceiveMessage = (msg) => {
      console.log('Message received', msg)

      const formattedMessage = {
        _id: msg._id || Date.now(),
        text: msg.text,
        sender: msg.sender,
        timestamp: new Date(msg.timestamp),
        senderName: msg.senderName || 'Unknown',
        attachments: msg.attachment,
      }

      setMessages((prev) => [...prev, formattedMessage])
      // Scroll to bottom when new message is received
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }

    socket.on('newMessage', handleReceiveMessage)

    return () => {
      socket.off('newMessage', handleReceiveMessage)
    }
  }, [socket, chatId])

  const handleSendMessage = async () => {
    if ((!message.trim() && (!attachment || !attachment.length)) || !chat)
      return

    console.log('attachmentsssssss', attachment)

    try {
      const formData = new FormData()
      formData.append('chatId', chat._id)
      formData.append('text', message.trim())
      formData.append('sender', user._id)

      if (attachment && attachment.length > 0) {
        for (const file of attachment) {
          formData.append('attachments', file)
        }
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/messages/create-message`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      const newMessage = {
        _id: Date.now(),
        text: message.trim(),
        sender: user._id,
        timestamp: new Date(),
        senderName: user.name,
        attachments: data.newMessage.attachments,
      }

      console.log('newMessage', newMessage)
      if (user._id === data.newMessage.sender._id) return

      removeAttachment()
      setTimeout(() => {
        scrollToBottom()
      }, 100)

      setMessage('')
    } catch (err) {
      console.log('error', err)
    }

    // socket.emit('sendMessage', {
    //   chatId: chat._id,
    //   text: message.trim(),
    //   sender: user._id,
    //   receiver:
    //     chat.sender._id === user._id ? chat.receiver._id : chat.sender._id,
    //   attachment: attachment,
    // })
  }

  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
    console.log('attachment clicked', fileInputRef.current)
  }

  const handleFileSelect = (e) => {
    const filesArray = Array.from(e.target.files)

    console.log('files', filesArray)
    setAttachment(filesArray)
  }

  function removeAttachment() {
    setAttachment(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    console.log('scrolled to bottom', messagesEndRef.current)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="text-center text-lg">Loading chat...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="text-center text-danger">Error: {error}</div>
      </div>
    )
  }

  if (!chat) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="text-center text-danger">Chat not found</div>
      </div>
    )
  }

  const otherUser = chat.sender._id === user._id ? chat.receiver : chat.sender

  return (
    <div className="min-h-screen bg-bg py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Chat Header */}
        <div className="bg-surface border border-border rounded-lg shadow mb-6">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard/chat')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-surface text-lg font-bold">
                  {otherUser.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-primary">
                    {otherUser.name}
                  </h1>
                  <p className="text-sm text-muted">{otherUser.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>Start your conversation</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <>
                  <div
                    key={msg._id || index}
                    className={`mb-4 flex  ${
                      msg.sender === user._id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className="flex flex-col">
                      {msg.attachments &&
                        msg.attachments.map((attachment, index) => (
                          <div key={index}>
                            <img
                              src={`${import.meta.env.VITE_API_URL}/public/uploads/${attachment.filename}`}
                              alt="attachment"
                              className="w-30 h-30 "
                            />
                          </div>
                        ))}
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === user._id
                            ? 'bg-primary text-surface'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            {/* Attachment Preview */}
           
            {attachment &&
              attachment.map((file, index) => (
                <div
                  className="mb-3 p-3 bg-gray-100 rounded-lg border"
                  key={index}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Paperclip size={16} />
                      <span className="text-sm font-medium">
                        {file.name || `File ${index + 1}`}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={removeAttachment}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

            <div className="flex gap-2">
              <button
                onClick={handleAttachmentClick}
                className="px-3 py-2 text-gray-500 hover:text-primary transition"
                title="Attach file"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSendMessage}
                disabled={
                  !message.trim() && (!attachment || !attachment.length)
                }
                className="px-4 py-2 bg-primary text-surface rounded-lg hover:bg-primary-light transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleChat
