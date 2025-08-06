import React from 'react'

import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import DashboardHeader from './DashboardHeader'
import SideBar from './SideBar'

const DashboardLayout = () => {
  const user = useSelector((state) => state.auth.user)

  if (!user) {
    return <div>Loading…</div>
  }

  return (
    <div className="min-h-screen flex bg-bg">
      <SideBar />

      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 bg-bg p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
