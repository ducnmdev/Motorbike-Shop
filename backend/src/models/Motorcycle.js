const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug);

const MotorcycleSchema = new Schema({
    banner: { type: String },
    giaChiTu: { type: Number, required: true },
    tenXe: { type: String, required: true },
    kieuXe: { type: String, required: true },
    tenTinhNang: { type: String },
    imgTinhNang: { type: String },
    noiDungTN: { type: String },

    phienBan: [
        {
            tenPhienBan: { type: String, required: true },
            mauSac: [
                {
                    tenMau: { type: String, required: true },
                    hex: [
                        {
                            type: String, required: true
                        }
                    ],
                    imgXe: { type: String, required: true },
                    gia: { type: Number, required: true },
                    soLuong: { type: Number, required: true },
                }
            ],
        }
    ],

    thietKe: { type: String },
    imgThietKe: { type: String },
    dongCo: { type: String },
    imgDongCo: { type: String },
    congNghe: { type: String },
    imgCongNghe: { type: String },
    tienIchAnToan: { type: String },
    imgTienIchAnToan: { type: String },

    khoiLuongBanThan: { type: String },
    daiRongCao: { type: String },
    khoangCachTrucBanhXe: { type: String },
    doCaoYen: { type: String },
    khoangSangGamXe: { type: String },
    dungTichBinhXang: { type: String },
    kichCoLopTruocSau: { type: String },
    phuocTruoc: { type: String },
    phuocSau: { type: String },
    loaiDongCo: { type: String },
    congXuatToiDa: { type: String },
    dungTichNhotMay: { type: String },
    mucTieuThuNhienLieu: { type: String },
    hopSo: { type: String },
    heThongKhoiDong: { type: String },
    momentCucDai: { type: String },
    dungTichXyLanh: { type: String },
    duongKinhxHanhTrinhPitTong: { type: String },
    tySoNen: { type: String },

    libImg: [{ type: String }],

    slug: { type: String, slug: 'tenXe', unique: true },
});

const Motorcycle = mongoose.model('Motorcycle', MotorcycleSchema);
module.exports = Motorcycle;