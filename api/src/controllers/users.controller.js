const fs = require('fs/promises');
const path = require('path');
const userService = require('../services/user.service');

const profilePicturesFolder = path.resolve(__dirname, '..', '..', '..', 'profile_pics');

function imagePath(imageId) {
  if (typeof imageId !== 'string' || path.basename(imageId) !== imageId) {
    return null;
  }
  return path.join(profilePicturesFolder, imageId);
}

async function deleteImage(imageId) {
  if (!imageId || imageId === 'default_pfp.jpg') {
    return;
  }

  const target = imagePath(imageId);
  if (!target) {
    throw new Error('Stored profile image filename is invalid');
  }

  try {
    await fs.unlink(target);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

function sendNotFound(res) {
  return res.status(404).json({
    success: false,
    error: { message: 'User not found' }
  });
}

async function getMe(req, res, next) {
  try {
    const user = await userService.findById(req.user.userID);
    if (!user) {
      return sendNotFound(res);
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
}

async function updateProfilePicture(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: { message: 'Profile picture file is required' }
    });
  }

  try {
    const previousUser = await userService.findProfileByEmail(req.user.email);
    if (!previousUser) {
      await deleteImage(req.file.filename);
      return sendNotFound(res);
    }

    let user;
    try {
      user = await userService.updateProfilePicture(
        req.user.email,
        path.basename(req.file.originalname),
        req.file.filename
      );
    } catch (error) {
      await deleteImage(req.file.filename);
      throw error;
    }

    if (!user) {
      await deleteImage(req.file.filename);
      return sendNotFound(res);
    }

    await deleteImage(previousUser.profile_pic_id);
    return res.json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
}

async function deleteProfilePicture(req, res, next) {
  try {
    const previousUser = await userService.findProfileByEmail(req.user.email);
    if (!previousUser) {
      return sendNotFound(res);
    }

    const user = await userService.resetProfilePicture(req.user.email);
    if (!user) {
      return sendNotFound(res);
    }

    await deleteImage(previousUser.profile_pic_id);
    return res.json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getMe, updateProfilePicture, deleteProfilePicture };
