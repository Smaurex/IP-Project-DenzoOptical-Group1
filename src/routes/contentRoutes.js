const router = require('express').Router();

router.get('/announcements', (_req, res) => res.status(501).json({ error: 'Content API is not implemented yet' }));
router.get('/about', (_req, res) => res.status(501).json({ error: 'Content API is not implemented yet' }));

module.exports = router;
