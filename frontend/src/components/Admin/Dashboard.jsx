import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
    const [data, setData] = useState();
    const today = new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/v1/admin/dashboard', {
                    withCredentials: true,
                });
                setData(res.data)
            } catch (error) {
                console.error('Lỗi:', error);
            }
        }

        fetchData();
    }, [])

    if (!data) return null;

    return (
        <div className='w-full flex ml-24'>
            <div className='ml-5 w-1/4 mt-10 font-vietnam'>
                <div className='bg-gradient-to-r from-[#cb5387] to-[#eb607b] border rounded-xl h-60 text-white'>
                    <div className='p-3 text-lg font-semibold'>Tổng doanh thu:</div>
                    <div className='px-3 pt-10'>
                        <div className='opacity-55 text-sm'>{today}</div>
                        <div className='text-3xl font-bold'>{data.totalRevenue.toLocaleString('vi-VN')} <span className='text-2xl'>đ</span></div>
                    </div>
                </div>
            </div>
            <div className='ml-5 w-1/4 mt-10 font-vietnam'>
                <div className='bg-gradient-to-r from-[#ba93d9] to-[#94a3d7] border rounded-xl h-60 text-white'>
                    <div className='p-3 text-lg font-semibold'>Tổng số đơn hàng:</div>
                    <div className='p-3 text-3xl font-bold'>{data.totalOrders}</div>
                    <div className='p-3 flex justify-between items-center text-center mt-10 border-t border-t-[#dfc3f7] font-semibold'>
                        <div>
                            <div>Đã bán</div>
                            <div>{data.totalSold}</div>
                        </div>
                        <div>
                            <div>Đang xử lý</div>
                            <div>{data.totalProcessing}</div>
                        </div>
                        <div>
                            <div>Đã hủy</div>
                            <div>{data.totalCanceled}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ml-5 w-1/6 mt-10 font-vietnam'>
                <div className='bg-gradient-to-r from-[#2496ad] to-[#67cee7] border rounded-xl h-28 text-white mb-3'>
                    <div className='px-3 pt-3 pb-2 text-lg font-semibold'>Tổng số sản phẩm:</div>
                    <div className='pl-5 text-2xl font-bold'>{data.totalProducts}</div>
                </div>
                <div className='bg-gradient-to-r from-[#e97568] to-[#f2947d] border rounded-xl h-28 text-white'>
                    <div className='px-3 pt-3 pb-2 text-lg font-semibold'>Tổng số khách hàng:</div>
                    <div className='pl-5 text-2xl font-bold'>{data.totalCustomers}</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard