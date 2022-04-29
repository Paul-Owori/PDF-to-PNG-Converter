"use strict";

var express = require('express');

var handleUploads = require('../utilities/saveImageLocally');

var converterController = require('../controllers/converterController');

var router = express.Router();
router.post('/', handleUploads.single('file'), converterController.convertData).get(converterController.test);
module.exports = router;
//# sourceMappingURL=converterRoutes.js.map