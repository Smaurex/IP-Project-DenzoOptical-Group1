const router = require('express').Router();

router.get('/status', (_req, res) => res.json({ authenticated: false }));

module.exports = router;
