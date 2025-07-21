import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function OrderDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null)
    const [trangThai, setTrangThai] = useState();
    const allowedStatuses = {
        "Chờ thanh toán": ["Chờ xử lý", "Đang giao", "Đã giao", "Đã hủy"],
        "Chờ xử lý": ["Đang giao", "Đã giao", "Đã hủy"],
        "Đang giao": ["Đã giao", "Đã hủy"],
        "Đã giao": [],
        "Đã hủy": []
    };

    const currentStatus = order?.trangThai;
    const nextStatuses = allowedStatuses[currentStatus] || [];

    // console.log(order)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/admin/order-detail/${id}`, {
                    withCredentials: true
                });
                setOrder(res.data);
                setTrangThai(res.data.trangThai)
                // console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrder();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/admin/update-order-status/${id}`,
                { trangThai },
                { withCredentials: true }
            );
            alert('Cập nhật trạng thái thành công!');
            setOrder(res.data);
        } catch (err) {
            console.error(err);
            alert('Cập nhật thất bại!');
        }
    };

    if (!order) return null;

    return (
        <div className='w-full font-vietnam px-12 pt-2 [&_*]:m-0'>
            <button onClick={() => navigate(-1)}>
                <div className='flex my-2'>
                    <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path> </g></svg>
                    <p>Quay lại</p>
                </div>
            </button>
            <h3 className='font-bold'>Order Detail</h3>
            <div className='border-1 rounded-2xl mt-4 pt-2 px-6 h-3/4'>
                <div className='mb-4'>
                    <p className='font-semibold text-sm m-0 mt-2'>Order ID: #{order._id}</p>
                    <div className='text-sm'>
                        {new Date(order.createdAt).toLocaleString('vi-VN', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}
                    </div>
                </div>
                <div className='flex space-x-36'>
                    <div>
                        <p className='text-lg font-semibold'>Khách hàng</p>
                        <p><span className='text-gray-500'>Tên:</span> {order.thongTinNguoiMua.hoTen}</p>
                        <p><span className='text-gray-500'>Số điện thoại:</span> {order.thongTinNguoiMua.soDienThoai}</p>
                        <p><span className='text-gray-500'>Địa chỉ:</span> {order.thongTinNguoiMua.diaChi}</p>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Thông tin đơn hàng</p>
                        <p><span className='text-gray-500'>Hình thức:</span> {order.thanhToan.hinhThuc}</p>
                        <p><span className='text-gray-500'>Trạng thái:</span> {order.trangThai}</p>
                    </div>
                </div>

                <div className='border-1 rounded-xl my-5 p-4'>
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
                </div>

                <div className='pl-6'>
                    <p className='text-lg font-semibold'>Trạng thái đơn hàng:</p>
                    <select
                        value={trangThai}
                        onChange={(e) => setTrangThai(e.target.value)}
                        disabled={nextStatuses.length === 0}
                        className='border-1 rounded-md px-1 py-2 mt-3 w-[200px]'
                    >
                        <option value={currentStatus}>{currentStatus}</option>
                        {nextStatuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

                    <br />
                    <button onClick={handleSubmit} className='border-1 rounded-md p-2 px-4 mt-4 bg-[#de0000] text-white'>
                        Cập nhật
                    </button>
                </div>
            </div>
        </div >
    )
}

export default OrderDetail