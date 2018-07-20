const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 打包分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // eslint-disable-line
// happypack
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) //启动线程池

const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, '../output/asset'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: './asset/'
  },
  // TODO： 图片压缩 。。。

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: '../index.html' // 可定义html输出路径，相对于 output.path 目录
    }),
    // 打包分析
    // new BundleAnalyzerPlugin(),
    // happypack
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: [
        {
          loader: 'babel-loader'
        }
      ],
      threadPool: HappyThreadPool
      // ... 其它配置项
    }),
    // js压缩
    new UglifyJsPlugin({
      test: /\.js$/,
      exclude: /\/node_modules/,
      cache: true,
      uglifyOptions: {

      },
      // extractComments: true
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
      name: 'runtime'
    },
    splitChunks: {
      maxInitialRequests: 6, // 最大初始化请求数
      cacheGroups: {
        // 打包第三方文件
        // 在 prod 环境是会有maxInitialRequests参数的限制
        // webpack会自动打包vender，vender过大时，我们提取出我们想要的文件即可，剩下的会打到vender中
        react: {
          test: /node_modules(\/react|\react-dom)/,
          // chunks: all,
          // name: 're'
        },
        lib: {
          test: /node_modules\/lodash/
        },
        // vendor: {
        //   test: /node_modules/,
        //   chunks: 'all',
        //   name: 'vendor'
        // },
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
