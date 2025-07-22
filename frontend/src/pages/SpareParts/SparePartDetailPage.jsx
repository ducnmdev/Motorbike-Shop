import React, { useState } from 'react'
import SparePartDetail from '../../components/SparePart/SparePartDetail.jsx'
import { Helmet } from 'react-helmet'

function SparePartDetailPage() {
  const [tenPhuTung, setTenPhuTung] = useState('')

  const handleGetTenPhuTung = (name) => {
    setTenPhuTung(name);
  }

  return (
    <>
      <Helmet>
        <title>{tenPhuTung || 'Đang tải...'}</title>
        <meta name="description" content="" />
      </Helmet>
      <SparePartDetail getTenPhuTung={handleGetTenPhuTung} />
    </>
  )
}

export default SparePartDetailPage