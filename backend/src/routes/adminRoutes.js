const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/products', verifyToken, AdminController.getProducts);

module.exports = router;