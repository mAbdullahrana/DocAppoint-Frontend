import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  email: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true

      localStorage.setItem('credentials', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token
      }))
    },

    setCalendarSyncEnabled: (state, action) => {
      console.log("action.payload",action.payload)
      state.user.calendarSyncEnabled = action.payload
      localStorage.setItem('credentials', JSON.stringify({
        user: state.user,
        token: state.token
      }))
    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false

      localStorage.removeItem('credentials')
    },
  },
})

export const { setCredentials, clearCredentials, setEmail, setCalendarSyncEnabled } = authSlice.actions
export default authSlice
