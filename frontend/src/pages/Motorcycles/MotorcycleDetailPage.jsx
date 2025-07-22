import React from 'react'
import MotorcycleDetail from '../../components/Motorcycle/MotorcycleDetail.jsx'
import { useState } from 'react';
import { Helmet } from 'react-helmet'

function MotorcycleDetailPage() {
  const [tenXe, setTenXe] = useState('');

  const handleGetTenXe = (name) => {
    setTenXe(name);
  };

  

  return (
    <>
      <Helmet>
        <title>{tenXe || 'Đang tải...'}</title>
        <meta name="description" content="" />
      </Helmet>
      <MotorcycleDetail getTenXe={handleGetTenXe} />
    </>
  )
}

export default MotorcycleDetailPage