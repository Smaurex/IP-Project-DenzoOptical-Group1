const express = require('express');
const fs = require('fs/promises');
const { body, param, validationResult } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const { createUploader } = require('../middleware/upload');
const validate = require('../middleware/validate');
const itemsController = require('../controllers/items.controller');

const router = express.Router();
const itemUploader = createUploader('item_pics');
const validateId = [
  param('id')
    .isInt({ min: 1, max: 2147483647 })
    .withMessage('Item ID must be a positive integer within the supported range'),
  validate
];
const quantityValidation = body('quantity')
  .exists()
  .withMessage('Quantity is required')
  .bail()
  .isInt({ min: 0, max: 2147483647 })
  .withMessage('Quantity must be a non-negative integer within the supported range');
const validateQuantity = [
  quantityValidation,
  validate
];
async function validateCreateQuantity(req, res, next) {
  if (validationResult(req).isEmpty()) {
    return next();
  }

  if (req.file) {
    try {
      await fs.unlink(req.file.path);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        return next(error);
      }
    }
  }
  return validate(req, res, next);
}
const manageItems = [requireAuth, requireRole('doctor', 'assistant')];

router.get('/', itemsController.list);
router.get('/:id', validateId, itemsController.getById);
router.post(
  '/',
  ...manageItems,
  itemUploader.single('item-img-2'),
  quantityValidation,
  validateCreateQuantity,
  itemsController.create
);
router.put(
  '/:id',
  ...manageItems,
  validateId,
  itemUploader.single('item-edit-img'),
  itemsController.updateImage
);
router.patch(
  '/:id/quantity',
  ...manageItems,
  validateId,
  validateQuantity,
  itemsController.updateQuantity
);
router.delete('/:id', ...manageItems, validateId, itemsController.remove);

module.exports = router;
