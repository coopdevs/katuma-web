const fontAwesomeConfig = require('./font-awesome.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
module.exports = fontAwesomeConfig;
