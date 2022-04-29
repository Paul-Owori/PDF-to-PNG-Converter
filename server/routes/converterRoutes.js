const express = require('express');
const handleUploads = require('../utilities/saveImageLocally');
const converterController = require('../controllers/converterController');
const router = express.Router();

router
  .post('/', handleUploads.single('file'), converterController.convertData)
  .get(converterController.test);

module.exports = router;
