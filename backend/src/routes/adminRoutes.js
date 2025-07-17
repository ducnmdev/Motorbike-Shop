const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/products', verifyToken, AdminController.getProducts);
router.get('/dashboard', verifyToken, AdminController.getDashboard);
router.get('/orders', verifyToken, AdminController.getOrders);

module.exports = router;