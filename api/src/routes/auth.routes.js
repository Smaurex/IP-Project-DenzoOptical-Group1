const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const authController = require('../controllers/auth.controller');

const router = express.Router();

function createAuthLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler(req, res) {
      return res.status(429).json({
        success: false,
        error: { message: 'Too many authentication attempts. Please try again later.' }
      });
    }
  });
}

const registerLimiter = createAuthLimiter();
const loginLimiter = createAuthLimiter();

const registrationValidation = [
  body('fname').isString().withMessage('First name is required').bail().trim().notEmpty(),
  body('lname').isString().withMessage('Last name is required').bail().trim().notEmpty(),
  body('email')
    .isString()
    .withMessage('Email is required')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('A valid email is required'),
  body('password').isString().withMessage('Password is required').bail().notEmpty(),
  body('passwordConfirm')
    .isString()
    .withMessage('Password confirmation is required')
    .bail()
    .notEmpty()
    .withMessage('Password confirmation is required')
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  validate
];

const loginValidation = [
  body('email').isString().withMessage('Email is required').bail().trim().notEmpty(),
  body('password').isString().withMessage('Password is required').bail().notEmpty(),
  validate
];

router.post('/register', registerLimiter, registrationValidation, authController.register);
router.post('/login', loginLimiter, loginValidation, authController.login);
router.post('/logout', authController.logout);
router.get('/me', requireAuth, authController.me);

module.exports = router;
