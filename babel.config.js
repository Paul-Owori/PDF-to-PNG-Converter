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

  exclude: new RegExp(
    fs
      .readFileSync(path.resolve('./non_ES5_node_modules'), 'utf-8')
      .slice(1, -2),
  ),
};
