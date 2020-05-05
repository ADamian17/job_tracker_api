const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', ctrl.user.index);
router.get('/profile', authRequired, ctrl.user.profile);
router.delete('/delete', authRequired, ctrl.user.destroy);

module.exports = router;
