const pool = require('../config/db');

const announcementColumns = 'announcementID, message';

async function findAll() {
  const [rows] = await pool.execute(
    `SELECT ${announcementColumns} FROM announcement ORDER BY announcementID DESC`
  );
  return rows;
}

async function create(message) {
  const [result] = await pool.execute(
    'INSERT INTO announcement (message) VALUES (?)',
    [message]
  );
  const [rows] = await pool.execute(
    `SELECT ${announcementColumns} FROM announcement WHERE announcementID = ? LIMIT 1`,
    [result.insertId]
  );
  return rows[0] || null;
}

async function remove(announcementID) {
  const [result] = await pool.execute(
    'DELETE FROM announcement WHERE announcementID = ?',
    [announcementID]
  );
  return result.affectedRows > 0;
}

module.exports = { findAll, create, remove };
