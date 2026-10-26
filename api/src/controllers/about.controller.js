const fs = require('fs/promises');
const path = require('path');
const aboutService = require('../services/about.service');

const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads');

const imageColumns = {
  header: ['headerImg_OriginalName', 'headerImgName_id'],
  doctor: ['doctorImg_OriginalName', 'doctorImgName_id']
};

function imagePath(imageId) {
  if (typeof imageId !== 'string' || path.basename(imageId) !== imageId) {
    return null;
  }
  return path.join(uploadFolder, imageId);
}

async function deleteImage(imageId) {
  if (!imageId) {
    return;
  }

  const target = imagePath(imageId);
  if (!target) {
    throw new Error('Stored about image filename is invalid');
  }
  try {
    await fs.unlink(target);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function get(req, res, next) {
  try {
    return res.json({ success: true, data: await aboutService.find() });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const about = await aboutService.updateFields(req.body);
    return res.json({ success: true, data: about });
  } catch (error) {
    return next(error);
  }
}

function updateImage(type) {
  const [originalNameColumn, imageIdColumn] = imageColumns[type];
  return async function updateAboutImage(req, res, next) {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: { message: 'Image file is required' }
      });
    }

    try {
      const current = await aboutService.find();
      let updated;
      try {
        updated = await aboutService.updateImage(
          originalNameColumn,
          imageIdColumn,
          path.basename(req.file.originalname),
          req.file.filename
        );
      } catch (error) {
        await deleteImage(req.file.filename);
        throw error;
      }

      await deleteImage(current[imageIdColumn]);
      return res.json({ success: true, data: updated });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = { get, update, updateHeaderImage: updateImage('header'), updateDoctorImage: updateImage('doctor') };
