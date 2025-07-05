const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productType: {
        type: String,
        enum: ['Accessory-Sparepart', 'Motorcycle'],
        required: true
    },
    tenSanPham: { type: String, required: true },
    phienBan: { type: String, required: true },
    mauSac: { type: String, required: true },
    soLuong: { type: Number, default: 1 },
    gia: { type: Number, required: true },
    imgXe: { type: String },

    tongTien: { type: Number, required: true },

    thongTinNguoiMua: {
        hoTen: String,
        soDienThoai: String,
        diaChi: String
    },

    thanhToan: {
        hinhThuc: { type: String, enum: ['cod', 'chuyen-khoan'], default: 'cod' },
        daThanhToan: { type: Boolean, default: false }
    },

    trangThai: {
        type: String,
        enum: ['cho-xu-ly', 'dang-giao', 'da-giao', 'da-huy'],
        default: 'cho-xu-ly'
    },

    diaChiGiaoHang: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
