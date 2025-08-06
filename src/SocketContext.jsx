import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export function SocketProvider({ children }) {
  const user = useSelector((state) => state.auth.user)
  const socketRef = useRef(null)
  const [socketReady, setSocketReady] = useState(false)

  useEffect(() => {
    if (!user) {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
      setSocketReady(false)
      return
    }

    if (socketRef.current) {
      return
    }

    socketRef.current = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
    })

    socketRef.current.emit('joinUserRoom', user._id)

    socketRef.current.on('connect', () => {
      setSocketReady(true)
    })

    socketRef.current.on('disconnect', () => {
      setSocketReady(false)
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
      setSocketReady(false)
    }
  }, [user])

  if (user && !socketReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-lg font-semibold animate-pulse">
          Connecting to real-time server...
        </div>
      </div>
    )
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider')
  }
  return context
}
