const router = require('express').Router();

router.get('/', (_req, res) => res.status(501).json({ error: 'Profile API is not implemented yet' }));

module.exports = router;
