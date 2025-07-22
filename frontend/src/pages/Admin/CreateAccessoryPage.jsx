import React from 'react'
import CreateAccessory from '../../components/Admin/CreateAccessory'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Helmet } from "react-helmet";

function CreateAccessoryPage() {
    return (
        <>
            <Helmet>
                <title>Thêm/sửa phụ kiện</title>
                <meta name="description" content="" />
            </Helmet>
            <AdminLayout>
                <CreateAccessory />
            </AdminLayout>
        </>
    )
}

export default CreateAccessoryPage