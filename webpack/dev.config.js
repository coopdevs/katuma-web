require('babel/polyfill');

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = (process.env.NODE_HOST || 'localhost');
var port = parseInt(process.env.PORT) + 1 || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};
var babelLoaderQuery = Object.assign({}, babelrcObject, babelrcObjectDevelopment);
delete babelLoaderQuery.env;

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
if (babelLoaderQuery.plugins.indexOf('react-transform') < 0) {
  babelLoaderQuery.plugins.push('react-transform');
}

babelLoaderQuery.extra = babelLoaderQuery.extra || {};
if (!babelLoaderQuery.extra['react-transform']) {
  babelLoaderQuery.extra['react-transform'] = {};
}
if (!babelLoaderQuery.extra['react-transform'].transforms) {
  babelLoaderQuery.extra['react-transform'].transforms = [];
}
babelLoaderQuery.extra['react-transform'].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

var VENDOR_CSS = './src/styles/vendor/index.css';
var GLOBAL_CSS = './src/styles/global/index.scss';

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      'bootstrap-sass!./src/styles/bootstrap/config.js',
      './src/client.js'
    ],
    vendor_styles: VENDOR_CSS,
    global_styles: GLOBAL_CSS,
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel?' + JSON.stringify(babelLoaderQuery),
          'eslint-loader',
        ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&!autoprefixer?browsers=last 2 version!sass?outputStyle=compact'),
        include: path.resolve(__dirname, '../src/styles/global'),
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap',
        exclude: path.resolve(__dirname, '../src/styles/global'),
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240',
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite',
        query: {
          spriteModule: path.resolve(__dirname, '../node_modules/svg-sprite-loader/lib/server-side-sprite.js'),
        },
        include: path.resolve(__dirname, '../src/components/Icon/svg'),
      },
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};
