import React from 'react'
import MotorcycleOrderList from '../../components/User/MotorcycleOrderList.jsx'
import AccountSidebar from '../../components/User/AccountSidebar.jsx'

function MotorcycleOrderListPage() {
  return (
    <>
      < div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam" >
        <AccountSidebar />
        <MotorcycleOrderList />
      </div>
    </>
  )
}

export default MotorcycleOrderListPage