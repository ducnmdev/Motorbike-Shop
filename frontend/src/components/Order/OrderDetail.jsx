import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState()

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/order/motorcycle/${id}`);
                console.log(response.data);
                setOrder(response.data)
            } catch (error) {
                console.error("Error fetching Order:", error);
                throw error;
            }
        };

        fetchOrder()
    }, [id])

    const handleDownloadInvoice = () => {
        window.open(`http://localhost:5000/api/v1/order/${order._id}/invoice`, "_blank");
    };

    if (!order) return;

    return (
        <div className='p-8 pl-14 w-full'>
            <div className='w-full border-b text-base [&_*]:m-[2px]'>
                <h1 className="text-2xl text-red-600 font-bold mb-6 uppercase border-b pb-3">Chi tiết đơn hàng</h1>
                <div className='flex justify-between pt-3'>
                    <p className='font-semibold'> Ngày tạo</p>
                    <p className='font-semibold'>Người nhận</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>{new Date(order.createdAt).toLocaleString('vi-VN', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })}</p>
                    <p>{order.thongTinNguoiMua.hoTen}</p>
                </div>
                <div className='flex justify-between w-full'>
                    <div></div>
                    <p>{order.thongTinNguoiMua.soDienThoai}</p>
                </div>
                <div className='flex justify-between w-full pb-3'>
                    <div></div>
                    <p>{order.thongTinNguoiMua.diaChi}</p>
                </div>
            </div>

            <div className="border rounded-md mt-6 text-center">
                <div className="grid grid-cols-5 bg-gray-100 font-semibold text-sm text-gray-700 px-4 py-2 border-b">
                    <div className="col-span-2">Sản phẩm</div>
                    <div>Giá tiền</div>
                    <div>Số lượng</div>
                    <div>Thành tiền</div>
                </div>

                <div className="grid grid-cols-5 items-center px-4 py-3 border-b">
                    <div className="col-span-2 flex items-center gap-4">
                        <img
                            src={`http://localhost:5000/uploads/${order.imgXe}`}
                            alt="Ảnh xe"
                            className="w-36 object-cover rounded"
                        />
                        <span className="font-medium">{order.tenSanPham}</span>
                    </div>
                    <div className="text-sm text-gray-800">{order.tongTien.toLocaleString('vi-VN')} ₫</div>
                    <div className="text-sm text-gray-800">1</div>
                    <div className="text-sm text-gray-800">{order.tongTien.toLocaleString('vi-VN')} ₫</div>
                </div>

                {[
                    "Phí xử lý",
                    "Phí hỗ trợ đăng ký xe",
                    "Lệ phí trước bạ",
                    "Lệ phí đăng ký biển số",
                ].map((fee, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-5 items-center px-4 py-3 text-sm border-b !text-left"
                    >
                        <div className="col-span-2">{fee}</div>
                        <div></div>
                        <div></div>
                        <div className="text-gray-800 !text-center">0 ₫</div>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-3 font-semibold pt-4 border-t mt-4'>
                <p>Phương thức thanh toán</p>
                <p className='text-center'>Phí vận chuyển</p>
                <p className='text-right'>Tổng tiền</p>
            </div>

            <div className='grid grid-cols-3 font-bold'>
                <p>{order.thanhToan.hinhThuc}</p>
                <p className='text-center'>0 đ</p>
                <p className='text-right text-2xl text-[#de0000]'>{order.tongTien.toLocaleString('vi-VN')} đ</p>
            </div>

            <div className="flex justify-end gap-3 px-4 pb-4">
                {((order.thanhToan.hinhThuc === 'Chuyển khoản ngân hàng') && (order.trangThai === "Chờ thanh toán"))
                    && (
                        <button className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                            Thanh toán ngay
                        </button>
                    )}
                <button onClick={handleDownloadInvoice} className="bg-red-600 text-white px-6 py-2 mr-12 hover:bg-red-700">
                    Xem hóa đơn
                </button>
            </div>
        </div >

    )
}

export default OrderDetail