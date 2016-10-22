const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const env = process.env.NODE_ENV
const dev = env === 'development'

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
}

const webpackConfig = {
  entry: path.join(paths.src, 'index.js'),
  debug: dev,
  devtool: dev ? 'source-map' : 'cheap-module-source-map',
  output: {
    path: paths.dist,
    filename: dev ? 'bundle.js' : '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: paths.src,
        loaders: ['babel']
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url',
        query: {
          limit: 10000
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.src, 'index.html')
    }),
    new webpack.DefinePlugin({}),
    new CopyWebpackPlugin([
      {
        from: path.join(paths.src, '/vendor'),
        to: path.join(paths.dist, '/vendor/static')
      }
    ])
  ],
  devServer: {
    contentBase: paths.dist,
    historyApiFallback: true
  }
}

const buildEnv = env === 'development' ? env : 'production'

if (!dev) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + buildEnv + '"'
    }),
    new CleanPlugin(paths.dist),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ])
}

module.exports = webpackConfig
