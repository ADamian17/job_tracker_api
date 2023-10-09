const express = require('express');
const router = express.Router();
const { user } = require('../controllers');
const { authRequired, checkFormFields } = require('../middleware');

// IMPORTANT base route /api/v1/users
router.get('/profile', authRequired, user.profile);
router.put('/update', authRequired, checkFormFields, user.update);
router.put('/addprofileimg', authRequired, checkFormFields, user.addImg);
router.delete('/delete', authRequired, user.destroy);

module.exports = router;
