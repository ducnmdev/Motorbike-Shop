import { Link } from 'react-router-dom'
// import location_icon from '../../assets/images/icons/location_icon.png'
// import phone_icon from '../../assets/images/icons/phone_icon.png'

function Footer() {
    return (
        <footer className='relative z-[50]'> 
            <section className='bg-[#de0000] py-16 lg:px-16'>
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4 xl:gap-16'>
                    <div className='col-span-1 flex flex-col gap-4'>
                        <p className='font-vietnam text-xl font-bold text-white uppercase md:text-2xl m-0'>Về <span className='italic font-extrabold'>KUSZ</span></p>
                        <p className='font-vietnam text-sm text-white md:text-base'>
                            <span className='italic font-extrabold'>KUSZ</span> - Điểm khởi đầu cho mọi hành trình của bạn! Với sự kết hợp hoàn hảo giữa thiết kế hiện đại và công nghệ tiên tiến, 
                            chúng tôi mang đến những chiếc xe không chỉ đẹp mắt mà còn mạnh mẽ, 
                            đáp ứng mọi mong đợi của bạn trong cuộc sống.</p>
                    </div>
                    <div className='col-span-1 flex flex-col gap-4'>
                        <p className='font-vietnam text-xl font-bold text-white uppercase md:text-2xl m-0'>Giờ hành chính</p>
                        <ul className='flex flex-col font-vietnam  text-sm text-white sm:text-base md:text-lg gap-2 p-0 m-0'>
                            <li>Thứ Hai - Thứ Sáu: 9 giờ đến 17 giờ</li>
                            <li>Thứ bảy: 10 giờ đến 14 giờ</li>
                        </ul>
                    </div>
                    <div className='col-span-1 flex flex-col gap-4'>
                        <p className='font-vietnam text-xl font-bold text-white uppercase md:text-2xl m-0'>Dịch vụ</p>
                        <ul className='flex flex-col text-sm sm:text-base md:text-lg gap-2 p-0 m-0'>
                            <li><Link className='font-vietnam text-white no-underline transition-colors hover:text-[#de0000]' to='/xe-may'>Xe máy</Link></li>
                            <li><Link className='font-vietnam text-white no-underline transition-colors hover:text-[#de0000]' to='/phu-kien'>Phụ tùng và Phụ kiện</Link></li>
                        </ul>
                    </div>
                    <div className='col-span-1 flex flex-col gap-4'>
                        <p className='font-vietnam text-xl font-bold text-white uppercase md:text-2xl m-0'>Chi nhánh</p>
                        <ul className='flex flex-col font-vietnam  text-sm text-white sm:text-base md:text-lg gap-2 p-0 m-0'>
                            <li className='flex'>Quận Tây Hồ, Thành phố Hà Nội, Việt Nam</li>
                            <li className='flex'>0944882003</li>
                        </ul>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer