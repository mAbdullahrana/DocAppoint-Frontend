import { configureStore } from '@reduxjs/toolkit'
import authSlice from './src/features/authentication/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})