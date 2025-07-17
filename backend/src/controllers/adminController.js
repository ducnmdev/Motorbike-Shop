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
}

module.exports = new AdminController;
