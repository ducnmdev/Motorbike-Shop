import React from 'react'
import AdminLayout from '../../components/Admin/AdminLayout'
import ManageOrder from '../../components/Admin/ManageOrder'
import { Helmet } from "react-helmet";

function ManageOrderPage() {
    return (
        <>
            <Helmet>
                <title>Danh sách đơn hàng</title>
                <meta name="description" content="" />
            </Helmet>
            <AdminLayout>
                <ManageOrder />
            </AdminLayout>
        </>
    )
}

export default ManageOrderPage