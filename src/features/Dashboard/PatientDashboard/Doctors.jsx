import { useNavigate } from 'react-router-dom'
import { useCreateChat } from '../../Chat/useCreateChat'
import { useGetDoctors } from './useGetDoctors'

import { useEffect, useState } from 'react'
import AdminViewDoctors from '../../Admin/AdminViewDoctors'
import { useAuth } from '../../authentication/useAuth'
import PatientViewDoctors from './PatientViewDoctors'

function Doctors() {
  const { data, isLoading, error } = useGetDoctors()
  const { createChat, isPending, chatData } = useCreateChat()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    if (chatData?.chatGroup?._id) {
      navigate(`/dashboard/chat/${chatData.chatGroup._id}`)
    } else if (chatData?.chatGroup) {
      navigate('/dashboard/chat')
    }
  }, [chatData, navigate])

  useEffect(() => {
    if (data?.users) {
      setDoctors(data.users)
    }
  }, [data])

  const handleChatClick = (doctorId) => {
    createChat(doctorId)
  }

  console.log("*********doctors*********",data)

  return (
    <div className="min-h-screen bg-bg py-10 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        {user?.role === 'admin' ? 'Manage Doctors' : 'Our Doctors'}
      </h1>
      {isLoading && <div className="text-center text-lg">Loading...</div>}
      {error && (
        <div className="text-center text-danger">Error: {error.message}</div>
      )}

      {!isLoading &&
        !error &&
        (user?.role === 'admin' ? (
          <AdminViewDoctors doctors={doctors} setDoctors={setDoctors} />
        ) : (
          <PatientViewDoctors
            doctors={doctors}
            handleChatClick={handleChatClick}
            isPending={isPending}
          />
        ))}

      {doctors.length === 0 && !isLoading && (
        <div className="text-center text-muted mt-12">No doctors found.</div>
      )}
    </div>
  )
}

export default Doctors
