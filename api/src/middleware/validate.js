const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    success: false,
    error: {
      message: 'Validation failed',
      details: result.array({ onlyFirstError: true }).map(({ msg, path, location }) => ({
        message: msg,
        path,
        location
      }))
    }
  });
}

module.exports = validate;
