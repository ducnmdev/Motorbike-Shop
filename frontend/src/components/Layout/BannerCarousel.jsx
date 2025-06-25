import React, { useState } from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BannerCarousel({ images, margin = false }) {

    const [count, setCount] = useState(1);
    const sliderRef = useRef(null);

    // count được cập nhật theo thứ tự slide hiện tại qua afterChange
    const handleAfterChange = (current) => {
        setCount(current + 1);
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        afterChange: handleAfterChange,
    };

    return (
        <section className={`w-full ${ margin ? '' : 'mt-[72px]' } overflow-hidden`}>
            <div className='relative w-full'>
                <div className="banner-carousel w-full">
                    <Slider ref={sliderRef} {...settings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <button className="w-full h-auto p-0">
                                    <img className='w-full h-auto object-cover' src={image} alt={`Banner ${index + 1}`} />
                                </button>
                            </div>
                        ))}
                    </Slider>
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white mt-7 flex justify-between items-center w-[169px]">
                        <div onClick={prevSlide} className="relative w-[55px] h-[55px] rounded-full border cursor-pointer">
                            <div className='absolute top-1/2 left-1/2 w-[10px] h-[10px] transform translate-x-[-30%] translate-y-[-50%] rotate-[-45deg] border-t border-l border-white'></div>
                        </div>
                        <div className="relative text-[16px] font-vietnam">{count}/{images.length}</div>
                        <div onClick={nextSlide} className="relative w-[55px] h-[55px] rounded-full border cursor-pointer transform rotate-[45deg] border-t border-r border-white">
                            <div className='absolute top-1/2 left-1/2 w-[10px] h-[10px] transform translate-x-[-70%] translate-y-[-50%] rotate-[90deg] border-t border-l border-white'></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerCarousel;
