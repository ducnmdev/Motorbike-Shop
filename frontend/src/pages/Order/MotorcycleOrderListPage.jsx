import React from 'react'
import MotorcycleOrderList from '../../components/Order/MotorcycleOrderList.jsx'
import AccountLayout from '../../components/User/AccountLayout.jsx'
import { Helmet } from 'react-helmet'

function MotorcycleOrderListPage() {
  return (
    <>
      <Helmet>
        <title>Danh sách đơn hàng</title>
        <meta name="description" content="" />
      </Helmet>
      <AccountLayout  >
        <MotorcycleOrderList />
      </AccountLayout>
    </>
  )
}

export default MotorcycleOrderListPage