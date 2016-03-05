var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/views/index.html',
	filename: 'index.html',
	inject: 'body'
})



module.exports = {
	entry: "./components/boot.jsx",
	output: {
		path: __dirname + '/dist',
		filename: "index_bundle.js"
	},
	resolve: {
	    alias: {
	      'react': path.join(__dirname, 'node_modules', 'react')
	    },
	    extensions: ['', '.js']
  	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	},
	plugins: [HtmlWebpackPluginConfig]
};
