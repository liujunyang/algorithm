const path = require('path')
const webpack = require('webpack')
const copyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var DashboardPlugin = require("webpack-dashboard/plugin");
const FileListPlugin = require('./plugins/FileListPlugin.js')


module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?/,
      //   include: [
      //     path.resolve(__dirname, 'src')
      //   ],
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: "babel-loader?cacheDirectory=true",
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      // chunks: ['common', 'page'],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new DashboardPlugin(),
    new FileListPlugin(),
    // new BundleAnalyzerPlugin(),
    // new copyPlugin([
    //   {
    //     from: 'src/public',
    //     to: 'public'
    //   }
    // ])
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      name: 'bundle',
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
      }),
    ],
  },
}
