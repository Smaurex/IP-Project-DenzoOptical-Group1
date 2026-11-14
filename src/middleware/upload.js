const multer = require('multer');
const path = require('node:path');

const imageTypes = new Set(['image/jpeg', 'image/png', 'image/gif']);

function imageUpload(directory) {
  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, path.resolve(directory)),
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, callback) => callback(null, imageTypes.has(file.mimetype)),
  });
}

module.exports = imageUpload;
