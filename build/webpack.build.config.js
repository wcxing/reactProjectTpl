const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = merge(baseWebpackConfig, {
	output: {
        path: path.resolve(__dirname, '../output'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: './'
    },
    // TODO： 图片压缩 。。。

    plugins: [
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
	        name: "single"
	    },
	    splitChunks: {
	        cacheGroups: {
	        	// 打包第三方文件
	            vendor: {
	                test: /[\\/]node_modules[\\/]/,
	                chunks: "all",
	                name: 'vendor'
	            },
	            // 打包公共库文件
	            common: {
	                test: /common\/|lib\//,
	                chunks: "all",
	                name: 'common',
	                enforce: true
	            }
	        }
	    }
	},
})