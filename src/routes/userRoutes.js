const router = require('express').Router();
const controller = require('../controllers/userController');
const { authenticate, allowRoles } = require('../middleware/auth');

const doctorOnly = [authenticate, allowRoles('doctor')];

router.use(...doctorOnly);
router.get('/', controller.list);
router.patch('/:userID/role', controller.updateRole);
router.patch('/:userID/status', controller.updateStatus);

module.exports = router;

