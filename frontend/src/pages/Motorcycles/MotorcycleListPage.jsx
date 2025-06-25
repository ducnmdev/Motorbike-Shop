import React from 'react'
import MotorcycleList from '../../components/Motorcycle/MotorcycleList.jsx'
import banner1 from '../../assets/images/banners/home/banner1.png'
import banner2 from '../../assets/images/banners/home/banner2.png'
import banner3 from '../../assets/images/banners/home/banner3.png'
import banner4 from '../../assets/images/banners/home/banner4.png'
import banner5 from '../../assets/images/banners/home/banner5.png'
import banner6 from '../../assets/images/banners/home/banner6.png'
import BannerCarousel from '../../components/Layout/BannerCarousel.jsx'

function Banner() {
  const banners = [
    banner1, banner2, banner3, banner4, banner5, banner6
  ]

  return (
    <BannerCarousel images={banners} />
  )
}

function MotorcyclesPage() {
  return (
    <>
      <Banner/>
      <MotorcycleList/>
    </>
  )
}

export default MotorcyclesPage