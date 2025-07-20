const Motorcycle = require('../models/Motorcycle')
const Accessory = require('../models/Accessory')
const Sparepart = require('../models/Sparepart')
const Order = require('../models/Order')
const User = require('../models/User')

class AdminController {

    // [GET] /admin/products
    async getProducts(req, res, next) {
        const type = req.query.type;

        try {
            let items = [];
            switch (type) {
                case 'xe-may':
                    items = await Motorcycle.find({})
                    break;
                case 'phu-kien':
                    items = await Accessory.find({})
                    break;
                case 'phu-tung':
                    items = await Sparepart.find({})
                    break;
                default:
                    return res.status(400).json({ message: 'Loại không hợp lệ' });
            }
            res.json(items)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi lấy danh sách' });
        }
    }

    // [DELETE] /admin/delete-product
    async deleteProduct(req, res) {
        const { id } = req.params;
        const { type } = req.query;

        try {
            let model;

            switch (type) {
                case 'xe-may':
                    model = Motorcycle;
                    break;
                case 'phu-tung':
                    model = Sparepart;
                    break;
                case 'phu-kien':
                    model = Accessory;
                    break;
                default:
                    return res.status(400).json({ message: 'Loại sản phẩm không hợp lệ' });
            }

            const deleted = await model.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

            res.status(200).json({ message: 'Xóa thành công' });
        } catch (err) {
            console.error('Lỗi xóa:', err);
            res.status(500).json({ message: 'Xóa thất bại' });
        }
    }

