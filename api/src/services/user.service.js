const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const userColumns =
  'userID, username, email, role, profile_pic_originalName, profile_pic_id';

async function findByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT userID, username, email, password, role, profile_pic_id FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

async function createUser({ fname, lname, email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const username = `${fname} ${lname}`;

  const [result] = await pool.execute(
    `INSERT INTO users
      (username, email, password, role, profile_pic_originalName, profile_pic_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [username, email, passwordHash, 'patient', 'default_pfp.jpg', 'default_pfp.jpg']
  );

  return {
    userID: result.insertId,
    username,
    email,
    role: 'patient',
    profile_pic: 'default_pfp.jpg'
  };
}

async function findById(userID) {
  const [rows] = await pool.execute(
    `SELECT ${userColumns} FROM users WHERE userID = ? LIMIT 1`,
    [userID]
  );
  const row = rows[0];
  return row ? toPublicUser(row) : null;
}

async function findProfileByEmail(email) {
  const [rows] = await pool.execute(
    `SELECT ${userColumns} FROM users WHERE email = ? LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

async function updateProfilePicture(email, originalName, imageId) {
  await pool.execute(
    `UPDATE users
     SET profile_pic_originalName = ?, profile_pic_id = ?
     WHERE email = ?`,
    [originalName, imageId, email]
  );
  const user = await findProfileByEmail(email);
  return user ? toPublicUser(user) : null;
}

async function resetProfilePicture(email) {
  await pool.execute(
    `UPDATE users
     SET profile_pic_originalName = ?, profile_pic_id = ?
     WHERE email = ?`,
    ['default_pfp.jpg', 'default_pfp.jpg', email]
  );
  const user = await findProfileByEmail(email);
  return user ? toPublicUser(user) : null;
}

async function authenticate(email, password) {
  const user = await findByEmail(email);
  if (!user || typeof user.password !== 'string') {
    return null;
  }

  const hash = user.password.startsWith('$2y$')
    ? `$2b$${user.password.slice(4)}`
    : user.password;
  if (!(await bcrypt.compare(password, hash))) {
    return null;
  }

  return toPublicUser(user);
}

function toPublicUser(user) {
  return {
    userID: user.userID,
    username: user.username,
    email: user.email,
    role: user.role,
    profile_pic: user.profile_pic_id
  };
}

module.exports = {
  findByEmail,
  createUser,
  findById,
  findProfileByEmail,
  updateProfilePicture,
  resetProfilePicture,
  authenticate
};
