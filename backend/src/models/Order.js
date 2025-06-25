const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true },
            productType: {
                type: String,
                enum: ['Motorcycle', 'Accessory', 'Sparepart'],
                required: true
            },
            tenSanPham: { type: String, required: true },
            soLuong: { type: Number, required: true },
            gia: { type: Number, required: true },
            imgXe: { type: String }, 
        }
    ],

    tongTien: { type: Number, required: true },

    trangThai: {
        type: String,
        enum: ['cho-xu-ly', 'dang-giao', 'da-giao', 'da-huy'],
        default: 'cho-xu-ly'
    },

    diaChiGiaoHang: { type: String, required: true },

}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
