import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function MotorcycleOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/order/my-orders', {
          withCredentials: true,
        });
        setOrders(res.data);
        // console.log(res.data)
      } catch (err) {
        console.error('Lỗi lấy đơn hàng:', err);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Chờ thanh toán':
        return 'border-orange-500 text-orange-500';
      case 'Chờ xử lý':
        return 'border-yellow-500 text-yellow-500';
      case 'Đang giao':
        return 'border-blue-400 text-blue-400';
      case 'Đã giao':
        return 'border-green-500 text-green-500';
      case 'Đã hủy':
        return 'border-red-500 text-red-500';
      default:
        return;
    }
  };

  if (!orders) {
    return null
  }

  return (
    <div className='flex-1 p-8 pl-14 font-vietnam'>
      <h1 className="text-2xl text-red-600 font-bold mb-6 uppercase border-b pb-3">Đơn mua xe của tôi</h1>
      {orders.length !== 0 ? (orders.map((order, index) => (
        <div key={index} className='border-b py-3'>
          <div className='flex justify-between'>
            <h6 className='font-semibold'>Mã đơn hàng: #{order._id}</h6>
            <p
              className={`${getStatusStyles(order.trangThai)} rounded-3xl py-[1px] px-[12px] border-2 text-xs font-semibold`}
            >
              {order.trangThai}
            </p>
          </div>
          <div className='flex'>
            <div className="w-56">
              <img className='w-full' src={`http://localhost:5000/uploads/${order.imgXe}`} alt="" />
            </div>
            <div className="pl-6 w-full">
              <p className='font-semibold uppercase'>{order.tenSanPham}</p>
              <p>Phiên bản: <span className='font-semibold'>{order.phienBan}</span></p>
              <p>Màu sắc: <span className='font-semibold'>{order.mauSac}</span></p>
              <div className='flex justify-between w-full'>
                <div></div>
                <p className='text-[#de0000]'>Tổng tiền: <span className='font-semibold'>{order.tongTien.toLocaleString('vi-VN')} đ</span></p>
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <h6>Phương thức thanh toán: <span className='font-semibold'>{order.thanhToan.hinhThuc}</span></h6>
            <Link to={`/account/orders/motorcycle/${order._id}`} className='no-underline'>
              Xem phi tiết
            </Link>
          </div>
        </div>
      ))) : (
        <h4 className='w-full h-full flex justify-center items-center text-center pb-12'>
          Hiện chưa có đơn hàng!
        </h4>
      )}
    </div>
  )
}

export default MotorcycleOrderList