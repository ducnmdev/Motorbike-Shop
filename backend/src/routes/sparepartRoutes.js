const express = require('express');
const router = express.Router();
const SparepartController = require('../controllers/sparepartController');
const { upload } = require('../middlewares/multer')

router.post('/create', upload.fields([
    { name: 'imgPhuTung', maxCount: 1 },
]),
    SparepartController.create);

router.get('/:slug', SparepartController.getBySlug)

router.get('/', SparepartController.getAll)


module.exports = router;