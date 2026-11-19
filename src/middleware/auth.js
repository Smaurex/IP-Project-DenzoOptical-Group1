const jwt = require('jsonwebtoken');
const db = require('../config/db');

function getToken(req) {
  const header = req.get('authorization');
  if (header?.startsWith('Bearer ')) return header.slice(7);
  return req.cookies.denzo_token;
}

async function authenticate(req, res, next) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || 'development-only-secret');
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  try {
    const [rows] = await db.execute('SELECT userID, username, email, role, status FROM users WHERE userID = ?', [payload.userID]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Account not found' });
    if (user.status === 'deactivated') {
      res.clearCookie('denzo_token');
      return res.status(403).json({ error: 'Account is deactivated' });
    }
    req.user = { userID: user.userID, username: user.username, email: user.email, role: user.role, status: user.status || 'active' };
    return next();
  } catch (error) {
    if (error.code === 'ER_BAD_FIELD_ERROR') {
      req.user = payload;
      return next();
    }
    return next(error);
  }
}

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

module.exports = { authenticate, allowRoles };
