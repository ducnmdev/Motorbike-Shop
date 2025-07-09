const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.post('/add-new-order', OrderController.addNewOrder)

module.exports = router;