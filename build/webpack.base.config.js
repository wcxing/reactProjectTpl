const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
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
    // 抽离css
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[id].css'
    })
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
