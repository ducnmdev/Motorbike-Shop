import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import banner1 from '../../assets/images/banners/home/banner1.png'
import banner2 from '../../assets/images/banners/home/banner2.png'
import banner3 from '../../assets/images/banners/home/banner3.png'
import banner4 from '../../assets/images/banners/home/banner4.png'
import banner5 from '../../assets/images/banners/home/banner5.png'
import banner6 from '../../assets/images/banners/home/banner6.png'
import BannerCarousel from '../../components/Layout/BannerCarousel'
import xe_tay_ga from '../../assets/images/thumbs/xe_tay_ga.png'
import xe_so from '../../assets/images/thumbs/xe_so.png'
import xe_con_tay from '../../assets/images/thumbs/xe_con_tay.png'
import xe_pkl from '../../assets/images/thumbs/xe_pkl.png'
import banner_promotion from '../../assets/images/banners/home/banner_promotion.png'
import banner_event from '../../assets/images/banners/home/banner_event.png'
import banner_spare_parts from '../../assets/images/banners/home/banner_spare_parts.png'
import banner_service from '../../assets/images/banners/home/banner_service.png'
import banner_new from '../../assets/images/banners/home/banner_new.png'


function Banner() {
  const banners = [
    banner1, banner2, banner3, banner4, banner5, banner6
  ]

  return (
        <BannerCarousel images={banners} />
  )
}

