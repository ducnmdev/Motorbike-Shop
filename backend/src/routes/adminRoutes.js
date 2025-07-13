const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/admin/orders', verifyToken, verifyAdmin, adminController.getAllOrders);

module.exports = router;