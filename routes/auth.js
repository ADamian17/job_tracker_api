const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/register', ctrl.auth.createUser);
router.post('/login', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);

module.exports = router;