function Content() {

  const navigate = useNavigate();
  return (
    <>
      <section className='py-[30px]'>
        <div className='w-full h-full'>
          <div className='flex w-full h-full justify-end items-center pb-[30px] pr-60'>
            <Link className='flex no-underline'
              to='/xe-may'>
              <div className='flex justify-end'>
                <svg width="17" height="18" className='h-full' viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9.34837H16M8.61539 1.62109V16.6211" stroke="#DE0000" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
                <span className='uppercase px-3 text-[#de0000] font-vietnam font-semibold'>Xem tất cả sản phẩm</span>
              </div>
            </Link>
          </div>
          <div className='flex justify-center'>
            <Link className='flex no-underline'
              to='/xe-may#xe-tay-ga'>
              <div className="mx-3 group">
                <img src={xe_tay_ga} alt="" className="w-auto h-auto rounded-t-sm" />
                <div className="relative flex justify-center bg-[#f5f5f5] py-10 rounded-b-sm">
                  <div className="absolute top-1 w-[85px] h-[34px] bg-gray-100 transform -translate-y-full rounded-[51%_49%_100%_0_/_100%_100%_0_0]">
                    <div className="absolute w-[67px] h-[44px] bottom-1 shadow-[4px_14px_0_0_#f5f5f5] right-[77px] rounded-[0_100%_100%_0_/_100%_57%_43%_0]"></div>
                    <div className="absolute left-1/2 top-1/2 inline-block w-[10px] h-[10px] border-t-[3px] border-r-[3px] border-[#de0000] transform rotate-[45deg] translate-x-[2px] translate-y-[3px]">
                      <div className="absolute top-2 right-[-2px] w-[18px] h-[3px] bg-[#de0000] transform-origin-right-center transform rotate-[-45deg] -translate-y-[2.5px]"></div>
                    </div>
                    <div className="absolute w-[67px] h-[44px] bottom-1 shadow-[-4px_14px_0_0_#f5f5f5] left-[77px] rounded-[100%_0_0_100%_/_57%_100%_0_43%]"></div>
                  </div>
                  <span className="text-2xl font-bold text-[#5f5f5f] group-hover:text-[#de0000]">Xe Tay Ga</span>
                </div>
              </div>
            </Link>
            <Link className='flex no-underline'
              to='/xe-may#xe-so'>
              <div className="mx-3 group">
                <img src={xe_so} alt="" className="w-auto h-auto rounded-t-sm" />
                <div className="relative flex justify-center bg-[#f5f5f5] py-10 rounded-b-sm">
                  <div className="absolute top-1 w-[85px] h-[34px] bg-gray-100 transform -translate-y-full rounded-[51%_49%_100%_0_/_100%_100%_0_0]">
                    <div className="absolute w-[67px] h-[44px] bottom-1 shadow-[4px_14px_0_0_#f5f5f5] right-[77px] rounded-[0_100%_100%_0_/_100%_57%_43%_0]"></div>
                    <div className="absolute left-1/2 top-1/2 inline-block w-[10px] h-[10px] border-t-[3px] border-r-[3px] border-[#de0000] transform rotate-[45deg] translate-x-[2px] translate-y-[3px]">
                      <div className="absolute top-2 right-[-2px] w-[18px] h-[3px] bg-[#de0000] transform-origin-right-center transform rotate-[-45deg] -translate-y-[2.5px]"></div>
                    </div>
                    <div className="absolute w-[67px] h-[44px] bottom-1 shadow-[-4px_14px_0_0_#f5f5f5] left-[77px] rounded-[100%_0_0_100%_/_57%_100%_0_43%]"></div>
                  </div>
                  <span className="text-2xl font-bold text-[#5f5f5f] group-hover:text-[#de0000]">Xe Số</span>
                </div>
              </div>
            </Link>
            <Link className='flex no-underline'
              to='/xe-may#xe-con-tay'>
              <div className="mx-3 group">
                <img src={xe_con_tay} alt="" className="w-auto h-auto rounded-t-sm" />
                <div className="relative flex justify-center bg-[#f5f5f5] py-10 rounded-b-sm">
                  <div className="absolute top-1 w-[85px] h-[34px] bg-gray-100 transform -translate-y-full rounded-[51%_49%_100%_0_/_100%_100%_0_0]">
                    <div className="absolute w-[67px] h-[44px] bottom-1 shadow-[4px_14px_0_0_#f5f5f5] right-[77px] rounded-[0_100%_100%_0_/_100%_57%_43%_0]"></div>
                    <div className="absolute left-1/2 top-1/2 inline-block w-[10px] h-[10px] border-t-[3px] border-r-[3px] border-[#de0000] transform rotate-[45deg] translate-x-[2px] translate-y-[3px]">
                      <div className="absolute top-2 right-[-2px] w-[18px] h-[3px] bg-[#de0000] transform-origin-right-center transform rotate-[-45deg] -translate-y-[2.5px]"></div>
                    </div>
                    <div className="absolute w-[67px] h-[44px] bottom-1 shadow-[-4px_14px_0_0_#f5f5f5] left-[77px] rounded-[100%_0_0_100%_/_57%_100%_0_43%]"></div>
                  </div>
                  <span className="text-2xl font-bold text-[#5f5f5f] group-hover:text-[#de0000]">Xe Côn Tay</span>
                </div>
              </div>
            </Link>
            <Link className='flex no-underline'
              to='/xe-may#xe-mo-to'>
              <div className="mx-3 group">
                <img src={xe_pkl} alt="" className="w-auto h-auto rounded-t-sm" />
                <div className="relative flex justify-center bg-[#f5f5f5] py-10 rounded-b-sm">
                  <div className="absolute top-1 w-[85px] h-[34px] bg-gray-100 transform -translate-y-full rounded-[51%_49%_100%_0_/_100%_100%_0_0]">
                    <div className="absolute w-[67px] h-[44px] bottom-1 shadow-[4px_14px_0_0_#f5f5f5] right-[77px] rounded-[0_100%_100%_0_/_100%_57%_43%_0]"></div>
                    <div className="absolute left-1/2 top-1/2 inline-block w-[10px] h-[10px] border-t-[3px] border-r-[3px] border-[#de0000] transform rotate-[45deg] translate-x-[2px] translate-y-[3px]">
                      <div className="absolute top-2 right-[-2px] w-[18px] h-[3px] bg-[#de0000] transform-origin-right-center transform rotate-[-45deg] -translate-y-[2.5px]"></div>
                    </div>
                    <div className="absolute w-[67px] h-[44px] bottom-1 shadow-[-4px_14px_0_0_#f5f5f5] left-[77px] rounded-[100%_0_0_100%_/_57%_100%_0_43%]"></div>
                  </div>
                  <span className="text-2xl font-bold text-[#5f5f5f] group-hover:text-[#de0000]">Xe Phân Khối Lớn</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className='relative mt-[10px] w-full'>
        <div className='relative w-full'>
          <img className='w-full h-auto object-cover' src={banner_promotion} alt="" />
        </div>
        <div className='absolute top-0 right-0 w-[45%] h-full bg-[#de000066]'>
          <div className='pt-[80px] mx-[60px] h-full'>
            <div className='absolute h-[45px] w-auto'>
              <div className="absolute flex items-center top-0 left-0 h-[45px] w-[15px] bg-white skew-x-[-20deg]"></div>
              <div className="absolute flex items-center top-0 left-6 h-[45px] w-[190px] bg-white skew-x-[-20deg]">
                <p className='font-vietnam font-black text-[24px] text-[#de0000] uppercase px-[15px] m-0'>
                  Khuyến mãi</p>
              </div>
            </div>
            <div className='pt-[70px]'>
              {/* set max width */}
              <p className='relative max-w-[470px] font-vietnam text-white leading-[26px]'>KUSZ Việt Nam hỗ trợ đưa đón khách hàng khi học bằng A2 tại Trung tâm đào tạo An toàn giao thông tại Thành phố Hồ Chí Minh</p>
              <button className='mt-[10px]' type='button' onClick={() => { navigate('/khuyen-mai') }}>
                <div className='flex justify-center items-center transition duration-300 group hover:bg-white h:[45px] w-auto border-2 border-white pr-3 gap-2'>
                  <span className='font-vietnam font-semibold text-white group-hover:!text-[#393939] transition-colors duration-300 uppercase p-2'>Tìm hiểu ngay</span>
                  <span className="relative w-2 h-2 border-t-2 border-r-2 border-white rotate-45 transform transition duration-300 
                    before:content-[''] before:absolute before:top-0 before:w-[14px] before:h-[2px] before:bg-white 
                    before:right-0 before:transform before:-rotate-45 before:translate-y-[-50%] before:origin-right 
                    before:transition before:duration-300 group-hover:!border-[#393939] group-hover:before:bg-[#393939] ">
                  </span>
                </div>

              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='relative w-full'>
        <div className='relative w-full'>
          <img className='w-full h-auto object-cover' src={banner_event} alt="" />
        </div>
        <div className='absolute top-0 left-0 w-[45%] h-full bg-[#de000066]'>
          <div className='pt-[80px] mx-[60px] h-full'>
            <div className='absolute h-[45px] w-auto'>
              <div className="absolute flex items-center top-0 left-0 h-[45px] w-[15px] bg-white skew-x-[-20deg]"></div>
              <div className="absolute flex items-center top-0 left-6 h-[45px] w-[130px] bg-white skew-x-[-20deg]">
                <p className='font-vietnam font-black text-[24px] text-[#de0000] uppercase px-[15px] m-0'>
                  Sự kiện</p>
              </div>
            </div>
            <div className='pt-[70px]'>
              {/* set max width */}
              <p className='relative max-w-[470px] font-vietnam text-white leading-[26px]'>KUSZ Việt Nam ra mắt cộng đồng +84 Honda Bikers – Bắt sóng đam mê</p>
              <button className='mt-[10px]' type='button' onClick={() => { navigate('/su-kien') }}>
                <div className='flex justify-center items-center transition duration-300 group hover:bg-white h:[45px] w-auto border-2 border-white pr-3 gap-2'>
                  <span className='font-vietnam font-semibold text-white group-hover:!text-[#393939] transition-colors duration-300 uppercase p-2'>Tìm hiểu ngay</span>
                  <span className="relative w-2 h-2 border-t-2 border-r-2 border-white rotate-45 transform transition duration-300 
                    before:content-[''] before:absolute before:top-0 before:w-[14px] before:h-[2px] before:bg-white 
                    before:right-0 before:transform before:-rotate-45 before:translate-y-[-50%] before:origin-right 
                    before:transition before:duration-300 group-hover:!border-[#393939] group-hover:before:bg-[#393939] ">
                  </span>
                </div>

              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='relative w-full'>
        <div className='relative w-full'>
          <img className='w-full h-auto object-cover' src={banner_spare_parts} alt="" />
        </div>
        <div className='absolute top-0 right-0 w-[45%] h-full bg-[#de000066]'>
          <div className='pt-[80px] mx-[60px] h-full'>
            <div className='absolute h-[45px] w-auto'>
              <div className="absolute flex items-center top-0 left-0 h-[45px] w-[15px] bg-white skew-x-[-20deg]"></div>
              <div className="absolute flex items-center top-0 left-6 h-[45px] w-[325px] bg-white skew-x-[-20deg]">
                <p className='font-vietnam font-black text-[24px] text-[#de0000] uppercase px-[15px] m-0'>
                  Phụ tùng và Phụ kiện</p>
              </div>
            </div>
            <div className='pt-[70px]'>
              {/* set max width */}
              <p className='relative max-w-[470px] font-vietnam text-white leading-[26px]'>Bạn có thể lựa chọn những phụ kiện trang trí giúp cho chiếc xe thêm phần tinh tế, hoặc những phụ kiện hữu ích giúp cho hành trình trở nên tiện lợi và hữu dụng.</p>
              <button className='mt-[10px]' type='button' onClick={() => { navigate('/phu-kien') }}>
                <div className='flex justify-center items-center transition duration-300 group hover:bg-white h:[45px] w-auto border-2 border-white pr-3 gap-2'>
                  <span className='font-vietnam font-semibold text-white group-hover:!text-[#393939] transition-colors duration-300 uppercase p-2'>Tìm hiểu ngay</span>
                  <span className="relative w-2 h-2 border-t-2 border-r-2 border-white rotate-45 transform transition duration-300 
                    before:content-[''] before:absolute before:top-0 before:w-[14px] before:h-[2px] before:bg-white 
                    before:right-0 before:transform before:-rotate-45 before:translate-y-[-50%] before:origin-right 
                    before:transition before:duration-300 group-hover:!border-[#393939] group-hover:before:bg-[#393939] ">
                  </span>
                </div>

              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='relative w-full'>
        <div className='relative w-full'>
          <img className='w-full h-auto object-cover' src={banner_service} alt="" />
        </div>
        <div className='absolute top-0 left-0 w-[45%] h-full bg-[#de000066]'>
          <div className='pt-[80px] mx-[60px] h-full'>
            <div className='absolute h-[45px] w-auto'>
              <div className="absolute flex items-center top-0 left-0 h-[45px] w-[15px] bg-white skew-x-[-20deg]"></div>
              <div className="absolute flex items-center top-0 left-6 h-[45px] w-[335px] bg-white skew-x-[-20deg]">
                <p className='font-vietnam font-black text-[24px] text-[#de0000] uppercase px-[15px] m-0'>
                  Dịch vụ sau bán hàng</p>
              </div>
            </div>
            <div className='pt-[70px]'>
              {/* set max width */}
              <p className='relative max-w-[470px] font-vietnam text-white leading-[26px]'>KUSZ có các chính sách bảo hành, bảo hành điện tử, bảo dưỡng định kỳ, hướng dẫn sử dụng xe và thông báo triệu hồi đến quý khách hàng.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='relative w-full'>
        <div className='relative w-full'>
          <img className='w-full h-auto object-cover' src={banner_new} alt="" />
        </div>
        <div className='absolute top-0 right-0 w-[45%] h-full bg-[#00000066]'>
          <div className='pt-[80px] mx-[60px] h-full'>
            <div className='absolute h-[45px] w-auto'>
              <div className="absolute flex items-center top-0 left-0 h-[45px] w-[15px] bg-white skew-x-[-20deg]"></div>
              <div className="absolute flex items-center top-0 left-6 h-[45px] w-[135px] bg-white skew-x-[-20deg]">
                <p className='font-vietnam font-black text-[24px] text-[#393939] uppercase px-[15px] m-0'>
                Tin tức</p>
              </div>
            </div>
            <div className='pt-[70px]'>
              {/* set max width */}
              <p className='relative max-w-[470px] font-vietnam text-white leading-[26px]'>11/07/2024<br/>KUSZ Việt Nam giới thiệu thiết kế mới dòng xe Wave Alpha phiên bản Cổ điển và màu mới mẫu xe Super Cub C125</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function HomePage() {
  return (
    <>
      <Banner />
      <Content />
    </>
  )
}

export default HomePage
