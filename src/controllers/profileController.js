const db = require('../config/db');

async function me(req, res, next) {
  try {
    const [rows] = await db.execute('SELECT userID, username, email, role, profile_pic_id FROM users WHERE userID = ?', [req.user.userID]);
    if (!rows[0]) return res.status(404).json({ error: 'User not found' });
    res.json({ user: rows[0] });
  } catch (error) { next(error); }
}

async function updateImage(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image is required' });
    await db.execute('UPDATE users SET profile_pic_originalName = ?, profile_pic_id = ? WHERE userID = ?', [req.file.originalname, req.file.filename, req.user.userID]);
    res.json({ profile_pic_id: req.file.filename });
  } catch (error) { next(error); }
}

module.exports = { me, updateImage };
