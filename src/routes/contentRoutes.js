const router = require('express').Router();
const path = require('node:path');
const controller = require('../controllers/contentController');
const imageUpload = require('../middleware/upload');
const { authenticate, allowRoles } = require('../middleware/auth');

const aboutUpload = imageUpload(path.resolve(process.env.UPLOAD_DIR || 'uploads'));

router.get('/announcements', controller.announcements);
router.post('/announcements', authenticate, allowRoles('doctor'), controller.createAnnouncement);
router.get('/about', controller.about);
router.patch('/about', authenticate, allowRoles('doctor'), controller.updateAbout);
router.patch('/about/images/:kind', authenticate, allowRoles('doctor'), aboutUpload.single('image'), controller.updateAboutImage);

module.exports = router;
