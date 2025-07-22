import React from 'react'
import AccountSettings from '../../components/User/AccountSettings.jsx'
import AccountSidebar from '../../components/User/AccountSidebar.jsx'
import { Helmet } from 'react-helmet'

function AccountSettingsPage() {
  return (
    <>
      <Helmet>
        <title>Thay đổi mật khẩu</title>
        <meta name="description" content="" />
      </Helmet>
      < div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam" >
        <AccountSidebar />
        <AccountSettings />
      </div>
    </>
  )
}

export default AccountSettingsPage