const webpack = require('webpack')
const merge = require('webpack-merge')
const buildWebpackConfig = require('./webpack.build.config.js')
module.exports = merge(buildWebpackConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      _ENV_: JSON.stringify('production')
    })
  ]
})
