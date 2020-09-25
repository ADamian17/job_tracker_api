const express = require('express');
const router = express.Router();
const { user } = require('../controllers');
const authRequired = require('../middleware/authRequired');

// IMPORTANT base route /api/v1/users
router.get('/', user.index);
router.get('/profile', authRequired, user.profile);
router.put('/update', authRequired, user.update);
router.delete('/delete', authRequired, user.destroy);

module.exports = router;
