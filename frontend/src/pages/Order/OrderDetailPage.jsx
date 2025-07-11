import React from 'react'
import OrderDetail from '../../components/Order/OrderDetail'
import AccountSidebar from '../../components/User/AccountSidebar.jsx'

function OrderDetailPage() {
    return (
        <>
            < div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam" >
                <AccountSidebar />
                <OrderDetail />
            </div>
        </>
    )
}

export default OrderDetailPage