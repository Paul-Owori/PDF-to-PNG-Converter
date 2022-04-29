"use strict";

var express = require('express');

var path = require('path');

var cors = require('cors');

var colors = require('colors');

var converterRoutes = require('./routes/converterRoutes');

var APP_NAME = 'PDF to PNG Service';
var PORT = 4000;
var app = express();
app.enable('trust proxy'); // Make api public

app.use(cors()); // Limit file uploads to 5mb

app.use(express.json({
  limit: 5 * 1024 * 1024
})); // Routes

app.use('/convert', converterRoutes);
app.get('/*', (req, res) => {
  app.use(express.static(__dirname + '/'));
  res.send("Sorry, you requested a resource that doesn't exist.");
});
app.listen(PORT, () => {
  console.log("".concat(APP_NAME, " is running on port ").concat(PORT, ".").cyan);
});
//# sourceMappingURL=index.js.map