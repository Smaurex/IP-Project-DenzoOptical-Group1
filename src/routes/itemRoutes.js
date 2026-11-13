const router = require('express').Router();
const path = require('node:path');
const controller = require('../controllers/itemController');
const imageUpload = require('../middleware/upload');
const { authenticate, allowRoles } = require('../middleware/auth');

const itemUpload = imageUpload(path.resolve(process.env.ITEM_UPLOAD_DIR || 'item_pics'));
const staffOnly = [authenticate, allowRoles('doctor', 'assistant')];

router.get('/', controller.list);
router.post('/', ...staffOnly, itemUpload.single('image'), controller.create);
router.patch('/:itemID/quantity', ...staffOnly, controller.updateQuantity);
router.patch('/:itemID/image', ...staffOnly, itemUpload.single('image'), controller.updateImage);
router.delete('/:itemID', ...staffOnly, controller.remove);

module.exports = router;
