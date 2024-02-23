const express = require('express');

const router = express.Router();
const jobsController = require('../controllers/jobsController');

router.post('/', jobsController.create);

module.exports = router;