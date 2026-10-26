const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { createUploader } = require('../middleware/upload');
const usersController = require('../controllers/users.controller');

const router = express.Router();
const profilePictureUploader = createUploader('profile_pics').single('pfp-img');

router.use(requireAuth);
router.get('/me', usersController.getMe);
router.put('/me/profile-pic', profilePictureUploader, usersController.updateProfilePicture);
router.delete('/me/profile-pic', usersController.deleteProfilePicture);

module.exports = router;
