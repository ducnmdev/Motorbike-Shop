import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const [timeLeft, setTimeLeft] = useState(360); // default
    const limit = 360 * 1000; // 6 phút in ms

    useEffect(() => {
        if (!data) {
            navigate('/');
            return;
        }

        // Nếu hết hạn thì không được vào nữa
        if (sessionStorage.getItem('payment_expired') === 'true') {
            navigate('/');
            return;
        }

        const limit = 360 * 1000;
        let startTime = sessionStorage.getItem('payment_start_time');
        const now = Date.now();

        if (!startTime) {
            startTime = now;
            sessionStorage.setItem('payment_start_time', startTime);
        }

        const elapsed = now - startTime;
        const remaining = Math.max(0, Math.floor((limit - elapsed) / 1000));
        setTimeLeft(remaining);

        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;
            const remaining = Math.max(0, Math.floor((limit - elapsed) / 1000));
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(timer);
                sessionStorage.setItem('payment_expired', 'true'); // lưu cờ hết hạn
                sessionStorage.removeItem('payment_start_time');
                navigate('/');
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [data, navigate, limit]);

    if (!data) return null;
    const { amount, transferContent } = data;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="min-h-screen overflow-hidden m-auto pt-36 pb-20 w-2/3 [&_*]:m-0">
            <h2 className='font-bold text-[#de0000] pb-4'>
                Thanh toán
            </h2>
            <div className='border rounded'>
                <p className='border-b font-bold p-3'>Thanh toán bằng chuyển khoản</p>
                <p className='border-b font-bold py-2 px-3'>Tổng tiền: {amount.toLocaleString('vi-VN')} đ <span className='pl-6'>00:{formatTime(timeLeft)}</span></p>
                <div className='flex py-2 px-24'>
                    <img className='h-[450px]'
                        src={`https://img.vietqr.io/image/mbbank-2331252003-compact2.jpg?amount=${amount}&addInfo=${transferContent}&accountName=NGUYEN MINH DUC`}
                        alt='QR' />
                    <div className='my-auto space-y-2'>
                        <p className='font-bold py-1'>Thực hiện theo hướng dẫn sau để thanh toán:</p>
                        <p><span className='font-bold'>Bước 1:</span> Mở ứng dụng <span className='font-bold'>Mobile Banking</span> của ngân hàng</p>
                        <p><span className='font-bold'>Bước 2:</span> Chọn <span className='font-bold'>"Thanh toán"</span> và quét mã QR tại hướng dẫn này</p>
                        <p><span className='font-bold'>Bước 3:</span> Nhập số tiền cần chuyển là <span className='font-bold text-blue-500'>{amount.toLocaleString('vi-VN')} đ </span>
                            và nội dung chuyển khoản tiền <span className='font-bold text-blue-500'>{transferContent}</span></p>
                        <p>Ngân hàng: <span className='font-semibold italic'>MB</span></p>
                        <p>Tên: <span className='font-semibold italic'>NGUYEN MINH DUC</span></p>
                        <p>Số tài khoản: <span className='font-semibold italic'>2331252003</span></p>
                        <p>Chi nhánh: <span className='font-semibold italic'>Xuân Diệu</span></p>
                        <p><span className='font-bold'>Bước 4:</span> Hoàn thành các bước thanh toán theo hướng dẫn và đợi KUZN xử lý trong giây lát</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
