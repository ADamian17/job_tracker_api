const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/register', ctrl.auth.createUser);
router.post('/login', ctrl.auth.login);
router.get('/validate-token', ctrl.auth.validateToken);

module.exports = router;
