import { MessageCircle, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function AdminViewDoctors({ doctors , setDoctors}) {
  const token = useSelector((state) => state.auth.token);
  
  const handleToggleStatus = async (doctorId, currentStatus) => {
    console.log(currentStatus)
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/users/${doctorId}/toggle-status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: !currentStatus }),
        },
      )
    
//  const data = await response.json()

      if (response.ok) {
        
        setDoctors((prev) =>
          prev.map((doctor) =>
            doctor._id === doctorId
              ? { ...doctor, active: !currentStatus }
              : doctor,
          ),
        )
        toast.success("User status updated successfully")
      }
    } catch (error) {
      toast.error("Error toggling user status")
      console.error('Error toggling user status:', error)
    }
  }
  return (
    // Admin View - Table Layout

    <div className="max-w-6xl mx-auto">
      <div className="bg-surface border border-border rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-primary-light">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {doctors.map((doc) => (
              <tr key={doc._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-surface text-sm font-bold mr-3">
                      {doc.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary">
                        {doc.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                  {doc.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                  {doc.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      doc.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {doc.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleToggleStatus(doc._id, doc.active)}
                    className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      doc.active
                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                        : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    }`}
                  >
                    {doc.active ? (
                      <>
                        <XCircle size={14} className="mr-1" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} className="mr-1" />
                        Activate
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminViewDoctors
