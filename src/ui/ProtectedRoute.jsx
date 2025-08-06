import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/authentication/useAuth'

function ProtectedRoute({ children }) {
  const { user, isAuthenticated, isPending } = useAuth()
  if (isPending) {
    return <div>Loading…</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (user?.role === 'patient' || user?.role === 'doctor' || user?.role === 'admin') return children

  return null
}

export default ProtectedRoute
