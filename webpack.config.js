const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

module.exports = (env, argv) => {
	const isProd = argv.mode === 'production';
	console.log('\nMode: ', argv.mode, '\n');

	/**
	 * Plugins for dev environment
	 */
	const devPlugins = [
		new HtmlWebpackPlugin({
			favicon: './public/logo.png',
			template: './src/index.html',
			title: 'Last FM API with Simple React App',
		}),
		new AssetsPlugin({
			prettyPrint: true,
			filename: 'assets.json',
			path: path.resolve(__dirname, 'public'),
		}),
		new webpack.DefinePlugin({
			__ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
	];
	/**
	 * Plugins for production environment
	 */
	const prodPlugins = [
		new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true,
		}),
		new LodashModuleReplacementPlugin(),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: true,
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
	];

	const pluginList = isProd ? [...devPlugins, ...prodPlugins] : devPlugins;

	return {
		entry: {
			app: path.join(__dirname, 'src', 'index.tsx'),
		},
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'build'),
			publicPath: '/',
		},
		devtool: isProd ? '' : 'inline-source-map',
		target: 'web',
		devServer: {
			port: 8080,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true,
		},
		module: {
			rules: [{
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
					exclude: /node_modules/,
					use: [{
						loader: 'file-loader',
						options: {
							name: 'assets/images/[hash]-[name].[ext]',
						},
					}, ],
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		resolve: {
			extensions: [
				'.ts',
				'.tsx',
				'.js',
				'.jsx',
				'.json',
				'.css',
				'.png',
				'.svg',
			],
			alias: {
				'@Components': path.resolve(__dirname, 'src/components/'),
				'@Config': path.resolve(__dirname, 'src/config/'),
				'@Store': path.resolve(__dirname, 'src/store/'),
				'@Utils': path.resolve(__dirname, 'src/utils/'),
				'@Views': path.resolve(__dirname, 'src/views/'),
				'@Assets': path.resolve(__dirname, 'assets/'),
				'@Constants': path.resolve(__dirname, 'src/constants/'),
			},
		},
		plugins: pluginList,
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
			runtimeChunk: {
				name: 'manifest',
			},
		},
	};
};