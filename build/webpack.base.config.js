const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ], 
    output: {
        chunkFilename: '[name].bundle.js',
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, '../output'),
        publicPath: '/'
    },
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        // host:'localhost',
        port: 8088,
        publicPath: '/',
        contentBase: path.resolve(__dirname, 'src'),
        // disableHostCheck: true
    },
    module: {
        rules: [
            // babel-loader
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            // css-loader
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            // less-loader
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            // sass-loader
            {
                test: /(\.sass|\.scss)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            // stylus-loader
            {
                test: /\.styl$/,
                loaders: ['style-loader', 'css-loader', 'stylus-loader']
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
        })
    ],
    optimization: {
	    runtimeChunk: 'single',
	    splitChunks: {
            // chunks: 'all',
	        cacheGroups: { }
	    }
	},
}