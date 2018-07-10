const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, '../output/asset'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '../asset/'
  },
  // TODO： 图片压缩 。。。

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: '../index.html' // 可定义html输出路径，相对于 output.path 目录
    }),
    // js压缩
    new UglifyJsPlugin({
      test: /\.js$/,
      exclude: /\/node_modules/,
      cache: true,
      uglifyOptions: {

      },
      extractComments: true
    }),
    // css压缩
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      // cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    })
  ],

  optimization: {
    runtimeChunk: {
      name: 'single'
    },
    splitChunks: {
      cacheGroups: {
        // 打包第三方文件
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor'
        },
        // 打包公共库文件
        common: {
          test: /common\/|lib\//,
          chunks: 'all',
          name: 'common',
          enforce: true
        }
      }
    }
  },
})
