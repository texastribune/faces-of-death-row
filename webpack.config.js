const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '/app/scripts'),
  entry: {
    main: './main.js'
  },
  output: {
    path: path.join(__dirname, '/dist/scripts'),
    publicPath: '/scripts/',
    filename: '[name].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    // only uncomment if you've read `docs/jquery.md` and know you need it
    // new webpack.ProvidePlugin({
    //   '$': 'jquery',
    //   'jQuery': 'jquery',
    //   'window.jQuery': 'jquery'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 2
    })
  ],
  debug: true,
  devtool: 'cheap-module-eval-source-map'
};
