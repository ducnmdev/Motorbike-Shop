const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');
const { upload } = require('../middlewares/multer')

router.get('/products', verifyToken, AdminController.getProducts);
router.get('/dashboard', verifyToken, AdminController.getDashboard);
router.get('/orders', verifyToken, AdminController.getOrders);
router.get('/order-detail/:id', verifyToken, AdminController.getOrderDetail);
router.patch('/update-order-status/:id', verifyToken, AdminController.updateOrderStatus);
router.delete('/delete-product/:id', AdminController.deleteProduct);
router.patch('/update-accessory/:id',
    upload.fields([
        { name: 'imgPhuKien', maxCount: 1 },
    ]), AdminController.updateAccessory);
router.patch('/update-sparepart/:id',
    upload.fields([
        { name: 'imgPhuTung', maxCount: 1 },
    ]), AdminController.updateSparepart);
router.patch('/update-motorcycle/:id',
    upload.fields([
        { name: 'banner', maxCount: 1 },
        { name: 'imgXe', maxCount: 20 },
        { name: 'libImg', maxCount: 20 },
        { name: 'imgThietKe', maxCount: 1 },
        { name: 'imgDongCo', maxCount: 1 },
        { name: 'imgTienIchAnToan', maxCount: 1 },
        { name: 'imgCongNghe', maxCount: 1 },
        { name: 'imgTinhNang', maxCount: 1 },
    ]), AdminController.updateMotorcycle);


module.exports = router;