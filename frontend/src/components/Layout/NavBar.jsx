import React from 'react'
// import logo from "../../../assets/images/logos/logo.png"
// import isc from "../../../assets/images/icons/icon_shopping_cart.png"
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');
    const [user, setUser] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setActiveLink(location.pathname + location.hash);
    }, [location.pathname, location.hash])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =
                    await axios.get('http://localhost:5000/api/v1/user/account/profile', {
                        withCredentials: true // bắt buộc
                    });
                setUser(response.data.user);
                // console.log(response.data.user)
            } catch (error) {
                // console.error('Error create User data', error);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const handleSignout = async () => {
        try {
            await axios.post('http://localhost:5000/api/v1/auth/signout', {}, {
                withCredentials: true,
            });
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi logout:', error);
        }
    }

    return (
        <header>
            <nav className='fixed left-0 top-0 z-[50] flex h-[72px] w-full items-center justify-between border-b border-neutral-200 bg-white px-8 text-neutral-800 shadow'>
                <Link className='flex items-center no-underline text-black transform -skew-x-[13deg]' to='/'>
                    <div className='font-vietnam font-black text-[40px] bg-[#de0000] text-white px-3 mr-2'>
                        {/* <img src={logo} alt='logo' /> */}
                        KUSZ
                    </div>
                </Link>

                <section>
                    <ul className='flex font-bold p-0  m-0'>
                        <Link className='relative no-underline text-[rgb(38,38,38)] group' to='/'>
                            <li className='px-3 font-vietnam py-1 uppercase'>Trang chủ</li>
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#de0000] transition-opacity duration-300 group-hover:!opacity-100
                            ${activeLink === '/' ? 'group-hover:!opacity-100' : 'opacity-0'}`}></span>
                        </Link>

                        <Link className='relative no-underline text-[rgb(38,38,38)] group' to='/xe-may'>
                            <li className='px-3 font-vietnam py-1 uppercase'>Xe máy</li>
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#de0000] transition-opacity duration-300 group-hover:!opacity-100
                            ${activeLink.startsWith('/xe-may') ? 'opacity-100' : 'opacity-0'}`}></span>
                        </Link>

                        <Link className='relative no-underline text-[rgb(38,38,38)] group' to='/phu-kien'>
                            <li className='px-3 font-vietnam py-1 uppercase'>Phụ tùng và Phụ kiện</li>
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#de0000] transition-opacity duration-300 group-hover:!opacity-100
                            ${activeLink.startsWith('/phu-kien') ? 'opacity-100' : 'opacity-0'}`}></span>
                        </Link>

                        <Link className='relative no-underline text-[rgb(38,38,38)] group' to='/khuyen-mai'>
                            <li className='px-3 font-vietnam py-1 uppercase'>Khuyến mãi</li>
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#de0000] transition-opacity duration-300 group-hover:!opacity-100
                            ${activeLink.startsWith('/khuyen-mai') ? 'opacity-100' : 'opacity-0'}`}></span>
                        </Link>

                        <Link className='relative no-underline text-[rgb(38,38,38)] group' to='/su-kien'>
                            <li className='px-3 font-vietnam py-1 uppercase'>Sự kiện</li>
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#de0000] transition-opacity duration-300 group-hover:!opacity-100
                            ${activeLink.startsWith('/su-kien') ? 'opacity-100' : 'opacity-0'}`}></span>
                        </Link>
                    </ul>
                </section>

                <section className='flex h-full items-center relative'>
                    {user ? (
                        <div className='relative' ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className='font-vietnam font-bold text-lg no-underline w-max rounded-sm bg-[#de0000] px-3 py-2 text-white'
                            >
                                {user.fullName}
                            </button>

                            {showDropdown && (
                                <div className='absolute right-0 top-full mt-2 w-44 bg-white shadow-lg rounded-md border z-[1000]'>
                                    <Link to='/account/profile'
                                        className='block px-4 py-2 text-sm hover:bg-gray-100 font-vietnam text-black no-underline text-center'>
                                        Tài khoản
                                    </Link>
                                    <Link to='/account/orders/motorcycle'
                                        className='block px-4 py-2 text-sm hover:bg-gray-100 font-vietnam text-black no-underline text-center'>
                                        Đơn hàng
                                    </Link>
                                    <Link to='/account/settings'
                                        className='block px-4 py-2 text-sm hover:bg-gray-100 font-vietnam text-black no-underline text-center'>
                                        Cài đặt
                                    </Link>
                                    <button onClick={handleSignout}
                                        className='w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-vietnam text-center'>
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link className='no-underline w-max rounded-sm bg-[#de0000] px-3 py-2 font-bold text-white'
                            to='/dang-nhap'>
                            <p className='font-vietnam font-bold m-0 '>Đăng nhập</p>
                        </Link>
                    )}
                </section>


            </nav>
        </header>
    )
}

export default NavBar