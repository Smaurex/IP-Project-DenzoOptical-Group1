const express = require('express');
const { param } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const { createUploader } = require('../middleware/upload');
const validate = require('../middleware/validate');
const credentialsController = require('../controllers/credentials.controller');

const router = express.Router();
const doctorOnly = [requireAuth, requireRole('doctor')];
const credentialUploader = createUploader('uploads');
const validateId = [
  param('id')
    .isInt({ min: 1, max: 2147483647 })
    .withMessage('Credential ID must be a positive integer within the supported range'),
  validate
];

router.get('/', credentialsController.list);
router.post('/', ...doctorOnly, credentialUploader.single('credential-img'), credentialsController.create);
router.delete('/:id', ...doctorOnly, validateId, credentialsController.remove);

module.exports = router;
