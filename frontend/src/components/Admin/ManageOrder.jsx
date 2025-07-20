import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ManageOrder() {

  const [data, setData] = useState('')
  const navigate = useNavigate()

  const fetchData = async (type) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/admin/orders?type=${type}`, {
        withCredentials: true
      })
      setData(res.data)
      // console.log(res.data)
    } catch (error) {
      console.log('Lỗi:', error);
    }
  }

  useEffect(() => {
    fetchData('');
  }, [])

  if (!data) return null;

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
      <div className='w-full m-3 border rounded'>
        <div className='grid grid-cols-6 p-3 font-bold border-b'>
          <div className='text-center'>TT</div>
          <div>Ngày tạo</div>
          <div>Trạng thái</div>
          <div>Khách hàng</div>
          <div>Tổng tiền</div>
          <div></div>
        </div>

        {data.map((data, index) => (
          <div key={index} className='grid grid-cols-6 p-3 border-b font-semibold'>
            <div className='text-center'>{index + 1}</div>
            <div className='break-words'>
              {new Date(data.createdAt).toLocaleString('vi-VN', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}</div>
            <div>{data.trangThai}</div>
            <div>{data.thongTinNguoiMua.hoTen}</div>
            <div>{data.tongTien.toLocaleString('vi-VN')} đ</div>
            <button onClick={() => navigate(`${data._id}`)}>
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#000000"></path> </g></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageOrder