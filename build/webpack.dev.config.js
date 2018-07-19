const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
// happypack
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) //启动线程池

const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../src'),
    historyApiFallback: true,
    // disableHostCheck: true
    // 允许开发服务器访问本地服务器的包JSON文件，防止跨域
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),
    // happypack
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: [
        {
          loader: 'babel-loader'
        },
        {
          options: { configFile: path.resolve(__dirname, '../.eslintrc') },
          loader: 'eslint-loader'
        }
      ],
      threadPool: HappyThreadPool
      // ... 其它配置项
    }),
    new webpack.DefinePlugin({
      _ENV_: JSON.stringify('dev')
    })
  ]
})
