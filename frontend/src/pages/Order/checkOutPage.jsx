import React from 'react'
import CheckOut from '../../components/Order/CheckOut'
import { Helmet } from 'react-helmet'

function checkOutPage() {
    return (
        <>
            <Helmet>
                <title>Xác nhận thông tin</title>
                <meta name="description" content="" />
            </Helmet>
            <CheckOut />
        </>
    )
}

export default checkOutPage