import React, { useState } from 'react';
import AccessoryDetail from '../../components/Accessory/AccessoryDetail.jsx';
import { Helmet } from "react-helmet";

function AccessoryDetailPage() {
  const [tenPhuKien, setTenPhuKien] = useState('');

  const handleGetTenPhuKien = (name) => {
    setTenPhuKien(name);
  };

  return (
    <>
      <Helmet>
        <title>{tenPhuKien || 'Đang tải...'}</title>
        <meta name="description" content="" />
      </Helmet>
      <AccessoryDetail getTenPhuKien={handleGetTenPhuKien} />
    </>
  );
}

export default AccessoryDetailPage;
