const path = require('path');
const webpackConfig = {
  entry: path.resolve(__dirname, './client/index.jsx'),
  output: {
    path: path.resolve(__dirname, './client/public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
};
webpackConfig.module.loaders.push({
  test: /\.js[x]?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: { 
  presets: ['es2015', 'react'],  
  },
});
webpackConfig.module.loaders.push({
  test: /\.(jpg|png|svg)$/,
  loader: 'url-loader',
  options: {
    limit: 25000,
  }
});
module.exports = webpackConfig;