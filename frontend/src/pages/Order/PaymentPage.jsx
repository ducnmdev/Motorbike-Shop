import React from 'react'
import Payment from '../../components/Order/Payment'
import { Helmet } from 'react-helmet'

function PaymentPage() {
    return (
        <>
            <Helmet>
                <title>Thanh toán</title>
                <meta name="description" content="" />
            </Helmet>
            <Payment />
        </>
    )
}

export default PaymentPage