const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.job.index);
router.post('/newjob', authRequired, ctrl.job.createJob);
router.delete('/:id', authRequired, ctrl.job.destroy);

module.exports = router;
