import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCredentials } from '../features/authentication/authSlice'
import { useSocket } from '../SocketContext'
import { useEffect } from 'react'

function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socket = useSocket()

  useEffect(() => {
    socket.on('userStatusUpdated', (user) => {
      if (user.active) return

      dispatch(clearCredentials())
      navigate('/login')
    })

    return () => {
      socket.off('userStatusUpdated')
    }
  }, [socket])

  function handleLogout() {
    dispatch(clearCredentials())

    navigate('/login')
  }
  return (
    <button
      className="px-4 py-2 font-semibold cursor-pointer rounded-l transition border border-border focus:outline-none "
      onClick={handleLogout}
    >
      <span className="text-danger font-semibold">Logout</span>
    </button>
  )
}

export default Logout
