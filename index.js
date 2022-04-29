const express = require('express');
const path = require('path');
const cors = require('cors');
const colors = require('colors');
const converterRoutes = require('./server/routes/converterRoutes');

const APP_NAME = 'PDF to PNG Service';
const PORT = 3200;
const app = express();

app.enable('trust proxy');

// Make api public
app.use(cors());

// Limit file uploads to 5mb
app.use(express.json({ limit: 5 * 1024 * 1024 }));

// Routes
app.use('/app', converterRoutes);

app.get('/*', (req, res) => {
  app.use(express.static(__dirname + '/'));
  // app.use(express.static('./../client/public'));
  res.send("Sorry, you requested a resource that doesn't exist.");
});

app.listen(PORT, () => {
  console.log('Inside');
  console.log(`${APP_NAME} is running on port ${PORT}.`.cyan);
});
