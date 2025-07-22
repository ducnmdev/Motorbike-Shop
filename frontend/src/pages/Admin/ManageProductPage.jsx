import React from 'react'
import AdminLayout from '../../components/Admin/AdminLayout'
import ManageProduct from '../../components/Admin/ManageProduct'
import { Helmet } from "react-helmet";

function ManageProductPage() {
    return (
        <>
            <Helmet>
                <title>Danh sách sản phẩm</title>
                <meta name="description" content="" />
            </Helmet>
            <AdminLayout>
                <ManageProduct />
            </AdminLayout>
        </>
    )
}

export default ManageProductPage