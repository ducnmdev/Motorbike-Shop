import React from 'react'
import SparePartList from '../../components/SparePart/SparePartList.jsx'
import banner_spareparts from '../../assets/images/banners/home/banner_spareparts.png'
import { Helmet } from 'react-helmet'

function SparePartPage() {
  return (
    <>
      <Helmet>
        <title>Phụ tùng</title>
        <meta name="description" content="" />
      </Helmet>
      <div>
        <img src={banner_spareparts}
          className='w-full h-auto object-cover'
          alt="" />
      </div>
      <SparePartList />
    </>
  )
}

export default SparePartPage