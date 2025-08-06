import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './features/Dashboard/DashboardLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

import AdminDashboard from './features/Admin/AdminDashboard'
import ChatList from './features/Chat/ChatList'
import SingleChat from './features/Chat/SingleChat'
import DoctorDashboard from './features/Dashboard/DoctorDashboard/DoctorDashboard'
import DoctorSettings from './features/Dashboard/DoctorDashboard/DoctorSettings'
import RealTimeAppointments from './features/Dashboard/DoctorDashboard/RealTimeAppointments'
import Doctors from './features/Dashboard/PatientDashboard/Doctors'
import NewAppointMent from './features/Dashboard/PatientDashboard/NewAppointMent'
import PatientDashboard from './features/Dashboard/PatientDashboard/PatientDashboard'
import PatientSettings from './features/Dashboard/PatientDashboard/PatientSettings'
import Review from './features/Dashboard/Review/Review'
import PaymentSuccess from './features/Payment/PaymentSuccess'
import Stripe from './features/Payment/Stripe'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './ui/ProtectedRoute'
import AdminAppointments from './features/Admin/AdminAppointments'
import AdminPatients from './features/Admin/AdminPatients'
import AdminDoctors from './features/Admin/AdminDoctors'
import TransactionListing from './features/Admin/TransactionListing'
import OAuth2RedirectHandler from './ui/OAuth2RedirectHandler'

function About() {
  return (
    <div className="text-3xl font-bold underline h-full bg-red-800 ">
      Dashboard
    </div>
  )
}

const queryClient = new QueryClient()

function App() {
  const user = useSelector((state) => state.auth.user)

  console.log(import.meta.env.VITE_API_URL)
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {user?.role === 'patient' && (
            <>
              <Route index element={<PatientDashboard />} />
              <Route path="settings" element={<PatientSettings />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="chat" element={<ChatList />} />
              <Route path="chat/:chatId" element={<SingleChat />} />
              <Route path="appointments" element={<RealTimeAppointments />} />
              <Route
                path="appointments/new/:doctorID"
                element={<NewAppointMent />}
              />
              <Route path="review/:appointmentID" element={<Review />} />
              <Route path="payment" element={<Stripe />} />
              <Route path="payment-success" element={<PaymentSuccess />} />
            </>
          )}
          {user?.role === 'doctor' && (
            <>
              <Route index element={<DoctorDashboard />} />
              <Route path="settings" element={<DoctorSettings />} />
              <Route path="chat" element={<ChatList />} />
              <Route path="chat/:chatId" element={<SingleChat />} />
              <Route path="appointments" element={<RealTimeAppointments />} />
            </>
          )}

          {user?.role === 'admin' && (
            <>
              {console.log('user', user)}
              <Route index element={<AdminDashboard />} />
              <Route path='appointments' element={<AdminAppointments />} />
              <Route path='doctors' element={<AdminDoctors />} />
              <Route path='patients' element={<AdminPatients />} />
              <Route path='transactions' element={<TransactionListing />} />
            </>
          )}
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth-callback" element={<OAuth2RedirectHandler />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            background: '#363636',
            color: '#fff',
          },
          className: 'font-semibold',
        }}
      />
    </QueryClientProvider>
  )
}

export default App
