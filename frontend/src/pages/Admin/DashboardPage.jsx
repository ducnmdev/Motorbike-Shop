import React from 'react'
import Dashboard from '../../components/Admin/Dashboard'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Helmet } from "react-helmet";

function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="" />
      </Helmet>
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    </>
  )
}

export default DashboardPage