const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/account/profile', verifyToken, UserController.getUserInfo);
router.patch('/account/settings', verifyToken, UserController.updatePassword);
router.put('/account/updateAccountInfo', verifyToken, UserController.updateAccountInfo);

module.exports = router;