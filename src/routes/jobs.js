const express = require('express');

const router = express.Router();
const jobsController = require('../controllers/jobsController');

router.post('/', jobsController.create);
router.put('/:id/publish', jobsController.publish);
router.put('/:id', jobsController.update);

module.exports = router;