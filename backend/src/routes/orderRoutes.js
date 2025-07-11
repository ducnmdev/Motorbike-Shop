const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/checkout', OrderController.addNewOrder)
router.get('/my-orders', verifyToken, OrderController.getUserOrder)
router.get('/motorcycle/:id', OrderController.getOrderDetail)
router.get('/:id/invoice', OrderController.generateInvoicePDF)

module.exports = router;