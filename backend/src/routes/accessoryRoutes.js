const express = require('express');
const router = express.Router();
const AccessoryController = require('../controllers/accessoryController');
const { upload } = require('../middlewares/multer')

router.post('/create', upload.fields([
    { name: 'imgPhuKien', maxCount: 1 },
]),
    AccessoryController.create);

router.get('/:slug', AccessoryController.getBySlug)

router.get('/', AccessoryController.getAll)


module.exports = router;