const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/account/profile', UserController.getUserInfo)

module.exports = router;