const express = require('express');
const { body } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const { createUploader } = require('../middleware/upload');
const validate = require('../middleware/validate');
const aboutController = require('../controllers/about.controller');

const router = express.Router();
const doctorOnly = [requireAuth, requireRole('doctor')];
const upload = createUploader('uploads');
const allowedFields = {
  doctorName: 100,
  mobile: 100,
  telephone: 255,
  email: 255,
  address: 255,
  credentials: 65535
};
const validateAboutFields = [
  body().custom((value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('Request body must be an object');
    }
    const keys = Object.keys(value);
    if (keys.length === 0 || keys.some((key) => !Object.prototype.hasOwnProperty.call(allowedFields, key))) {
      throw new Error('Provide at least one supported about field');
    }
    return true;
  }),
  ...Object.entries(allowedFields).map(([field, maxLength]) =>
    body(field)
      .optional()
      .isString()
      .withMessage(`${field} must be a string`)
      .bail()
      .isLength({ max: maxLength })
      .withMessage(`${field} must be at most ${maxLength} characters`)
  ),
  validate
];

router.get('/', aboutController.get);
router.put('/', ...doctorOnly, validateAboutFields, aboutController.update);
router.put(
  '/header-image',
  ...doctorOnly,
  upload.single('header-img'),
  aboutController.updateHeaderImage
);
router.put(
  '/doctor-image',
  ...doctorOnly,
  upload.single('doctor-img'),
  aboutController.updateDoctorImage
);

module.exports = router;
