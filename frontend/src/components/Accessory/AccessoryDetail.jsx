import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'


function AccessoryDetail() {
    const { slug } = useParams();
    const [accessory, setAccessory] = useState(null);

    useEffect(() => {
        const fetchAccessory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/phu-kien/${slug}`);
                setAccessory(response.data);
                return response.data;
            } catch (error) {
                console.error("Error fetching Accessory:", error);
                throw error;
            }
        };

        fetchAccessory()
            .then(data => {
                console.log("Accessory data:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {accessory ? (
                <div className='flex max-w-[1140px] h-screen mx-auto mt-[112px] overflow-hidden pb-32'>
                    <div className='w-[42%]'>
                        <p className='font-vietnam text-[22px] leading-[26px] font-extrabold not-italic tracking-normal text-[#393939]'>
                            {accessory.tenPhuKien}
                        </p>
                        <p className='font-vietnam text-[20px] leading-[34px] font-normal not-italic tracking-normal text-[#393939]'>
                            Giá từ: <span className='font-bold text-[#de0000] inline'>
                                {accessory.gia.toLocaleString('vi-VN')} VNĐ
                            </span>
                        </p>

                        <p className='font-vietnam text-[14px] font-normal leading-[24px] mb-[5px]'>
                            <span className='font-bold text-[#39393A]'>Tính năng: </span>
                            {accessory.tinhNang}
                        </p>

                        <p className='font-vietnam text-[14px] font-normal leading-[24px] mb-[5px]'>
                            <span className='font-bold text-[#39393A]'>Sản xuất bởi: </span>
                            {accessory.sanXuatBoi}
                        </p>

                        <div className='flex mt-[40px]'>
                            <div className='font-vietnam font-bold text-[#5f5f5f] text-[18px] leading-[26px]'>Số lượng:</div>
                            <span className='font-vietnam font-bold text-[#5f5f5f] text-[18px] leading-[26px]'>
                                &nbsp;{accessory.soLuong}
                            </span>
                        </div>
                        <button className={`bg-[#de0000] mt-2 w-[280px] rounded-sm ${(accessory.soLuong) === 0 ? 'bg-[#ffcccc]' : ''}`}
                            disabled={(accessory.soLuong) === 0}>
                            <div className='font-vietnam text-white font-semibold p-[12px]'>
                                Đặt hàng
                            </div>
                        </button>
                    </div>
                    <div className='w-[55%] flex justify-center'>
                        <img
                            className='block h-[50%]'
                            src={`http://localhost:5000/uploads/${accessory.imgPhuKien}`} alt="" />
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default AccessoryDetail
