const Motorcycle = require('../models/Motorcycle')
const Accessory = require('../models/Accessory')
const Sparepart = require('../models/Sparepart')

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
}

module.exports = new AdminController;
