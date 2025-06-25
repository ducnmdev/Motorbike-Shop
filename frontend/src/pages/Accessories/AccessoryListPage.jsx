import React from 'react'
import AccessoryList from '../../components/Accessory/AccessoryList.jsx'
import banner_accessories from '../../assets/images/banners/home/banner_accessoriespage.png'

function AccessoriesPage() {
  return (
    <>
        <div>
            <img src={banner_accessories} 
            className='w-full h-auto object-cover'
            alt="" />
        </div>
      <AccessoryList/>
    </>
  )
}

export default AccessoriesPage