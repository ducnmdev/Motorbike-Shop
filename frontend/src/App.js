import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import LoginPage from './pages/Auth/LoginPage.jsx'
import RegisterPage from './pages/Auth/RegisterPage.jsx'
import MotorcycleListPage from './pages/Motorcycles/MotorcycleListPage.jsx'
import MotorcycleDetailPage from './pages/Motorcycles/MotorcycleDetailPage.jsx'
import AccessoryListPage from './pages/Accessories/AccessoryListPage.jsx'
import SparePartListPage from './pages/SpareParts/SparePartListPage.jsx'
import SparePartDetailPage from './pages/SpareParts/SparePartDetailPage.jsx'
import AccessoriesDetailPage from './pages/Accessories/AccessoryDetailPage.jsx'
import AccountInfoPage from './pages/User/AccountInfoPage.jsx'
import PromotionPage from './pages/Promotions/PromotionPage.jsx'
import EventPage from './pages/Events/EventPage.jsx'
import AccountSettingsPage from './pages/User/AccountSettingsPage.jsx'
import MotorcycleOrderListPage from './pages/User/MotorcycleOrderListPage.jsx'

import CreateMotorcycle from './pages/Motorcycles/MotorcycleCreatePage.jsx'
import CreateAccessory from './pages/Accessories/AccessoryCreatePage.jsx'
import CreateSparepart from './pages/SpareParts/SparePartCreatePage.jsx'

import { AuthContext } from './context/AuthContext.jsx'
import { Navigate } from 'react-router-dom';

function App() {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/dang-nhap' element={<LoginPage />} />
        <Route path='/dang-ky' element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path='/xe-may' element={<MotorcycleListPage />} />
        <Route path='/phu-kien' element={<AccessoryListPage />} />
        <Route path='/phu-tung' element={<SparePartListPage />} />
        <Route path='/khuyen-mai' element={<PromotionPage />} />
        <Route path='/su-kien' element={<EventPage />} />
        <Route path='/xe-may/:slug' element={<MotorcycleDetailPage />} />
        <Route path='/phu-tung/:slug' element={<SparePartDetailPage />} />
        <Route path='/phu-kien/:slug' element={<AccessoriesDetailPage />} />
        <Route path='/account/profile' element={!isLoggedIn ? <Navigate to="/" /> : <AccountInfoPage />} />
        <Route path='/account/settings' element={!isLoggedIn ? <Navigate to="/" /> : <AccountSettingsPage />} />
        <Route path='/account/orders/motorcycle' element={!isLoggedIn ? <Navigate to="/" /> : <MotorcycleOrderListPage />} />
      </Route>

      <Route path='/xe-may/create' element={<CreateMotorcycle />} />
      <Route path='/phu-kien/create' element={<CreateAccessory />} />
      <Route path='/phu-tung/create' element={<CreateSparepart />} />
    </Routes>
  );
}

export default App;
