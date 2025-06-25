import React from 'react'
import SparePartList from '../../components/SparePart/SparePartList.jsx'
import banner_spareparts from '../../assets/images/banners/home/banner_spareparts.png'

function SparePartPage() {
  return (
    <>
        <div>
            <img src={banner_spareparts} 
            className='w-full h-auto object-cover'
            alt="" />
        </div>
      <SparePartList/>
    </>
  )
}

export default SparePartPage