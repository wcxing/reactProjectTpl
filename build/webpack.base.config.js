const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// happypack
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) //启动线程池

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  devtool: 'source-map',

  module: {
    rules: [
      // babel-loader
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=babel'
      },
      // css-loader
      {
        test: /\.css$/,
        loaders: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
      },
      // less-loader
      {
        test: /\.less$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      // sass-loader
      {
        test: /(\.sass|\.scss)$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      // stylus-loader
      {
        test: /\.styl$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      },
      // 加载 img
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      // 加载字体图标
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
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
      threadPool: HappyThreadPool,
      // ... 其它配置项
      cache: true
    }),
  ],
  // 分块打包
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      src: path.join(__dirname, '../src'),
      config: path.join(__dirname, '../config')
    }
  },
}
