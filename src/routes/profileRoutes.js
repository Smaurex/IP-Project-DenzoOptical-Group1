const router = require('express').Router();
const path = require('node:path');
const controller = require('../controllers/profileController');
const imageUpload = require('../middleware/upload');
const { authenticate } = require('../middleware/auth');

const profileUpload = imageUpload(path.resolve(process.env.PROFILE_UPLOAD_DIR || 'profile_pics'));

router.use(authenticate);
router.get('/', controller.me);
router.patch('/image', profileUpload.single('image'), controller.updateImage);

module.exports = router;