    // [GET] /admin/dashboard
    async getDashboard(req, res, next) {
        try {
            const [totalOrders, totalRevenueAgg, totalCustomers, totalMotor, totalAcc, totalSP, totalSold, totalProcessing, totalCanceled] = await Promise.all([
                Order.countDocuments(),
                Order.aggregate([
                    { $group: { _id: null, total: { $sum: "$tongTien" } } }
                ]),
                User.countDocuments({ role: 'user' }),
                Motorcycle.countDocuments(),
                Accessory.countDocuments(),
                Sparepart.countDocuments(),
                Order.countDocuments({ trangThai: 'Đã giao' }),
                Order.countDocuments({ trangThai: { $in: ['Chờ thanh toán', 'Chờ xử lý', 'Đang giao'] } }),
                Order.countDocuments({ trangThai: 'Đã hủy' })
            ]);

            const totalRevenue = totalRevenueAgg[0]?.total || 0;
            const totalProducts = totalMotor + totalAcc + totalSP;

            res.json({
                totalRevenue,
                totalCustomers,
                totalOrders,
                totalProducts,
                totalSold,
                totalProcessing,
                totalCanceled
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi lấy dữ liệu dashboard' });
        }
    }

    // [GET] /admin/orders
    getOrders(req, res, next) {
        const type = req.query.type
        Order.find(type ? { trangThai: type } : {})
            .then(order => {
                res.status(200).json(order)
            })
            .catch(error => res.status(500).json({ message: error.message }));
    }

    // [GET] /admin/order-detail
    getOrderDetail(req, res) {
        const { id } = req.params
        Order.findById(id)
            .then(order => {
                res.status(200).json(order)
            })
            .catch(error => res.status(500).json({ message: error.message }));
    }

    // [PATCH] /admin/update-accessory
    updateAccessory = async (req, res) => {
        try {
            const { id } = req.params;
            const {
                tenPhuKien,
                tinhNang,
                gia,
                soLuong,
                sanXuatBoi
            } = req.body;

            const updateFields = {
                tenPhuKien,
                tinhNang,
                gia,
                soLuong,
                sanXuatBoi
            };

            // Nếu có file mới -> cập nhật ảnh, đồng thời xóa ảnh cũ
            const imgPhuKienPath = req.files['imgPhuKien'] ? req.files['imgPhuKien'][0].filename : null;
            if (imgPhuKienPath) {
                updateFields.imgPhuKien = imgPhuKienPath;
            }

            const updated = await Accessory.findByIdAndUpdate(id, updateFields, { new: true });

            res.status(200).json({
                success: true,
                data: updated
            });
        } catch (err) {
            console.error('Error updating accessory:', err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    };

    // [PATCH] /admin/update-sparepart
    updateSparepart = async (req, res) => {
        try {
            const { id } = req.params;
            const {
                tenPhuTung,
                gia,
                soLuong,
                chiTietPhuTung
            } = req.body;

            const updateFields = {
                tenPhuTung,
                gia,
                soLuong,
                chiTietPhuTung
            };

            // Nếu có file mới -> cập nhật ảnh, đồng thời xóa ảnh cũ
            const imgPhuTungPath = req.files['imgPhuTung'] ? req.files['imgPhuTung'][0].filename : null;
            if (imgPhuTungPath) {
                updateFields.imgPhuTung = imgPhuTungPath;
            }

            const updated = await Sparepart.findByIdAndUpdate(id, updateFields, { new: true });

            res.status(200).json({
                success: true,
                data: updated
            });
        } catch (err) {
            console.error('Error updating Sparepart:', err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    };

    // [PATCH] /admin/update-motorcycle
    updateMotorcycle = async (req, res) => {
        try {
            const { id } = req.params;
            const { phienBan } = req.body;
            const phienBanParsed = JSON.parse(phienBan);
            const {
                kieuXe,
                tenXe,
                giaChiTu,
                tenTinhNang,
                noiDungTN,
                thietKe,
                dongCo,
                congNghe,
                tienIchAnToan,
                khoiLuongBanThan,
                daiRongCao,
                khoangCachTrucBanhXe,
                doCaoYen,
                khoangSangGamXe,
                dungTichBinhXang,
                kichCoLopTruocSau,
                phuocTruoc,
                phuocSau,
                loaiDongCo,
                congXuatToiDa,
                dungTichNhotMay,
                mucTieuThuNhienLieu,
                hopSo,
                heThongKhoiDong,
                momentCucDai,
                dungTichXyLanh,
                duongKinhxHanhTrinhPitTong,
                tySoNen,
            } = req.body;

            let imgXeIndex = 0;
            phienBanParsed.forEach(pb => {
                pb.mauSac.forEach(mau => {
                    // Kiểm tra nếu còn ảnh trong imgXe files
                    if (req.files['imgXe'] && req.files['imgXe'][imgXeIndex]) {
                        mau.imgXe = req.files['imgXe'][imgXeIndex].filename;
                        imgXeIndex++;
                    }
                });
            });

            const updateFields = {
                phienBan: phienBanParsed,
                kieuXe,
                tenXe,
                giaChiTu,
                tenTinhNang,
                noiDungTN,
                thietKe,
                dongCo,
                congNghe,
                tienIchAnToan,
                khoiLuongBanThan,
                daiRongCao,
                khoangCachTrucBanhXe,
                doCaoYen,
                khoangSangGamXe,
                dungTichBinhXang,
                kichCoLopTruocSau,
                phuocTruoc,
                phuocSau,
                loaiDongCo,
                congXuatToiDa,
                dungTichNhotMay,
                mucTieuThuNhienLieu,
                hopSo,
                heThongKhoiDong,
                momentCucDai,
                dungTichXyLanh,
                duongKinhxHanhTrinhPitTong,
                tySoNen,
            };

            // Nếu có file mới -> cập nhật ảnh, đồng thời xóa ảnh cũ
            const bannerPath = req.files['banner'] ? req.files['banner'][0].filename : null;
            const imgCongNghePath = req.files['imgCongNghe'] ? req.files['imgCongNghe'][0].filename : null;
            const imgThietKePath = req.files['imgThietKe'] ? req.files['imgThietKe'][0].filename : null;
            const imgDongCoPath = req.files['imgDongCo'] ? req.files['imgDongCo'][0].filename : null;
            const imgTienIchAnToanPath = req.files['imgTienIchAnToan'] ? req.files['imgTienIchAnToan'][0].filename : null;
            const imgTinhNangPath = req.files['imgTinhNang'] ? req.files['imgTinhNang'][0].filename : null;
            const libImgPaths = req.files['libImg'] ? req.files['libImg'].map(file => file.filename) : [];

            if (bannerPath) {
                updateFields.banner = bannerPath;
            }
            if (imgCongNghePath) {
                updateFields.imgCongNghe = imgCongNghePath;
            }
            if (imgThietKePath) {
                updateFields.imgThietKe = imgThietKePath;
            }
            if (imgDongCoPath) {
                updateFields.imgDongCo = imgDongCoPath;
            }
            if (imgTienIchAnToanPath) {
                updateFields.imgTienIchAnToan = imgTienIchAnToanPath;
            }
            if (imgTinhNangPath) {
                updateFields.imgTinhNang = imgTinhNangPath;
            }
            if (libImgPaths) {
                updateFields.libImg = libImgPaths;
            }

            const updated = await Motorcycle.findByIdAndUpdate(id, updateFields, { new: true });

            res.status(200).json({
                success: true,
                data: updated
            });
        } catch (err) {
            console.error('Error updating Sparepart:', err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

module.exports = new AdminController;
