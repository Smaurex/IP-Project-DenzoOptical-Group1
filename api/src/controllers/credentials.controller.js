const fs = require('fs/promises');
const path = require('path');
const credentialService = require('../services/credential.service');

const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads');

function imagePath(imageId) {
  if (typeof imageId !== 'string' || path.basename(imageId) !== imageId) {
    return null;
  }
  return path.join(uploadFolder, imageId);
}

async function deleteImage(imageId) {
  const target = imagePath(imageId);
  if (!target) {
    throw new Error('Stored credential image filename is invalid');
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
    error: { message: 'Credential not found' }
  });
}

async function list(req, res, next) {
  try {
    return res.json({
      success: true,
      data: await credentialService.findAll()
    });
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: { message: 'Credential image file is required' }
    });
  }

  try {
    const credential = await credentialService.create(
      path.basename(req.file.originalname),
      req.file.filename
    );
    if (!credential) {
      await deleteImage(req.file.filename);
      return next(new Error('Created credential could not be retrieved'));
    }
    return res.status(201).json({ success: true, data: credential });
  } catch (error) {
    try {
      await deleteImage(req.file.filename);
    } catch (cleanupError) {
      return next(cleanupError);
    }
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const credential = await credentialService.findById(Number(req.params.id));
    if (!credential) {
      return sendNotFound(res);
    }

    const removed = await credentialService.remove(Number(req.params.id));
    if (!removed) {
      return sendNotFound(res);
    }

    await deleteImage(credential.credential_pic_id);
    return res.json({
      success: true,
      data: { message: 'Credential deleted' }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { list, create, remove };
