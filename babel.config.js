const fs = require('fs');
const path = require('path');
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
        forceAllTransforms: true,
      },
    ],
  ],

  exclude: new RegExp('/node_modules/(?!(pdf-to-png-converter)/).*/'),
};
