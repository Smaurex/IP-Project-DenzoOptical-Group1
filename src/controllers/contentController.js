const db = require('../config/db');

async function announcements(_req, res, next) {
  try {
    const [items] = await db.execute('SELECT announcementID, message FROM announcement ORDER BY announcementID DESC');
    res.json({ announcements: items });
  } catch (error) { next(error); }
}

async function createAnnouncement(req, res, next) {
  try {
    const message = String(req.body.message || '').trim();
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const [result] = await db.execute('INSERT INTO announcement (message) VALUES (?)', [message]);
    res.status(201).json({ announcementID: result.insertId, message });
  } catch (error) { next(error); }
}

async function about(_req, res, next) {
  try {
    const [rows] = await db.execute('SELECT * FROM about WHERE aboutID = 1');
    res.json({ about: rows[0] || null });
  } catch (error) { next(error); }
}

async function updateAbout(req, res, next) {
  try {
    const fields = ['doctorName', 'mobile', 'telephone', 'address', 'credentials'];
    const updates = fields.filter((field) => typeof req.body[field] === 'string' && req.body[field].trim());
    if (!updates.length) return res.status(400).json({ error: 'At least one about field is required' });
    const values = updates.map((field) => req.body[field].trim());
    await db.execute(`UPDATE about SET ${updates.map((field) => `\`${field}\` = ?`).join(', ')} WHERE aboutID = 1`, values);
    res.status(204).end();
  } catch (error) { next(error); }
}

async function updateAboutImage(req, res, next) {
  try {
    if (!req.file || !['header', 'doctor'].includes(req.params.kind)) return res.status(400).json({ error: 'Valid image and image kind are required' });
    const prefix = req.params.kind === 'header' ? 'headerImg' : 'doctorImg';
    await db.execute(`UPDATE about SET ${prefix}_OriginalName = ?, ${prefix}Name_id = ? WHERE aboutID = 1`, [req.file.originalname, req.file.filename]);
    res.status(204).end();
  } catch (error) { next(error); }
}

module.exports = { announcements, createAnnouncement, about, updateAbout, updateAboutImage };
