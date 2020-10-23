const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: "node",
  entry: "./src/server/index.js",
  mode: "development",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/build"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.(?:css|scss)$/,
        use: [
           ExtractCssChunks.loader,
           { 
            loader: "css-loader",
            options:{
              context: path.resolve(__dirname, 'context')
            }
          },
           "sass-loader"
         ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
      new ExtractCssChunks(
        {
          filename: "[name].css",
        }
      ),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.png'
      })
    ],
  externals: [webpackNodeExternals()]
}
