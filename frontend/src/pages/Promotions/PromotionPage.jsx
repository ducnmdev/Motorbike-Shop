import React from 'react'
// import comingsoon from '../../assets/images/banners/ComingSoon.png'
import { Helmet } from 'react-helmet'

function PromotionPage() {
    return (
        <>
            <Helmet>
                <title>Khuyến mãi</title>
                <meta name="description" content="" />
            </Helmet>
            <div className='max-w-full min-h-screen mt-24 font-vietnam text-7xl pl-10 font-bold italic'>
                Coming soon...
                {/* <img className='w-1/3' src={comingsoon} alt="" /> */}
            </div>
        </>
    )
}

export default PromotionPage