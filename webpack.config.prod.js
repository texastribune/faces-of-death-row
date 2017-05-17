const path = require('path');
const webpack = require('webpack');

const config = require('./webpack.config');
const projectConfig = require('./project.config');

config.debug = false;
config.devtool = 'source-map';

config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);

config.output.publicPath = '/' + path.join(projectConfig.folder, '/scripts/');

module.exports = config;
