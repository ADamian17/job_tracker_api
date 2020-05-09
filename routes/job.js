const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.post('/newjob', authRequired, ctrl.job.createJob);

module.exports = router;
