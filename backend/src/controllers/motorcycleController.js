const Motorcycle = require('../models/Motorcycle')

class MotorcycleController {

    // [GET] /xe-may
    getAll(req, res, next) {
        const type = req.query.type;
        Motorcycle.find(type ? { kieuXe: type } : {})
            .then(motorcycles => {
                res.json(motorcycles);
            })
            .catch(error => {
                res.status(500).json({ message: 'Lỗi khi lấy dữ liệu xe máy', error });
            });
    }

    // [GET] /xe-may/:slug
    getBySlug(req, res, next) {
        const { slug } = req.params;
        Motorcycle.findOne({ slug: slug })
            .then(motorcycle => {
                // console.log(slug)
                if (!motorcycle) {
                    return res.status(404).json({ message: 'Motorcycle not found' });
                }
                res.status(200).json(motorcycle);
            })
            .catch(error => res.status(500).json({ message: error.message }));
    }

    // [POST] /xe-may/create
    create(req, res, next) {
        const { phienBan } = req.body;
        const phienBanParsed = JSON.parse(phienBan);

        // GIẢI THÍCH:
        // Khi append img thì sẽ nhảy vào req.files chứ k vào req.body như những cái khác
        // Vì vậy cần tạo biến, dùng toán tử 3 ngôi để gán .path
        // sau đó mới tạo xe và gán như dưới

        // Lấy đường dẫn cho banner
        const bannerPath = req.files['banner'] ? req.files['banner'][0].filename : null;
        const imgCongNghePath = req.files['imgCongNghe'] ? req.files['imgCongNghe'][0].filename : null;
        const imgThietKePath = req.files['imgThietKe'] ? req.files['imgThietKe'][0].filename : null;
        const imgDongCoPath = req.files['imgDongCo'] ? req.files['imgDongCo'][0].filename : null;
        const imgTienIchAnToanPath = req.files['imgTienIchAnToan'] ? req.files['imgTienIchAnToan'][0].filename : null;
        const imgTinhNangPath = req.files['imgTinhNang'] ? req.files['imgTinhNang'][0].filename : null;
        const libImgPaths = req.files['libImg'] ? req.files['libImg'].map(file => file.filename) : [];
        // console.log(bannerPath)
        // console.log(libImgPaths)

        // Map lại đường dẫn của imgXe vào đúng từng màu sắc trong phienBan
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

        const newMotorcycle = new Motorcycle({
            ...req.body,
            phienBan: phienBanParsed,
            banner: bannerPath,
            libImg: libImgPaths,
            imgCongNghe: imgCongNghePath,
            imgThietKe: imgThietKePath,
            imgDongCo: imgDongCoPath,
            imgTienIchAnToan: imgTienIchAnToanPath,
            imgTinhNang: imgTinhNangPath,
        });

        newMotorcycle.save()
            .then(savedMotorcycle => {
                res.status(201).json({
                    message: 'Motorcycle created successfully',
                    data: savedMotorcycle,
                });
            })
            .catch(error => {
                console.error('Error creating motorcycle:', error);
                res.status(500).json({
                    message: 'Error creating motorcycle',
                    error: error.message,
                });
            });
    }


}

module.exports = new MotorcycleController;