import React from 'react'
import AccountSettings from '../../components/User/AccountSettings.jsx'
import AccountSidebar from '../../components/User/AccountSidebar.jsx'

function AccountSettingsPage() {
  return (
    <>
      < div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam" >
        <AccountSidebar />
        <AccountSettings />
      </div>
    </>
  )
}

export default AccountSettingsPage