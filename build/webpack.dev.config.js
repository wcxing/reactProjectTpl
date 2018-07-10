const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    // disableHostCheck: true
    // 允许开发服务器访问本地服务器的包JSON文件，防止跨域
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      _ENV_: JSON.stringify('dev')
    })
  ]
})
