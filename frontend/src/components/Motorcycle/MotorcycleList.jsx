import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Motorcycles() {

  const [data, setData] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [type, setType] = useState('')

  useEffect(() => {
    setActiveLink(location.hash);
    setType(location.hash.replace('#', ''));
  }, [location.hash])

  useEffect(() => {
    const fetchMotorcycles = async (type) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/xe-may/`, { params: { type } });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching motorcycles:", error);
        throw error;
      }
    };

    fetchMotorcycles(type)
  }, [type])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-[#de0000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className='px-[20px] max-w-[1390px] mx-auto'>
      <div className='mb-[56px] mt-[40px]'>
        <div className='max-w-[1350px]'>
          <div className='flex '>
            <div className={`font-vietnam text-[16px] mr-[20px] pb-[7x] leading-[26px] cursor-pointer
              ${activeLink === '' ? 'text-[#de0000] font-bold border-b-[5px] border-[#de0000]' : ''} `} onClick={() => navigate('/xe-may')}>Tất cả</div>
            <div className={`font-vietnam text-[16px] mr-[20px] pb-[7x] leading-[26px] cursor-pointer
              ${activeLink === '#xe-tay-ga' ? 'text-[#de0000] font-bold border-b-[5px] border-[#de0000]' : ''} `} onClick={() => navigate('/xe-may#xe-tay-ga')}>Xe tay ga</div>
            <div className={`font-vietnam text-[16px] mr-[20px] pb-[7x] leading-[26px] cursor-pointer
              ${activeLink === '#xe-so' ? 'text-[#de0000] font-bold border-b-[5px] border-[#de0000]' : ''} `} onClick={() => navigate('/xe-may#xe-so')}>Xe số</div>
            <div className={`font-vietnam text-[16px] mr-[20px] pb-[7x] leading-[26px] cursor-pointer
              ${activeLink === '#xe-con-tay' ? 'text-[#de0000] font-bold border-b-[5px] border-[#de0000]' : ''} `} onClick={() => navigate('/xe-may#xe-con-tay')}>Xe côn tay</div>
            <div className={`font-vietnam text-[16px] mr-[20px] pb-[7x] leading-[26px] cursor-pointer
              ${activeLink === '#xe-phan-khoi-lon' ? 'text-[#de0000] font-bold border-b-[5px] border-[#de0000]' : ''} `} onClick={() => navigate('/xe-may#xe-phan-khoi-lon')}>Xe phân khối lớn</div>
          </div>
        </div>
      </div>
      <div className='flex justify-between mb-[20px]'>
        <div className='flex items-center gap-[24px]'>
          <form>
            <div className="relative h-[56px] w-[251px] border-1 border-[#9e9e9e] focus-within:border-[#de0000]">
              <input type="text" className="h-full pr-1 pl-[18px] font-vietnam font-normal text-[16px]  leading-[26px]"
                placeholder="Nhập tên loại xe" />
              <svg className='absolute right-[18px] top-1/2 -translate-y-1/2' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8828 0C7.40699 0 3.76562 3.64137 3.76562 8.11719C3.76562 10.1445 4.51273 12.0007 5.74605 13.4247L0.171602 18.9998C-0.0572265 19.2286 -0.0571875 19.5996 0.171641 19.8284C0.400469 20.0573 0.771445 20.0572 1.00027 19.8284L6.57465 14.2534C7.99883 15.4871 9.8552 16.2344 11.8828 16.2344C16.3586 16.2344 20 12.593 20 8.11719C20 3.64137 16.3586 0 11.8828 0ZM11.8828 15.0625C8.05313 15.0625 4.9375 11.9468 4.9375 8.11719C4.9375 4.28754 8.05316 1.17188 11.8828 1.17188C15.7125 1.17188 18.8281 4.28754 18.8281 8.11719C18.8281 11.9468 15.7125 15.0625 11.8828 15.0625Z" fill="#393939"></path>
              </svg>
            </div>
          </form>
          <div className='flex items-center gap-[24px]'>
            <div className="flex justify-center items-center w-[60px] h-[60px] text-white border-[1.5px] border-[#de0000] rounded-full cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_11327_67370)">
                  <path d="M12.0035 23.9983C11.6264 23.9983 11.3121 23.8726 11.0607 23.6212C10.8093 23.3698 10.6836 23.0555 10.6836 22.6784V13.3333L1.20041 1.42276C0.969574 1.11421 0.938148 0.799943 1.10614 0.479966C1.27412 0.159989 1.54268 0 1.91179 0H22.4166C22.7857 0 23.0543 0.159989 23.2223 0.479966C23.3903 0.802229 23.3588 1.11649 23.128 1.42276L13.6836 13.3333V22.6818C13.6836 23.0566 13.5579 23.3703 13.3065 23.6229C13.0551 23.8754 12.7408 24.0011 12.3637 24L12.0035 23.9983ZM12.1642 12.5134L20.6493 1.71416H3.67909L12.1642 12.5134Z" fill="#DE0000"></path>
                </g>
                <defs>
                  <clipPath id="clip0_11327_67370">
                    <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <div className='font-vietnam'>Kết quả:</div>
              <div className='font-vietnam font-bold'>{data.length} sản phẩm</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap mx-[-15px]'>

        {data ? (
          data.map((data, index) => (
            <div key={index} className='relative h-[275px] w-[25%] mb-[15px] px-[15px]'>
              <Link to={`/xe-may/${data.slug}`} className='relative block no-underline h-full p-[15px] text-[#000]'>
                <div className='relative z-[1]'>
                  <span className='text-[22px] font-vietnam font-extrabold leading-[30px]'>{data.tenXe}</span>
                </div>
                <div className='absolute top-1/2 left-1/2 w-[238px] translate-x-[-50%] translate-y-[-50%]'>
                  <img className='w-full' src={`${process.env.REACT_APP_API_BASE_URL.replace('/api/v1', '')}/uploads/${data.phienBan[0].mauSac[0].imgXe}`} alt=""></img>
                </div>
                <div className='absolute flex bottom-[15px] justify-center font-vietnam'>
                  Giá từ:<span className='font-bold'>&nbsp;{data.giaChiTu.toLocaleString('vi-VN')}&nbsp;</span>VNĐ
                </div>
              </Link>
            </div>
          ))
        ) : null}

      </div>
    </div>
  )
}

export default Motorcycles