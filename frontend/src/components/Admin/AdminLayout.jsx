import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminLayout({ children }) {

    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signout`, {}, {
                withCredentials: true,
            });
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi logout:', error);
        }
    }

    return (
        <>
            <header className='fixed left-0 top-0 z-[1000002] flex h-[72px] w-full items-center justify-between border-b border-neutral-200 bg-white px-8 shadow'>
                <Link className='flex items-center no-underline text-black transform -skew-x-[13deg]' to='/admin/dashboard'>
                    <div className='font-vietnam font-black text-[40px] bg-[#de0000] text-white px-3 mr-2'>
                        KUSZ
                    </div>
                </Link>
                <div className='flex items-center space-x-1 text-xl font-semibold'>
                    <p className='m-0'>Minh Đức</p>
                    <span>/</span>
                    <button onClick={handleSignout} className='text-[#de0000]'>Đăng xuất</button>
                </div>
            </header>
            <div className="flex min-h-screen bg-white text-gray-800 mt-20 font-vietnam">
                <AdminSidebar />
                {children}
            </div>
        </>
    )
}

export default AdminLayout