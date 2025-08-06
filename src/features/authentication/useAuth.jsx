import { useState, useEffect } from 'react'

export function useAuth() {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
  })
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    const credentials = localStorage.getItem('credentials')
    setIsPending(true)
    if (credentials) {
      try {
        const parsed = JSON.parse(credentials)
        setAuth({
          user: parsed.user || null,
          token: parsed.token || null,
          isAuthenticated: !!parsed.user && !!parsed.token,
        })
      } catch (error) {
        console.error('Error parsing credentials:', error)
        setAuth({ user: null, token: null, isAuthenticated: false })
      }
    } else {
      setAuth({ user: null, token: null, isAuthenticated: false })
    }
    setIsPending(false)
  }, [])

  return { ...auth, isPending }
}
