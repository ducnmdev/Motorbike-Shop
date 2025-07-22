import React from 'react'
import AdminLayout from '../../components/Admin/AdminLayout'
import OrderDetail from '../../components/Admin/OrderDetail'
import { Helmet } from "react-helmet";

function OrderDetailPage() {
    return (
        <>
            <Helmet>
                <title>Chi tiết đơn hàng</title>
                <meta name="description" content="" />
            </Helmet>
            <AdminLayout>
                <OrderDetail />
            </AdminLayout>
        </>
    )
}

export default OrderDetailPage