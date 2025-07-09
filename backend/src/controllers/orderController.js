const Order = require('../models/Order')

class OrderController {

    // [GET] /check
    addNewOrder(req, res, next) {
        console.log(req.body)
    };

}

module.exports = new OrderController;