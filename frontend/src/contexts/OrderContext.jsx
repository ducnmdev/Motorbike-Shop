import { createContext, useState } from 'react';

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
        diaChiGiaoHang: ""
    });

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
