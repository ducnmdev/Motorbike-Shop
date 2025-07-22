import React from 'react'
import CreateMotorcycle from '../../components/Admin/CreateMotorcycle'
import AdminLayout from '../../components/Admin/AdminLayout'
import { Helmet } from "react-helmet";

function CreateMotorcyclePage() {
    return (
        <>
            <Helmet>
                <title>Thêm/sửa xe máy</title>
                <meta name="description" content="" />
            </Helmet>
            <AdminLayout>
                <CreateMotorcycle />
            </AdminLayout>
        </>
    )
}

export default CreateMotorcyclePage