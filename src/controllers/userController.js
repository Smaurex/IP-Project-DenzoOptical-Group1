const db = require('../config/db');

const VALID_ROLES = ['patient', 'assistant', 'doctor'];
const VALID_STATUSES = ['active', 'deactivated'];

let statusColumnEnsured = false;

async function ensureStatusColumn() {
  if (statusColumnEnsured) return;
  try {
    const [columns] = await db.execute("SHOW COLUMNS FROM users LIKE 'status'");
    if (!columns.length) {
      await db.execute("ALTER TABLE users ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'active'");
    }
    statusColumnEnsured = true;
  } catch (error) {
    // Ignore if table doesn't exist or DB isn't reachable yet; subsequent query will report the DB error
  }
}

async function list(_req, res, next) {
  try {
    await ensureStatusColumn();
    const [rows] = await db.execute(
      'SELECT userID, username, email, role, status, profile_pic_id FROM users ORDER BY userID ASC',
    );
    const users = rows.map((u) => ({
      ...u,
      role: u.role || 'patient',
      status: u.status || 'active',
    }));
    return res.json({ users });
  } catch (error) {
    return next(error);
  }
}

async function updateRole(req, res, next) {
  try {
    await ensureStatusColumn();
    const targetID = Number(req.params.userID);
    const { role } = req.body;

    if (!Number.isInteger(targetID) || targetID <= 0) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: 'Role must be patient, assistant, or doctor' });
    }
    if (targetID === Number(req.user.userID)) {
      return res.status(400).json({ error: 'You cannot change the role of your own account' });
    }

    const [result] = await db.execute('UPDATE users SET role = ? WHERE userID = ?', [role, targetID]);
    if (!result.affectedRows) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ userID: targetID, role, message: 'Role updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    await ensureStatusColumn();
    const targetID = Number(req.params.userID);
    const { status } = req.body;

    if (!Number.isInteger(targetID) || targetID <= 0) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Status must be active or deactivated' });
    }
    if (targetID === Number(req.user.userID)) {
      return res.status(400).json({ error: 'You cannot deactivate your own account' });
    }

    const [result] = await db.execute('UPDATE users SET status = ? WHERE userID = ?', [status, targetID]);
    if (!result.affectedRows) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ userID: targetID, status, message: `Account ${status}` });
  } catch (error) {
    return next(error);
  }
}

module.exports = { list, updateRole, updateStatus, ensureStatusColumn };

