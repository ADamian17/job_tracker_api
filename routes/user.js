const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.user.index);
router.post('/newuser', ctrl.auth.createUser);

module.exports = router;
