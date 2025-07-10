const Order = require('../models/Order')

class OrderController {

    // [POST] /checkout
    addNewOrder(req, res, next) {
        const order = req.body
        const newOrder = new Order({
            userId: order.userId,
            productId: order.productId,
            productType: order.productType,
            tenSanPham: order.tenSanPham,
            phienBan: order.phienBan,
            mauSac: order.mauSac,
            soLuong: order.soLuong,
            gia: order.tongTien,
            imgXe: order.imgXe,
            tongTien: order.tongTien,
            thongTinNguoiMua: {
                hoTen: order.thongTinNguoiMua.hoTen,
                soDienThoai: order.thongTinNguoiMua.soDienThoai,
                diaChi: order.thongTinNguoiMua.diaChi
            },
            thanhToan: {
                hinhThuc: order.thanhToan.hinhThuc,
                daThanhtoan: order.thanhToan.daThanhtoan
            },
            trangThai: order.trangThai
        })

        newOrder.save()
            .then(() => res.status(201).json({ message: 'Đặt hàng thành công!' }))
            .catch(err => {
                console.error('Lỗi khi lưu đơn hàng:', err);
                res.status(500).json({ error: 'Đặt hàng thất bại!' });
            });
    };

    // [GET] /my-orders
    async getUserOrder(req, res, next) {
        try {
            const userId = req.user.id;
            const orders = await Order.find({ userId }).sort({ createdAt: -1 });
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err.message });
        }
    }

}

module.exports = new OrderController;