import React from 'react'
import CheckOut from '../../components/Order/CheckOut'
import { Helmet } from 'react-helmet'

function CheckoutPage() {
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

export default CheckoutPage