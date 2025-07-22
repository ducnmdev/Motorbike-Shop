import React from 'react'
import AccountInfo from '../../components/User/AccountInfo.jsx'
import AccountSidebar from '../../components/User/AccountSidebar.jsx'
import { Helmet } from 'react-helmet'

function AccountInfoPage() {
  return (
    <>
      <Helmet>
        <title>Thông tin tài khoản</title>
        <meta name="description" content="" />
      </Helmet>
      < div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam" >
        <AccountSidebar />
        <AccountInfo />
      </div>
    </>
  )
}

export default AccountInfoPage