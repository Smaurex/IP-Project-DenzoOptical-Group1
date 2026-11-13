const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

function issueToken(user) {
  return jwt.sign(
    { userID: user.userID, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'development-only-secret',
    { expiresIn: '2h' },
  );
}

function setTokenCookie(res, token) {
  res.cookie('denzo_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2 * 60 * 60 * 1000,
  });
}

async function register(req, res, next) {
  try {
    const { fname, lname, email, password, pass, passwordConfirmation, passConf } = req.body;
    const chosenPassword = password ?? pass;
    if (!fname || !lname || !email || !chosenPassword || (passwordConfirmation ?? passConf) !== chosenPassword) {
      return res.status(400).json({ error: 'First name, last name, email, and matching passwords are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });

    const [existing] = await db.execute('SELECT userID FROM users WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(chosenPassword, 12);
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, role, profile_pic_originalName, profile_pic_id) VALUES (?, ?, ?, ?, ?, ?)',
      [`${fname.trim()} ${lname.trim()}`, email.trim().toLowerCase(), passwordHash, 'patient', 'default_pfp.jpg', 'default_pfp.jpg'],
    );
    return res.status(201).json({ userID: result.insertId, message: 'Account created' });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const email = req.body.email ?? req.body.emailLogin;
    const password = req.body.password ?? req.body.passLogin;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    const user = rows[0];
    const valid = user && await bcrypt.compare(password, user.password.replace(/^\$2y\$/, '$2a$'));
    if (!valid) return res.status(401).json({ error: 'Incorrect login information' });

    const token = issueToken(user);
    setTokenCookie(res, token);
    return res.json({ user: { userID: user.userID, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    return next(error);
  }
}

function logout(_req, res) {
  res.clearCookie('denzo_token');
  res.status(204).end();
}

function status(req, res) {
  res.json({ authenticated: true, user: req.user });
}

module.exports = { register, login, logout, status };
