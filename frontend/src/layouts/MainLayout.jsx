import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Layout/NavBar.jsx';
import Footer from '../components/Layout/Footer.jsx';
import { Outlet } from 'react-router-dom';

// gồm header-*body*-footer-button scroll to top

function ScrollToTopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button onClick={scrollToTop} className="fixed z-[100] w-[40px] h-[40px] bottom-[32px] right-[32px] p-3 bg-[#4d4d4d] hover:bg-[#c00] text-black">
            <div className="absolute top-4 left-[15px] w-2.5 h-2.5 border-t-2 border-r-2 rotate-[-45deg]"></div>
        </button>
    );
};

function MainLayout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollToTopButton />
        </>
    );
};

export default MainLayout;