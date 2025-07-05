import React from 'react'
// import logo from "../../../assets/images/logos/logo.png"
// import isc from "../../../assets/images/icons/icon_shopping_cart.png"
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

function NavBar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');
    const [user, setUser] = useState();

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

                <section className='flex h-full items-center'>
                    {/* <Link className='' to=''>
                        <svg className='h-9 w-auto pr-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#de0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#de0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </Link> */}
                    {user
                        ?
                        <Link className='font-vietnam font-bold text-lg no-underline w-max rounded-sm bg-[#de0000] px-3 py-2 text-white'
                        to='/account/profile'>
                            {user.fullName}
                        </Link>
                        :
                        <Link className='no-underline w-max rounded-sm bg-[#de0000] px-3 py-2 font-bold text-white' 
                        to='/dang-nhap'>
                            <p className='font-vietnam font-bold m-0 '>Đăng nhập</p>
                        </Link>
                    }

                </section>
            </nav>
        </header>
    )
}

export default NavBar