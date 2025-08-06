import { Calendar, DollarSign, UserCheck, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import TransactionListing from './TransactionListing'
import { useAdminDashboardData } from './useAdminDashboardData'

function AdminDashboard() {
  const user = useSelector((state) => state.auth.user)
  const { data, isPending } = useAdminDashboardData()

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="text-2xl font-bold text-primary mt-1">{value}</p>
          {change && (
            <p
              className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {change > 0 ? '+' : ''}
              {change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  )

  if (isPending) {
    return (
      <div className="min-h-screen bg-bg py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-lg">Loading admin dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted">Welcome back, {user?.name || 'Admin'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={data?.data?.totalPatients}
            icon={Users}
            color="bg-blue-500"
            // change={12}
          />
          <StatCard
            title="Total Doctors"
            value={data?.data?.totalDoctors}
            icon={UserCheck}
            color="bg-green-500"
            // change={8}
          />
          <StatCard
            title="Total Appointments"
            value={data?.data?.totalAppointments}
            icon={Calendar}
            color="bg-purple-500"
            // change={15}
          />
          <StatCard
            title="Total Revenue"
            value={`$${data?.data?.totalRevenue}`}
            icon={DollarSign}
            color="bg-yellow-500"
            // change={23}
          />
        </div>

        {/* <TransactionListing /> */}
      </div>
    </div>
  )
}

export default AdminDashboard
