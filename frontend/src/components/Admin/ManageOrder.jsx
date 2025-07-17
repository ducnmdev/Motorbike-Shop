import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function ManageOrder() {

  const [data, setData] = useState('')

  const fetchData = async (type) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/admin/orders?type=${type}`, {
        withCredentials: true
      })
      setData(res.data)
      console.log(res.data)
    } catch (error) {
      console.log('Lỗi:', error);
    }
  }

  useEffect(() => {
    fetchData('');
  }, [])

  return (
    <div className='w-full px-10'>
      <div className='flex justify-between w-full'>
        <button onClick={() => fetchData('')} className='border-1 rounded m-3 p-2 w-full border-gray-400 text-gray-600'>Tất cả</button>
        <button onClick={() => fetchData('Chờ xử lý')} className='border-1 rounded m-3 p-2 w-full border-yellow-500 text-yellow-500'>Chờ xử lý</button>
        <button onClick={() => fetchData('Chờ thanh toán')} className='border-1 rounded m-3 p-2 w-full border-orange-500 text-orange-500'>Chờ thanh toán</button>
        <button onClick={() => fetchData('Đang giao')} className='border-1 rounded m-3 p-2 w-full border-blue-400 text-blue-400'>Đang giao</button>
        <button onClick={() => fetchData('Đã giao')} className='border-1 rounded m-3 p-2 w-full border-green-500 text-green-500'>Đã giao</button>
        <button onClick={() => fetchData('Đã hủy')} className='border-1 rounded m-3 p-2 w-full border-red-500 text-red-500'>Đã hủy</button>
      </div>
    </div>
  )
}

export default ManageOrder