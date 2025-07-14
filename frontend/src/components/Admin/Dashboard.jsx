import React from 'react'

function Dashboard() {
    return (
        <div className='w-full flex ml-24'>
            <div className='ml-5 w-1/4 mt-10 font-vietnam'>
                <div className='bg-gradient-to-r from-[#cb5387] to-[#eb607b] border rounded-xl h-60 text-white'>
                    <div className='p-3 text-lg font-semibold'>Tổng doanh thu:</div>
                    <div className='px-3 pt-10'>
                        <div className='opacity-55 text-sm'>13/7/2025</div>
                        <div className='text-3xl font-bold'>7.312.927.428 đ</div>
                    </div>
                </div>
            </div>
            <div className='ml-5 w-1/4 mt-10 font-vietnam'>
                <div className='bg-gradient-to-r from-[#ba93d9] to-[#94a3d7] border rounded-xl h-60 text-white'>
                    <div className='p-3 text-lg font-semibold'>Tổng số đơn hàng:</div>
                    <div className='p-3 text-3xl font-bold'>30</div>
                    <div className='p-3 flex justify-between items-center text-center mt-10 border-t border-t-[#dfc3f7] font-semibold'>
                        <div>
                            <div>Đã bán</div>
                            <div>12</div>
                        </div>
                        <div>
                            <div>Đang xử lý</div>
                            <div>8</div>
                        </div>
                        <div>
                            <div>Đã hủy</div>
                            <div>2</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ml-5 w-1/6 mt-10 font-vietnam'>
                <div className='bg-gradient-to-r from-[#2496ad] to-[#67cee7] border rounded-xl h-28 text-white mb-3'>
                    <div className='px-3 pt-3 pb-2 text-lg font-semibold'>Tổng số sản phẩm:</div>
                    <div className='pl-5 text-2xl font-bold'>24</div>
                </div>
                <div className='bg-gradient-to-r from-[#e97568] to-[#f2947d] border rounded-xl h-28 text-white'>
                    <div className='px-3 pt-3 pb-2 text-lg font-semibold'>Tổng số khách hàng:</div>
                    <div className='pl-5 text-2xl font-bold'>5</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard