import React from 'react'
import SPAccessoryOrderList from '../../components/Order/SPAccessoryOrderList.jsx'
import AccountSidebar from '../../components/User/AccountSidebar.jsx'

function SPAccessoryOrderListPage() {
    return (
        <>
            < div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam" >
                <AccountSidebar />
                <SPAccessoryOrderList />
            </div>
        </>
    )
}

export default SPAccessoryOrderListPage