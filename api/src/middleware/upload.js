const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const projectRoot = path.resolve(__dirname, '..', '..', '..');
const allowedFolders = new Set(['profile_pics', 'item_pics', 'uploads']);
const allowedMimeTypes = new Map([
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.gif', 'image/gif']
]);
const maxFileSize = 5 * 1024 * 1024;

function createUploader(folderName) {
  if (!allowedFolders.has(folderName)) {
    throw new Error(`Unsupported upload folder: ${folderName}`);
  }

  const destination = path.join(projectRoot, folderName);
  const storage = multer.diskStorage({
    destination(req, file, callback) {
      fs.mkdir(destination, { recursive: true }, (error) => {
        callback(error, destination);
      });
    },
    filename(req, file, callback) {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `pfp_${crypto.randomBytes(16).toString('hex')}${extension}`);
    }
  });

  return multer({
    storage,
    limits: { fileSize: maxFileSize },
    fileFilter(req, file, callback) {
      const extension = path.extname(file.originalname).toLowerCase();
      if (allowedMimeTypes.get(extension) !== file.mimetype) {
        const error = new Error('Only JPG, JPEG, PNG, and GIF images are allowed');
        error.status = 400;
        return callback(error);
      }
      return callback(null, true);
    }
  });
}

module.exports = { createUploader };
