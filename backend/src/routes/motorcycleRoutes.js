const express = require('express');
const router = express.Router();
const MotorcycleController = require('../controllers/motorcycleController');
const { upload } = require('../middlewares/multer')

router.post('/create', upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'imgXe', maxCount: 20 },
    { name: 'libImg', maxCount: 20 },
    { name: 'imgThietKe', maxCount: 1 },
    { name: 'imgDongCo', maxCount: 1 },
    { name: 'imgTienIchAnToan', maxCount: 1 },
    { name: 'imgCongNghe', maxCount: 1 },
    { name: 'imgTinhNang', maxCount: 1 },
]),
    MotorcycleController.create);

router.get('/:slug', MotorcycleController.getBySlug)

router.get('/', MotorcycleController.getAll)


module.exports = router;