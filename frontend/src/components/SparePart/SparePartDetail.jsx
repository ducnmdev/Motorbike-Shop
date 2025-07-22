import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'


function SparePartDetail({ getTenPhuTung }) {

    const { slug } = useParams();
    const [sparePart, setSparePart] = useState(null);

    useEffect(() => {
        const fetchSparePart = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/phu-tung/${slug}`);
                setSparePart(response.data);
                if (getTenPhuTung) {
                    getTenPhuTung(response.data.tenPhuTung)
                }
                return response.data;
            } catch (error) {
                console.error("Error fetching SparePart:", error);
                throw error;
            }
        };

        fetchSparePart()
            .then(data => {
                console.log("SparePart data:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!sparePart) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-[#de0000] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <>
            {sparePart ? (
                <div className='flex max-w-[1140px] h-screen mx-auto mt-[112px] overflow-hidden pb-32'>
                    <div className='w-[42%]'>
                        <p className='font-vietnam text-[22px] leading-[26px] font-extrabold not-italic tracking-normal text-[#393939]'>
                            {sparePart.tenPhuTung}
                        </p>
                        <p className='font-vietnam text-[20px] leading-[34px] font-normal not-italic tracking-normal text-[#393939]'>
                            Giá từ: <span className='font-bold text-[#de0000] inline'>
                                {sparePart.gia.toLocaleString('vi-VN')} VNĐ
                            </span>
                        </p>
                        <p className='font-vietnam text-[16px] leading-[26px] font-normal not-italic tracking-normal text-[#393939'>
                            {sparePart.chiTietPhuTung}
                        </p>

                        <div className='flex mt-[40px]'>
                            <div className='font-vietnam font-bold text-[#5f5f5f] text-[18px] leading-[26px]'>Số lượng:</div>
                            <span className='font-vietnam font-bold text-[#5f5f5f] text-[18px] leading-[26px]'>
                                &nbsp;{sparePart.soLuong}
                            </span>
                        </div>
                        <button className={`bg-[#de0000] mt-2 w-[280px] rounded-sm ${(sparePart.soLuong) === 0 ? 'bg-[#ffcccc]' : ''}`}
                            disabled={(sparePart.soLuong) === 0}>
                            <div className='font-vietnam text-white font-semibold p-[12px]'>
                                Đặt hàng
                            </div>
                        </button>
                    </div>
                    <div className='w-[55%]'>
                        <img
                            className='block'
                            src={`http://localhost:5000/uploads/${sparePart.imgPhuTung}`} alt="" />
                    </div>
                </div>
            ) : null}
        </>
    )

}

export default SparePartDetail
