const pool = require('../config/db');

const credentialColumns =
  'credID, credential_pic_originalName, credential_pic_id';

async function findAll() {
  const [rows] = await pool.execute(
    `SELECT ${credentialColumns} FROM credential ORDER BY credID DESC`
  );
  return rows;
}

async function create(originalName, imageId) {
  const [result] = await pool.execute(
    `INSERT INTO credential
      (credential_pic_originalName, credential_pic_id)
     VALUES (?, ?)`,
    [originalName, imageId]
  );
  const [rows] = await pool.execute(
    `SELECT ${credentialColumns} FROM credential WHERE credID = ? LIMIT 1`,
    [result.insertId]
  );
  return rows[0] || null;
}

async function findById(credID) {
  const [rows] = await pool.execute(
    `SELECT ${credentialColumns} FROM credential WHERE credID = ? LIMIT 1`,
    [credID]
  );
  return rows[0] || null;
}

async function remove(credID) {
  const [result] = await pool.execute('DELETE FROM credential WHERE credID = ?', [credID]);
  return result.affectedRows > 0;
}

module.exports = { findAll, create, findById, remove };
