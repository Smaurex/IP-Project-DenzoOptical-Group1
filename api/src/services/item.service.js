const pool = require('../config/db');

const itemColumns = 'itemID, quantity, item_OriginalName, item_pic_id';

async function findAll() {
  const [rows] = await pool.execute(`SELECT ${itemColumns} FROM item ORDER BY itemID`);
  return rows;
}

async function findById(itemID) {
  const [rows] = await pool.execute(
    `SELECT ${itemColumns} FROM item WHERE itemID = ? LIMIT 1`,
    [itemID]
  );
  return rows[0] || null;
}

async function create({ quantity, originalName, imageId }) {
  const [result] = await pool.execute(
    `INSERT INTO item (quantity, item_OriginalName, item_pic_id)
     VALUES (?, ?, ?)`,
    [quantity, originalName, imageId]
  );
  return findById(result.insertId);
}

async function updateImage(itemID, originalName, imageId) {
  await pool.execute(
    `UPDATE item SET item_OriginalName = ?, item_pic_id = ? WHERE itemID = ?`,
    [originalName, imageId, itemID]
  );
  return findById(itemID);
}

async function updateQuantity(itemID, quantity) {
  await pool.execute(
    'UPDATE item SET quantity = ? WHERE itemID = ?',
    [quantity, itemID]
  );
  return findById(itemID);
}

async function remove(itemID) {
  const [result] = await pool.execute('DELETE FROM item WHERE itemID = ?', [itemID]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, updateImage, updateQuantity, remove };
