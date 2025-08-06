import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/authentication/authSlice'

export default function OAuth2RedirectHandler() {
  const location = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const t = params.get('token')
    const u = params.get('user')
    let parsedUser = null
    try {
      parsedUser = JSON.parse(decodeURIComponent(u))
    } catch (err) {
      console.error('Failed to parse user:', err)

      return
    }

    dispatch(setCredentials({ user: parsedUser, token: t }))

    navigate('/dashboard')
  }, [location.search, dispatch, navigate])

  return <p>Signing you in…</p>
}
