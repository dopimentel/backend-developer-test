const express = require('express');

const router = express.Router();
const companiesController = require('../controllers/companiesController');

router.get('/', companiesController.findAll);
router.get('/:id', companiesController.findById);

module.exports = router;
