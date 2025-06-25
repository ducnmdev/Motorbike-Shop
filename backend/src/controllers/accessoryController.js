const Accessory = require('../models/Accessory')

class AccessoryController {

    // [GET] /phu-kien
    getAll(req, res, next) {
        Accessory.find({})
            .then(accessories => {
                res.json(accessories);
            })
            .catch(error => {
                res.status(500).json({ message: 'Lỗi khi lấy dữ liệu phụ kiện', error });
            });
    }

    // [GET] /phu-kien/:slug
    getBySlug(req, res, next) {
        const { slug } = req.params;
        Accessory.findOne({ slug: slug })
            .then(accessory => {
                if (!accessory) {
                    return res.status(404).json({ message: 'accessory not found' });
                }
                res.status(200).json(accessory);
            })
            .catch(error => res.status(500).json({ message: error.message }));
    }

    // [POST] /phu-kien/create
    create(req, res, next) {
        const imgPhuKienPath = req.files['imgPhuKien'] ? req.files['imgPhuKien'][0].filename : null;

        const newAccessory = new Accessory({
            ...req.body,
            imgPhuKien: imgPhuKienPath,
        });

        newAccessory.save()
            .then(savedAccessory => {
                res.status(201).json({
                    message: 'Accessory created successfully',
                    data: savedAccessory,
                });
            })
            .catch(error => {
                console.error('Error creating Accessory:', error);
                res.status(500).json({
                    message: 'Error creating Accessory',
                    error: error.message,
                });
            });
    }
}

module.exports = new AccessoryController;