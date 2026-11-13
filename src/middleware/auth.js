const jwt = require('jsonwebtoken');

function getToken(req) {
  const header = req.get('authorization');
  if (header?.startsWith('Bearer ')) return header.slice(7);
  return req.cookies.denzo_token;
}

function authenticate(req, res, next) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'development-only-secret');
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

module.exports = { authenticate, allowRoles };
