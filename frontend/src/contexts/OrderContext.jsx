import { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState({
        userId: "",
        productId: "",
        productType: "Motorcycle",
        tenSanPham: "",
        phienBan: "",
        mauSac: "",
        soLuong: 0,
        imgXe: "",
        tongTien: 0,
        thongTinNguoiMua: {
            hoTen: "",
            soDienThoai: "",
            diaChi: ""
        },
        thanhToan: {
            hinhThuc: "cod",
            daThanhToan: false
        },
        trangThai: "cho-xu-ly",
    });

    // Lấy dữ liệu từ localStorage nếu có
    useEffect(() => {
        const savedOrder = localStorage.getItem('order');
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
    }, []);

    // Cập nhật localStorage mỗi khi order thay đổi
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order));
    }, [order]);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
