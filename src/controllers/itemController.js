const db = require('../config/db');

async function list(_req, res, next) {
  try {
    const [items] = await db.execute('SELECT itemID, quantity, item_OriginalName, item_pic_id FROM item ORDER BY itemID');
    res.json({ items });
  } catch (error) { next(error); }
}

async function create(req, res, next) {
  try {
    const quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 0 || !req.file) return res.status(400).json({ error: 'A non-negative quantity and image are required' });
    const [result] = await db.execute('INSERT INTO item (quantity, item_OriginalName, item_pic_id) VALUES (?, ?, ?)', [quantity, req.file.originalname, req.file.filename]);
    res.status(201).json({ itemID: result.insertId });
  } catch (error) { next(error); }
}

async function updateQuantity(req, res, next) {
  try {
    const quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 0) return res.status(400).json({ error: 'Quantity must be a non-negative integer' });
    const [result] = await db.execute('UPDATE item SET quantity = ? WHERE itemID = ?', [quantity, req.params.itemID]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Item not found' });
    res.status(204).end();
  } catch (error) { next(error); }
}

async function updateImage(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image is required' });
    const [result] = await db.execute('UPDATE item SET item_OriginalName = ?, item_pic_id = ? WHERE itemID = ?', [req.file.originalname, req.file.filename, req.params.itemID]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Item not found' });
    res.status(204).end();
  } catch (error) { next(error); }
}

async function remove(req, res, next) {
  try {
    const [result] = await db.execute('DELETE FROM item WHERE itemID = ?', [req.params.itemID]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Item not found' });
    res.status(204).end();
  } catch (error) { next(error); }
}

module.exports = { list, create, updateQuantity, updateImage, remove };
