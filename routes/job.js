const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const { authRequired } = require('../middleware');

// IMPORTANT base route /api/v1/jobs
router.get('/', authRequired, ctrl.job.index);
router.post('/newjob', authRequired, ctrl.job.createJob);
router.get('/:id', authRequired, ctrl.job.showJob);
router.put('/update/:id', authRequired, ctrl.job.updateJob);
router.delete('/delete/:id', authRequired, ctrl.job.destroy);

module.exports = router;
