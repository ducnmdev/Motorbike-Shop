import React from 'react'
import MotorcycleOrderList from '../../components/Order/MotorcycleOrderList.jsx'
import AccountLayout from '../../components/User/AccountLayout.jsx'

function MotorcycleOrderListPage() {
  return (
    <AccountLayout  >
      <MotorcycleOrderList />
    </AccountLayout>
  )
}

export default MotorcycleOrderListPage