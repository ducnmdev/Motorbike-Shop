const Sparepart = require('../models/Sparepart')

class SparepartController {

    // [GET] /phu-tung
    getAll(req, res, next) {
        Sparepart.find({})
            .then(sparepart => {
                res.json(sparepart);
            })
            .catch(error => {
                res.status(500).json({ message: 'Lỗi khi lấy dữ liệu phụ tùng', error });
            });
    }

    // [GET] /phu-tung/:slug
    getBySlug(req, res, next) {
        const { slug } = req.params;
        Sparepart.findOne({ slug: slug })
            .then(sparepart => {
                if (!sparepart) {
                    return res.status(404).json({ message: 'sparepart not found' });
                }
                res.status(200).json(sparepart);
            })
            .catch(error => res.status(500).json({ message: error.message }));
    }

    // [POST] /phu-tung/create
    create(req, res, next) {
        const imgPhuTungPath = req.files['imgPhuTung'] ? req.files['imgPhuTung'][0].filename : null;

        const newSparepart = new Sparepart({
            ...req.body,
            imgPhuTung: imgPhuTungPath,
        });

        newSparepart.save()
            .then(savedSparepart => {
                res.status(201).json({
                    message: 'Sparepart created successfully',
                    data: savedSparepart,
                });
            })
            .catch(error => {
                console.error('Error creating Sparepart:', error);
                res.status(500).json({
                    message: 'Error creating Sparepart',
                    error: error.message,
                });
            });
    }
}

module.exports = new SparepartController;
