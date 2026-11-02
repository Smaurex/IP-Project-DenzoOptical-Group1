const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/'
};
const tokenLifetime = '1d';
const cookieLifetimeMs = 24 * 60 * 60 * 1000;

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return process.env.JWT_SECRET;
}

function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    error: { message }
  });
}

async function register(req, res, next) {
  try {
    const existingUser = await userService.findByEmail(req.body.email);
    if (existingUser) {
      return sendError(res, 409, 'Email is already registered');
    }

    const user = await userService.createUser(req.body);
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
      return sendError(res, 409, 'Email is already registered');
    }
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = await userService.authenticate(req.body.email, req.body.password);
    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const token = jwt.sign(
      {
        userID: user.userID,
        username: user.username,
        email: user.email,
        role: user.role
      },
      getJwtSecret(),
      { expiresIn: tokenLifetime }
    );
    res.cookie('token', token, {
      ...cookieOptions,
      maxAge: cookieLifetimeMs
    });

    return res.json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
}

function logout(req, res) {
  res.clearCookie('token', cookieOptions);
  return res.json({
    success: true,
    data: { message: 'Logged out' }
  });
}

async function me(req, res, next) {
  try {
    const user = await userService.findById(req.user.userID);
    if (!user) {
      res.clearCookie('token', cookieOptions);
      return sendError(res, 401, 'Authentication required');
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login, logout, me };
