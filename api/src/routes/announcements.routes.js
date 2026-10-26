const express = require('express');
const { body, param } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const announcementsController = require('../controllers/announcements.controller');

const router = express.Router();
const validateId = [
  param('id')
    .isInt({ min: 1, max: 2147483647 })
    .withMessage('Announcement ID must be a positive integer within the supported range'),
  validate
];
const validateMessage = [
  body('message')
    .isString()
    .withMessage('Message is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .bail()
    .isLength({ max: 2000 })
    .withMessage('Message must be at most 2000 characters'),
  validate
];

router.get('/', requireAuth, announcementsController.list);
router.post('/', requireAuth, requireRole('doctor'), validateMessage, announcementsController.create);
router.delete('/:id', requireAuth, requireRole('doctor'), validateId, announcementsController.remove);

module.exports = router;
