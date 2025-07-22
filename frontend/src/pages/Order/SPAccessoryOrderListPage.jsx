import React from 'react'
import SPAccessoryOrderList from '../../components/Order/SPAccessoryOrderList.jsx'
import AccountSidebar from '../../components/User/AccountSidebar.jsx'
import { Helmet } from 'react-helmet'

function SPAccessoryOrderListPage() {
    return (
        <>
            <Helmet>
                <title>Danh sách đơn hàng</title>
                <meta name="description" content="" />
            </Helmet>
            < div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam" >
                <AccountSidebar />
                <SPAccessoryOrderList />
            </div>
        </>
    )
}

export default SPAccessoryOrderListPage