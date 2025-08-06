import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './features/authentication/authSlice'

export default function HydrateAuth({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem('credentials'))
    if (credentials) {
      dispatch(setCredentials(credentials))
    }
  }, [dispatch])

  return children
}
