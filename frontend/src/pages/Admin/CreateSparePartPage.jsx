import React from 'react'
import CreateSparePart from '../../components/Admin/CreateSparePart'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Helmet } from "react-helmet";

function CreateSparePartPage() {
    return (
        <>
            <Helmet>
                <title>Thêm/sửa phụ tùng</title>
                <meta name="description" content="" />
            </Helmet>
            <AdminLayout>
                <CreateSparePart />
            </AdminLayout>
        </>
    )
}

export default CreateSparePartPage