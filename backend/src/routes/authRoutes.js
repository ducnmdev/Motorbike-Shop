const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const verifyToken = require('../middlewares/auth');

router.post('/dang-ky', AuthController.create)
router.post('/dang-nhap', AuthController.login)
router.get('/check', verifyToken, AuthController.checkIsLoggin)

module.exports = router;