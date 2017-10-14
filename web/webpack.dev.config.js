const webpack = require('webpack');
const base = require('./webpack.config');

base.devtool = 'cheap-module-eval-source-map';
base.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
base.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
);

module.exports = base;
