const jwt = require('jsonwebtoken');

function unauthorized(res) {
  return res.status(401).json({
    success: false,
    error: {
      message: 'Authentication required'
    }
  });
}

function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) {
    return unauthorized(res);
  }

  if (!process.env.JWT_SECRET) {
    return next(new Error('JWT_SECRET is not configured'));
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.NotBeforeError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return unauthorized(res);
    }
    return next(error);
  }

  const validUserId =
    payload &&
    (typeof payload.userID === 'number' ||
      (typeof payload.userID === 'string' && payload.userID.length > 0));
  if (
    !validUserId ||
    typeof payload.username !== 'string' ||
    typeof payload.email !== 'string' ||
    typeof payload.role !== 'string'
  ) {
    return unauthorized(res);
  }

  req.user = {
    userID: payload.userID,
    username: payload.username,
    email: payload.email,
    role: payload.role
  };
  return next();
}

module.exports = { requireAuth };
