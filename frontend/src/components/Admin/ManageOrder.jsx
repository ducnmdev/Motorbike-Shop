import React from 'react'

function ManageOrder() {
  return (
    <div className='w-full px-10'>
      <div className='flex justify-between w-full'>
        <button className='border-1 rounded m-3 p-2 w-full border-gray-400 text-gray-600'>Tất cả</button>
        <button className='border-1 rounded m-3 p-2 w-full border-yellow-500 text-yellow-500'>Chờ xử lý</button>
        <button className='border-1 rounded m-3 p-2 w-full border-orange-500 text-orange-500'>Chờ thanh toán</button>
        <button className='border-1 rounded m-3 p-2 w-full border-blue-400 text-blue-400'>Đang giao</button>
        <button className='border-1 rounded m-3 p-2 w-full border-green-500 text-green-500'>Đã giao</button>
        <button className='border-1 rounded m-3 p-2 w-full border-red-500 text-red-500'>Đã hủy</button>
      </div>
    </div>
  )
}

export default ManageOrder