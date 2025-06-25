import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

function SpareParts() {

    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpareParts = async () => {
            try {
                // console.log({ type })
                const response = await axios.get('http://localhost:5000/api/v1/phu-tung/');
                setData(response.data);
                return response.data;
            } catch (error) {
                console.error("Error fetching SpareParts:", error);
                throw error;
            }
        };

        fetchSpareParts()
            .then(data => {
                console.log("SpareParts data:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [])

    return (
        <div className='px-[20px] max-w-[1390px] mx-auto'>
            <div className='mb-[56px] mt-[40px]'>
                <div className='max-w-[1350px]'>
                    <div className='flex '>
                        <div className='font-vietnam text-[16px] mr-[20px] pb-[7x] leading-[26px] cursor-pointer'
                            onClick={() => navigate('/phu-kien')}>Phụ kiện</div>
                        <div className='font-vietnam text-[16px] mr-[20px] pb-[7x] leading-[26px] cursor-pointer text-[#de0000] font-bold border-b-[5px] border-[#de0000]'
                            onClick={() => navigate('/phu-tung')}>Phụ tùng</div>
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap mx-[-15px]'>

                {data ? (
                    data.map((data, index) => (
                        <div key={index} className='relative h-[275px] w-[25%] mb-[15px] px-[15px]'>
                            <Link to={`/phu-tung/${data.slug}`} className='relative block no-underline h-full p-[15px] text-[#000]'>
                                <div className='flex justify-center'>
                                    <img className='h-[200px]' src={`http://localhost:5000/uploads/${data.imgPhuTung}`} alt=""></img>
                                </div>
                                <div className='flex justify-center relative z-[1]'>
                                    <span className='text-[17px] text-neutral-700 flex justify-center font-vietnam font-semibold leading-[30px]'>{data.tenPhuTung}</span>
                                </div>
                                <div className='flex justify-center w-full font-vietnam'>
                                    <span className='text-[#de0000] text-[14px] font-bold justify-center'>&nbsp;{data.gia.toLocaleString('vi-VN')}&nbsp;VNĐ</span>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : null}

            </div>
        </div>
    )
}

export default SpareParts